import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const SignInButtons = () => {
  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };
  const { githubSignIn, googleSignin } = useAuth();
  return (
    <div className="flex items-center space-x-4 bg-white">
      <span className="font-medium text-1xl text-gray-900">Sign In with</span>
      <motion.div className="flex space-x-2">
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            onClick={() => googleSignin()}
            size="sm"
            variant="secondary"
            className="bg-[#4285F4] hover:bg-[#4285F4]/90  text-white transition-colors duration-200 ease-in-out"
          >
            <svg
              className="h-5 w-5 mr-2"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Google
          </Button>
        </motion.div>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            onClick={() => githubSignIn()}
            size="sm"
            variant="secondary"
            className="text-white bg-[#24292F] hover:bg-[#24292F]/90  transition-colors duration-200 ease-in-out"
          >
            <Github className="h-5 w-5 mr-2" />
            GitHub
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignInButtons;
