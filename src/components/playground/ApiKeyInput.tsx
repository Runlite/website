import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { setCurrentkey } from "@/store/slices/keys.slice";
import { Eye, EyeOff, Copy, CheckCircle2, XCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
export default function ApiInput() {
  const [isCopied, setIsCopied] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  useEffect(() => {
    const savedKey = localStorage.getItem("_apiKey");
    if (savedKey) {
      setApiKey(savedKey);
      dispatch(setCurrentkey(savedKey));
    }
  }, [dispatch]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length !== 67) {
      setIsValid(false);
    }
    dispatch(setCurrentkey(value));
    localStorage.setItem("_apiKey", value);
    setApiKey(value);
    setIsValid(null);

    if (value) {
      setTimeout(() => {
        setIsValid(value.length === 67);
      }, 1000);
    }
  };

  const toggleVisibility = () => {
    setShowKey(!showKey);
  };

  const handleCopy = async () => {
    if (apiKey) {
      await navigator.clipboard.writeText(apiKey);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const maskApiKey = (key: string) => {
    if (!key) return "";
    return `${key.slice(0, 8)}...${key.slice(-8)}`;
  };
  return (
    <div className="relative flex-1 max-w-sm">
      <div
        className={`
      relative
      group
      rounded-lg
      ${
        isValid === true
          ? "ring-1 ring-green-500"
          : isValid === false
          ? "ring-1 ring-red-500"
          : isFocused
          ? "ring-1 ring-blue-500"
          : ""
      }
    `}
      >
        <div
          className={`
        absolute
        inset-0
        overflow-hidden
        rounded-lg
        pointer-events-none
        ${apiKey && isValid === true ? "opacity-100" : "opacity-0"}
        transition-opacity
        duration-300
      `}
        >
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-green-100/10 to-transparent animate-[shimmer_2s_infinite]" />
        </div>

        <div className="relative flex items-center">
          <Input
            value={showKey ? apiKey : maskApiKey(apiKey)}
            onChange={handleApiKeyChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Paste your API key"
            type={showKey ? "text" : "text"}
            className={`
            pr-20
            py-3
            text-sm
            font-mono
            transition-all
            duration-200
            bg-background/50
            border
            ${
              isValid === true
                ? "border-green-500/50 hover:border-green-500"
                : isValid === false
                ? "border-red-500/50 hover:border-red-500"
                : "hover:border-blue-500"
            }
            ${isFocused ? "shadow-lg" : ""}
          `}
          />
          {apiKey && (
            <div
              className={`
            absolute
            right-20
            w-2
            h-2
            rounded-full
            transition-colors
            duration-300
            ${
              isValid === true
                ? "bg-green-500 animate-pulse"
                : isValid === false
                ? "bg-red-500 animate-pulse"
                : "bg-blue-500"
            }
          `}
            />
          )}

          {/* Action buttons */}
          <div className="absolute right-3 flex items-center gap-2">
            <button
              onClick={toggleVisibility}
              className={`
              p-1
              rounded-md
              text-gray-500
              hover:text-gray-700
              dark:hover:text-gray-300
              transition-colors
            `}
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>

            <button
              onClick={handleCopy}
              className={`
              p-1
              rounded-md
              text-gray-500
              hover:text-gray-700
              dark:hover:text-gray-300
              transition-colors
              ${isCopied ? "text-green-500" : ""}
            `}
              disabled={!apiKey}
            >
              {isCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* Validation message */}
        {apiKey && isValid !== null && (
          <div
            className={`
          absolute
          -bottom-6
          left-0
          text-xs
          font-medium
          flex
          items-center
          gap-1
          transition-opacity
          duration-200
          ${isValid ? "text-green-500" : "text-red-500"}
        `}
          >
            {isValid ? (
              <>
                <CheckCircle2 size={12} />
                Valid API key
              </>
            ) : (
              <>
                <XCircle size={12} />
                Invalid API key format
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
