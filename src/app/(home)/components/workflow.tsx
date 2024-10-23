import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code, Database, Box, Play, ListEnd } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  label: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Database className="w-6 h-6" />,
    label: "Cache",
    description: "Check for cached results to optimize performance",
  },
  {
    icon: <ListEnd className="w-6 h-6" />,
    label: "Queue",
    description: "Request Added in Queue",
  },
  {
    icon: <Box className="w-6 h-6" />,
    label: "Sandbox",
    description: "Prepare secure environment for code execution",
  },
  {
    icon: <Play className="w-6 h-6" />,
    label: "Execute",
    description: "Run the code safely in isolated environment",
  },
];

const TerminalWindow = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
    <div className="bg-gray-800 px-4 py-2 flex items-center">
      <div className="flex space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-white ml-4 text-sm">{title}</div>
    </div>
    <div className="p-4 font-mono text-sm">{children}</div>
  </div>
);

const WorkflowAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const beamProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const beamOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <div ref={containerRef} className="min-h-screen py-16 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-slate-800">
            Code Compilation Pipeline
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Experience real-time code execution with our advanced compilation
            platform. Secure, efficient, and lightning-fast results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TerminalWindow title="Input Terminal">
              <div className="flex items-center text-green-400 mb-2">
                <Code className="w-4 h-4 mr-2" />
                <span className="mr-2">$</span>
                <span className="typing-animation">python fibonacci.py</span>
              </div>
              <div className="text-white bg-gray-800 p-3 rounded">
                {`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate first 5 Fibonacci numbers
for i in range(5):
    print(fibonacci(i))`}
              </div>
            </TerminalWindow>
          </motion.div>

          <div className="relative">
            <motion.div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
              style={{ opacity: beamOpacity }}
            >
              <div className="h-full w-full bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 rounded-full shadow-lg">
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full shadow-lg"
                  style={{ top: beamProgress }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse" />
                </motion.div>
              </div>
            </motion.div>

            {/* Steps */}
            <div className="relative z-10 space-y-24">
              {steps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex justify-center"
                >
                  <div className="bg-white rounded-xl p-6 shadow-lg w-96 relative flex items-center">
                    <div className="bg-blue-500 rounded-lg p-3 mr-4">
                      <div className="text-white">{step.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-slate-800">
                        {step.label}
                      </h3>
                      <p className="text-slate-600 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <TerminalWindow title="Output Terminal">
              <div className="text-green-400 mb-2">
                $ Running fibonacci.py...
              </div>
              <div className="text-white">
                <div>0</div>
                <div>1</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
              </div>
              <div className="text-green-400 mt-2">
                $ Process completed successfully
              </div>
            </TerminalWindow>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowAnimation;
