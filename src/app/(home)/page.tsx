"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Code, Zap, Shield, Globe, Server, Users } from "lucide-react";
import Navbar from "./components/navbar";
import Pricing from "./components/pricing";
import Hero from "./components/hero";
import { ScrollArea } from "@/components/ui/scroll-area";
import WorkflowAnimation from "./components/workflow";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const Home: React.FC = () => {
  const features: Feature[] = [
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Execute code in 40+ programming languages",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in milliseconds",
    },
    {
      icon: Shield,
      title: "Secure Execution",
      description: "Run code in isolated environments",
    },
    {
      icon: Server,
      title: "Scalable Infrastructure",
      description: "Handle millions of requests effortlessly",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Manage API access across your organization",
    },
    {
      icon: Code,
      title: "RESTful API",
      description: "Easy integration with your existing workflow",
    },
  ];

  return (
    <ScrollArea className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900">
      <Navbar />
      <main className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Hero />
        <WorkflowAnimation />
        <motion.section
          className="mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren}
        >
          <motion.h3
            className="text-4xl font-bold mb-16 text-center text-gray-900"
            variants={fadeInUp}
          >
            Key Features
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <feature.icon className="w-12 h-12 mb-4 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
        <Pricing />
        <motion.section
          className="mt-32 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-blue-400 border-none text-white overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-blue-600 opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <CardContent className="relative z-10 py-12">
              <h3 className="text-4xl font-bold mb-6 text-center">
                Ready to get started?
              </h3>
              <p className="text-center mb-8 text-lg">
                Sign up now and get 10,000 free API calls.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/20 text-white placeholder-white/70 border-white/30 focus:border-white"
                />
                <Button
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300"
                >
                  Start Coding Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      <footer className="container mx-auto py-8 text-center text-gray-600">
        <p>&copy; 2024 Compyl. All rights reserved.</p>
      </footer>
    </ScrollArea>
  );
};

export default Home;
