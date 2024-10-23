// ConfigurationDrawer.tsx
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Bird, Rabbit, Turtle } from "lucide-react";
const ConfigurationDrawer: React.FC = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <Button variant="ghost" size="icon" className="md:hidden">
        <Settings className="size-4" />
        <span className="sr-only">Settings</span>
      </Button>
    </DrawerTrigger>
    <DrawerContent className="max-h-[80vh]">
      <DrawerHeader>
        <DrawerTitle>Configuration</DrawerTitle>
        <DrawerDescription>
          Configure the settings for the model and messages.
        </DrawerDescription>
      </DrawerHeader>
      <ConfigurationForm />
    </DrawerContent>
  </Drawer>
);

const ConfigurationForm: React.FC = () => (
  <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
      <ModelSelection />
      <NumberInput id="temperature" label="Temperature" placeholder="0.4" />
      <NumberInput id="top-p" label="Top P" placeholder="0.7" />
      <NumberInput id="top-k" label="Top K" placeholder="0.0" />
    </fieldset>
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
      <RoleSelection />
      <div className="grid gap-3">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" placeholder="You are a..." />
      </div>
    </fieldset>
  </form>
);

const NumberInput: React.FC<{
  id: string;
  label: string;
  placeholder: string;
}> = ({ id, label, placeholder }) => (
  <div className="grid gap-3">
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} type="number" placeholder={placeholder} />
  </div>
);

const ModelSelection: React.FC = () => (
  <div className="grid gap-3">
    <Label htmlFor="model">Model</Label>
    <Select>
      <SelectTrigger
        id="model"
        className="items-start [&_[data-description]]:hidden"
      >
        <SelectValue placeholder="Select a model" />
      </SelectTrigger>
      <SelectContent>
        <ModelOption
          value="genesis"
          icon={<Rabbit className="size-5" />}
          name="Genesis"
          description="Our fastest model for general use cases."
        />
        <ModelOption
          value="explorer"
          icon={<Bird className="size-5" />}
          name="Explorer"
          description="Performance and speed for efficiency."
        />
        <ModelOption
          value="quantum"
          icon={<Turtle className="size-5" />}
          name="Quantum"
          description="The most powerful model for complex computations."
        />
      </SelectContent>
    </Select>
  </div>
);

const ModelOption: React.FC<{
  value: string;
  icon: React.ReactNode;
  name: string;
  description: string;
}> = ({ value, icon, name, description }) => (
  <SelectItem value={value}>
    <div className="flex items-start gap-3 text-muted-foreground">
      {icon}
      <div className="grid gap-0.5">
        <p>
          Neural <span className="font-medium text-foreground">{name}</span>
        </p>
        <p className="text-xs" data-description>
          {description}
        </p>
      </div>
    </div>
  </SelectItem>
);

const RoleSelection: React.FC = () => (
  <div className="grid gap-3">
    <Label htmlFor="role">Role</Label>
    <Select defaultValue="system">
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="system">System</SelectItem>
        <SelectItem value="user">User</SelectItem>
        <SelectItem value="assistant">Assistant</SelectItem>
      </SelectContent>
    </Select>
  </div>
);

export default ConfigurationDrawer;
