"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  Book,
  Key,
  Send,
  Terminal,
  Database,
  Cloud,
  Settings,
  Shield,
  Clock,
  CodeIcon,
} from "lucide-react";
import Examples from "./components/examples";
import Introduction from "./components/introduction";
import Authentication from "./components/authentication";
import MakeRequest from "./components/makeRequest";

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  important?: boolean;
}

const sections: Section[] = [
  { id: "introduction", title: "Introduction", icon: Book },
  { id: "authentication", title: "Authentication", icon: Key },
  { id: "makeRequest", title: "Make a Request", icon: Send },
  { id: "Examples", title: "Examples", icon: CodeIcon },
  { id: "endpoints", title: "API Endpoints", icon: Cloud },
  { id: "dataModels", title: "Data Models", icon: Database },
  { id: "errorHandling", title: "Error Handling", icon: Shield },
  { id: "rateLimit", title: "Rate Limiting", icon: Clock },
  { id: "sdks", title: "SDKs & Libraries", icon: Terminal },
  { id: "webhooks", title: "Webhooks", icon: Settings },
];

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const sectionRefs = useRef<{ [key: string]: React.RefObject<HTMLElement> }>(
    {}
  );

  useEffect(() => {
    sections.forEach((section) => {
      sectionRefs.current[section.id] = React.createRef();
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionRefs.current[hash]) {
        setActiveSection(hash);
        scrollToSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const sectionRef = sectionRefs.current[sectionId];
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleMenuClick = (sectionId: string) => {
    window.history.pushState(null, "", `/docs#${sectionId}`);
    scrollToSection(sectionId);
  };

  return (
    <div className="flex flex-col md:flex-row bg-white">
      <aside className="w-full md:w-64 bg-gray-100 shadow-xl md:shadow-none fixed h-full md:h-screen overflow-y-auto">
        <ScrollArea className="h-full py-8 px-4">
          <nav>
            <div className="mb-8">
              <div className="relative mb-4">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <Input
                  placeholder="Search docs..."
                  className="pl-8 bg-white border-gray-200"
                />
              </div>
            </div>
            {sections.map((section) => (
              <Button
                key={section.id}
                variant={activeSection === section.id ? "default" : "ghost"}
                className={`w-full justify-start mb-2 text-left ${
                  activeSection === section.id
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-600"
                    : ""
                }`}
                onClick={() => handleMenuClick(section.id)}
              >
                <section.icon className="mr-2" size={18} />
                {section.title}
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 md:ml-64">
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-12">
            {sections.map((section) => (
              <motion.section
                key={section.id}
                ref={sectionRefs.current[section.id]}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden shadow-lg border-l-4 border-blue-200">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle className="text-2xl font-bold flex items-center text-gray-800">
                      <section.icon className="mr-3 text-blue-600" size={24} />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      {section.id === "introduction" && <Introduction />}
                      {section.id === "authentication" && <Authentication />}
                      {section.id === "makeRequest" && <MakeRequest />}
                      {section.id === "Examples" && <Examples />}
                    </div>
                  </CardContent>
                </Card>
              </motion.section>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
};

export default Documentation;
