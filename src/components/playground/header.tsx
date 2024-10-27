"use client";

import React, { Suspense } from "react";
import { useEditor } from "@/hooks/useEditor";
import {
  setLanguage,
  setTheme,
  setResponse,
  setLoading,
} from "@/store/slices/editor.slice";
import { DEFAULT_THEME, DEFAULT_LANGUAGE, LanguageToCode } from "@/constants";
import { Language, Status, Theme } from "@/types";
import axios, { AxiosError } from "axios";
import { Check, ChevronsUpDown, Loader, Play } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { cn } from "@/lib/utils";
import ApiInput from "./ApiKeyInput";

// Types
interface SelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  label: string;
}

interface LanguageOption {
  label: string;
  value: string;
}

const SelectorSkeleton: React.FC = () => (
  <Skeleton className="w-[140px] bg-gray-200 h-10 animate-pulse" />
);

const ButtonSkeleton: React.FC = () => (
  <Skeleton className="w-24 bg-gray-200 h-10 animate-pulse" />
);

const BasicSelector: React.FC<SelectorProps> = ({
  value,
  onChange,
  options,
  label,
}) => (
  <Select onValueChange={onChange} value={value}>
    <SelectTrigger className="w-[140px] bg-white">
      <SelectValue placeholder={`Select ${label}`} />
    </SelectTrigger>
    <SelectContent>
      {options.map((option) => (
        <SelectItem key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
const LanguageSelector: React.FC<SelectorProps> = ({
  value,
  onChange,
  options,
  label,
}) => {
  const [open, setOpen] = React.useState(false);

  // Convert options to LanguageOption format
  const languageOptions: LanguageOption[] = options.map((option) => ({
    label: option.charAt(0).toUpperCase() + option.slice(1),
    value: option,
  }));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-white"
        >
          {value
            ? languageOptions.find((lang) => lang.value === value)?.label
            : `Select ${label}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandList>
            <CommandEmpty>No {label} found.</CommandEmpty>
            <CommandGroup>
              {languageOptions.map((lang) => (
                <CommandItem
                  key={lang.value}
                  value={lang.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === lang.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {lang.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
const RunButton: React.FC<{ onClick: () => void; isLoading: boolean }> = ({
  onClick,
  isLoading,
}) => (
  <Button
    variant="default"
    size="sm"
    disabled={isLoading}
    onClick={onClick}
    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
  >
    {isLoading ? (
      <Loader className="size-4 animate-spin" />
    ) : (
      <>
        <Play className="size-4" />
        Run
      </>
    )}
  </Button>
);

// Main Header Component
export const Header: React.FC = () => {
  const { theme, language, dispatch, code, isLoading } = useEditor();
  const { currentkey } = useSelector((state: RootState) => state.keys);

  const handleThemeChange = (value: string) =>
    dispatch(setTheme(value as Theme));
  const handleLanguageChange = (value: string) =>
    dispatch(setLanguage(value as Language));

  const runCode = async () => {
    dispatch(setResponse(null));
    dispatch(setLoading(true));

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_COMPILER_SERVER}/v1`,
        {
          syntax: code,
          lang: LanguageToCode[language],
        },
        {
          headers: {
            Authorization: `Bearer ${currentkey}`,
          },
        }
      );
      dispatch(setResponse(data));
    } catch (error) {
      const errorMessage =
        ((error as AxiosError).response?.data as { error: string })?.error ||
        "Something went wrong please try again later";

      dispatch(
        setResponse({
          error: errorMessage,
          status: Status.Failed,
        })
      );
      console.error("Error running code:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <ScrollArea className="w-full h-[7vh] bg-gray-100">
      <div className="flex items-center gap-2 p-1 bg-gray-100">
        <Suspense fallback={<SelectorSkeleton />}>
          <BasicSelector
            value={theme}
            onChange={handleThemeChange}
            options={DEFAULT_THEME}
            label="theme"
          />
        </Suspense>
        <Suspense fallback={<SelectorSkeleton />}>
          <LanguageSelector
            value={language}
            onChange={handleLanguageChange}
            options={DEFAULT_LANGUAGE}
            label="language"
          />
        </Suspense>
        <Suspense fallback={<ButtonSkeleton />}>
          <RunButton onClick={runCode} isLoading={isLoading} />
        </Suspense>
        <ApiInput />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Header;
