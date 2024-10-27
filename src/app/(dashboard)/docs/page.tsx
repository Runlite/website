// "use client";
// import React, { useState, useEffect } from "react";
// import { Search, Menu, X } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { sections } from "@/constants/docs";

// const SIDEBAR_WIDTH = "280px";
// const TOC_WIDTH = "240px";

// const Documentation: React.FC = () => {
//   const [activeSection, setActiveSection] = useState<string>("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [activeHeading, setActiveHeading] = useState("");

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const handleHashChange = () => {
//       const hash = window.location.hash.slice(1);
//       if (hash) {
//         const validSection = sections.find((section) => section.id === hash);
//         if (validSection) {
//           setActiveSection(hash);
//         } else {
//           setActiveSection(sections[0]?.id || "");
//           window.history.replaceState(null, "", `#${sections[0]?.id}`);
//         }
//       } else {
//         setActiveSection(sections[0]?.id || "");
//         window.history.replaceState(null, "", `#${sections[0]?.id}`);
//       }
//     };

//     handleHashChange();

//     window.addEventListener("hashchange", handleHashChange);
//     return () => window.removeEventListener("hashchange", handleHashChange);
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const handleResize = () => setIsMenuOpen(window.innerWidth >= 1024);
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const handleScroll = () => {
//       const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
//       const scrollPosition = window.scrollY + 100;

//       for (const heading of Array.from(headings)) {
//         if (heading.offsetTop <= scrollPosition) {
//           setActiveHeading(heading.id);
//           const currentSection = window.location.hash.split("/")[0].slice(1);
//           if (currentSection) {
//             window.history.replaceState(
//               null,
//               "",
//               `#${currentSection}/${heading.id}`
//             );
//           }
//         }
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const filteredSections = sections.filter((section) =>
//     section.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const handleSectionChange = (sectionId: string) => {
//     if (typeof window !== "undefined") {
//       setActiveSection(sectionId);
//       window.history.pushState(null, "", `#${sectionId}`);
//       setIsMenuOpen(false);
//     }
//   };
//   const handleSubheadingClick = (sectionId: string, subheadingId: string) => {
//     if (typeof window !== "undefined") {
//       window.history.pushState(null, "", `#${sectionId}/${subheadingId}`);
//       document
//         .getElementById(subheadingId)
//         ?.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const SideNav: React.FC = () => (
//     <motion.nav
//       animate={{ x: 0 }}
//       exit={{ x: -300 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className="fixed z-40 h-screen bg-background border-r"
//       style={{ width: SIDEBAR_WIDTH }}
//     >
//       <ScrollArea className="h-full pb-8">
//         <div className="space-y-5 p-6">
//           <div className="flex items-center justify-between">
//             <Button
//               variant="ghost"
//               size="icon"
//               className="lg:hidden"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               <X className="h-5 w-5" />
//             </Button>
//           </div>

//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
//             <Input
//               type="text"
//               placeholder="Search documentation..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="pl-9 bg-secondary/50"
//             />
//           </div>

//           <div className="space-y-1">
//             {filteredSections.map((section) => (
//               <div key={section.id} className="space-y-1">
//                 <Button
//                   variant="ghost"
//                   className={`w-full justify-start text-left group transition-colors ${
//                     activeSection === section.id
//                       ? "bg-secondary text-primary"
//                       : "hover:bg-secondary/50"
//                   }`}
//                   onClick={() => handleSectionChange(section.id)}
//                 >
//                   <section.icon
//                     className={`mr-2 h-4 w-4 transition-colors ${
//                       activeSection === section.id
//                         ? "text-primary"
//                         : "text-muted-foreground group-hover:text-primary"
//                     }`}
//                   />
//                   <span className="truncate">{section.title}</span>
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </ScrollArea>
//     </motion.nav>
//   );

//   const TableOfContents: React.FC = () => {
//     const currentSection = sections.find((s) => s.id === activeSection);

//     return (
//       <div
//         className="hidden xl:block fixed right-0 h-screen border-l bg-background"
//         style={{ width: TOC_WIDTH }}
//       >
//         <div className="p-6">
//           <h3 className="font-medium mb-4 text-sm text-gray-700 uppercase">
//             On this page
//           </h3>
//           <div className="space-y-1">
//             {currentSection?.subheadings?.map((subheading) => (
//               <Button
//                 key={subheading.id}
//                 variant="ghost"
//                 size="sm"
//                 className={`w-full justify-start text-left transition-colors ${
//                   activeHeading === subheading.id
//                     ? "text-primary bg-secondary"
//                     : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
//                 }`}
//                 onClick={() =>
//                   handleSubheadingClick(currentSection.id, subheading.id)
//                 }
//               >
//                 {subheading.title}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex min-h-screen bg-background">
//       <Button
//         variant="outline"
//         size="icon"
//         className="lg:hidden fixed top-4 left-4 z-50 bg-background shadow-md"
//         onClick={() => setIsMenuOpen(true)}
//       >
//         <Menu className="h-5 w-5" />
//       </Button>

//       {isMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}

//       <AnimatePresence mode="wait">
//         {(isMenuOpen || window.innerWidth >= 1024) && <SideNav />}
//       </AnimatePresence>

//       <main
//         className="flex-1 min-h-screen"
//         style={{
//           marginLeft: window.innerWidth >= 1024 ? SIDEBAR_WIDTH : "0",
//           marginRight: window.innerWidth >= 1280 ? TOC_WIDTH : "0",
//         }}
//       >
//         <div className="max-w-3xl mx-auto px-6 py-12">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeSection}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               className="prose prose-gray dark:prose-invert max-w-none"
//             >
//               {sections.map(
//                 (section) =>
//                   section.id === activeSection && (
//                     <div key={section.id}>
//                       <h1 className="flex items-center gap-3 mb-8 text-4xl font-bold tracking-tight">
//                         <section.icon className="h-10 w-10" />
//                         {section.title}
//                       </h1>
//                       {section.content}
//                     </div>
//                   )
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </main>

//       <TableOfContents />
//     </div>
//   );
// };

// export default Documentation;

"use client";
import React, { useState, useEffect } from "react";
import { Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sections } from "@/constants/docs";

const SIDEBAR_WIDTH = "280px";
const TOC_WIDTH = "240px";

const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHeading, setActiveHeading] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        const validSection = sections.find((section) => section.id === hash);
        if (validSection) {
          setActiveSection(hash);
        } else {
          setActiveSection(sections[0]?.id || "");
          window.history.replaceState(null, "", `#${sections[0]?.id}`);
        }
      } else {
        setActiveSection(sections[0]?.id || "");
        window.history.replaceState(null, "", `#${sections[0]?.id}`);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsMenuOpen(width >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const headings = document.querySelectorAll<HTMLElement>("h2[id], h3[id]");
      const scrollPosition = window.scrollY + 100;

      for (const heading of Array.from(headings)) {
        if (heading.offsetTop <= scrollPosition) {
          setActiveHeading(heading.id);
          const currentSection = window.location.hash.split("/")[0].slice(1);
          if (currentSection) {
            window.history.replaceState(
              null,
              "",
              `#${currentSection}/${heading.id}`
            );
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  const filteredSections = sections.filter((section) =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSectionChange = (sectionId: string) => {
    if (!isMounted) return;
    setActiveSection(sectionId);
    window.history.pushState(null, "", `#${sectionId}`);
    setIsMenuOpen(false);
  };

  const handleSubheadingClick = (sectionId: string, subheadingId: string) => {
    if (!isMounted) return;
    window.history.pushState(null, "", `#${sectionId}/${subheadingId}`);
    document
      .getElementById(subheadingId)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const SideNav: React.FC = () => (
    <motion.nav
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed z-40 h-screen bg-background border-r"
      style={{ width: SIDEBAR_WIDTH }}
    >
      <ScrollArea className="h-full pb-8">
        <div className="space-y-5 p-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search documentation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-secondary/50"
            />
          </div>

          <div className="space-y-1">
            {filteredSections.map((section) => (
              <div key={section.id} className="space-y-1">
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left group transition-colors ${
                    activeSection === section.id
                      ? "bg-secondary text-primary"
                      : "hover:bg-secondary/50"
                  }`}
                  onClick={() => handleSectionChange(section.id)}
                >
                  <section.icon
                    className={`mr-2 h-4 w-4 transition-colors ${
                      activeSection === section.id
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-primary"
                    }`}
                  />
                  <span className="truncate">{section.title}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </motion.nav>
  );

  const TableOfContents: React.FC = () => {
    const currentSection = sections.find((s) => s.id === activeSection);

    return (
      <div
        className="hidden xl:block fixed right-0 h-screen border-l bg-background"
        style={{ width: TOC_WIDTH }}
      >
        <div className="p-6">
          <h3 className="font-medium mb-4 text-sm text-gray-700 uppercase">
            On this page
          </h3>
          <div className="space-y-1">
            {currentSection?.subheadings?.map((subheading) => (
              <Button
                key={subheading.id}
                variant="ghost"
                size="sm"
                className={`w-full justify-start text-left transition-colors ${
                  activeHeading === subheading.id
                    ? "text-primary bg-secondary"
                    : "text-muted-foreground hover:text-primary hover:bg-secondary/50"
                }`}
                onClick={() =>
                  handleSubheadingClick(currentSection.id, subheading.id)
                }
              >
                {subheading.title}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50 bg-background shadow-md"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <AnimatePresence mode="wait">
        {(isMenuOpen || windowWidth >= 1024) && <SideNav />}
      </AnimatePresence>

      <main
        className="flex-1 min-h-screen"
        style={{
          marginLeft: windowWidth >= 1024 ? SIDEBAR_WIDTH : "0",
          marginRight: windowWidth >= 1280 ? TOC_WIDTH : "0",
        }}
      >
        <div className="max-w-3xl mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="prose prose-gray dark:prose-invert max-w-none"
            >
              {sections.map(
                (section) =>
                  section.id === activeSection && (
                    <div key={section.id}>
                      <h1 className="flex items-center gap-3 mb-8 text-4xl font-bold tracking-tight">
                        <section.icon className="h-10 w-10" />
                        {section.title}
                      </h1>
                      {section.content}
                    </div>
                  )
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <TableOfContents />
    </div>
  );
};

export default Documentation;
