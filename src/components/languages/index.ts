import { TypeScript } from "./typescipt";
import { PHP } from "./php";
import { Language } from "@/types";
import { CPP } from "./cpp";
import { Java } from "./java";
import { Python } from "./python";
export const setUpMonaco = (language: Language) => {
  switch (language) {
    case "typescript":
      TypeScript();
      break;
    case "php":
      PHP();
      break;
    case "cpp":
      CPP();
      break;
    case "java":
      Java();
      break;
    case "python":
      Python();
      break;
    default:
      console.warn(`Unsupported language: ${language}`);
  }
};
