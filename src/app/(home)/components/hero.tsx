import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, Zap } from "lucide-react";
import RetroGrid from "@/components/ui/retro-grid";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function Hero() {
  return (
    <motion.section
      className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-background to-background/80 mb-32"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      <motion.div className="absolute inset-0 opacity-30" variants={scaleIn}>
        <RetroGrid />
      </motion.div>

      <motion.div className="z-10 text-center" variants={fadeInUp}>
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800 mb-6">
          Launch Your Projects Faster
        </span>
        <h1 className="text-5xl font-extrabold leading-tight tracking-tighter text-foreground md:text-6xl lg:text-7xl">
          Unleash Your Code,{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Amplify Your Build
          </span>
        </h1>
      </motion.div>

      <motion.p
        className="mt-6 max-w-2xl text-center text-xl text-muted-foreground"
        variants={fadeInUp}
      >
        Harness our powerful APIs for seamless code execution across multiple
        languages. Accelerate your development with 10,000 free API calls to
        kickstart your journey.
      </motion.p>

      <motion.div
        variants={fadeInUp}
        className="mt-10 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
      >
        <Button
          size="lg"
          className="group bg-blue-600 text-lg text-white transition-all hover:bg-blue-700"
        >
          Get Your API Key
          <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-lg text-blue-600 transition-all hover:bg-blue-50"
        >
          Explore Docs
          <Code2 className="ml-2" />
        </Button>
      </motion.div>

      <motion.div
        variants={scaleIn}
        className="mt-16 flex items-center space-x-2 text-sm text-muted-foreground"
      >
        <Zap className="h-4 w-4 text-yellow-500" />
        <span>Lightning-fast compilation across 20+ programming languages</span>
      </motion.div>
    </motion.section>
  );
}
