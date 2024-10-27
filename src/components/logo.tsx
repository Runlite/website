import { FC } from "react";
const LOGO_SIZES = ["sm", "md", "lg", "xl"] as const;
type LogoSize = (typeof LOGO_SIZES)[number];

interface LogoProps {
  size?: LogoSize;
  animated?: boolean;
  className?: string;
  color?: string;
}

const sizeClasses: Record<LogoSize, string> = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
} as const;

export const Logo: FC<LogoProps> = ({
  size = "md",
  animated = true,
  className = "",
  color = "blue",
}) => {
  if (!LOGO_SIZES.includes(size as LogoSize)) {
    console.warn(`Invalid size prop: ${size}. Falling back to 'md'`);
    size = "md";
  }

  const colorClasses: Record<string, string> = {
    blue: "fill-blue-500",
    red: "fill-red-500",
    green: "fill-green-500",
    purple: "fill-purple-500",
    gray: "fill-gray-500",
  };

  const fillColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`relative ${sizeClasses[size as LogoSize]} ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={`w-full h-full ${animated ? "group" : ""}`}
        aria-label="Platform Logo"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          className="fill-gray-50 filter drop-shadow-md"
        />
        <path
          d="M60 25 L35 50 L48 50 L40 75 L65 50 L52 50 Z"
          className={`${fillColor} ${
            animated
              ? "opacity-100 group-hover:opacity-80 transition-opacity duration-300"
              : ""
          }`}
          transform="rotate(-5, 50, 50)"
        />

        <path
          d="M30 50 L70 50"
          className="stroke-gray-200 stroke-1"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
};

export default Logo;
