import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

interface Language {
  code: number;
  name: string;
  version: string;
}
const languages: Language[] = [
  { code: 48, name: "C (GCC 7.4.0)", version: "7.4.0" },
  { code: 52, name: "C++ (GCC 7.4.0)", version: "7.4.0" },
  { code: 49, name: "C (GCC 8.3.0)", version: "8.3.0" },
  { code: 1090, name: "C++ (GCC 8.3.0)", version: "8.3.0" },
  { code: 50, name: "C (GCC 9.2.0)", version: "9.2.0" },
  { code: 54, name: "C++ (GCC 9.2.0)", version: "9.2.0" },
  { code: 51, name: "C# (Mono 6.6.0.161)", version: "6.6.0.161" },
  { code: 55, name: "Common Lisp (SBCL 2.0.0)", version: "2.0.0" },
  { code: 56, name: "D (DMD 2.089.1)", version: "2.089.1" },
  { code: 57, name: "Elixir (1.9.4)", version: "1.9.4" },
  { code: 58, name: "Erlang (OTP 22.2)", version: "22.2" },
  { code: 44, name: "Executable", version: "" },
  { code: 59, name: "Fortran (GFortran 9.2.0)", version: "9.2.0" },
  { code: 1088, name: "Go (1.13.5)", version: "1.13.5" },
  { code: 61, name: "Haskell (GHC 8.8.1)", version: "8.8.1" },
  { code: 1058, name: "Java (OpenJDK 13.0.1)", version: "13.0.1" },
  { code: 1078, name: "JavaScript (Node.js 12.14.0)", version: "12.14.0" },
  { code: 64, name: "Lua (5.3.5)", version: "5.3.5" },
  { code: 65, name: "OCaml (4.09.0)", version: "4.09.0" },
  { code: 66, name: "Octave (5.1.0)", version: "5.1.0" },
  { code: 67, name: "Pascal (FPC 3.0.4)", version: "3.0.4" },
  { code: 1030, name: "PHP (7.4.1)", version: "7.4.1" },
  { code: 43, name: "Plain Text", version: "" },
  { code: 69, name: "Prolog (GNU Prolog 1.4.5)", version: "1.4.5" },
  { code: 70, name: "Python (2.7.17)", version: "2.7.17" },
  { code: 1080, name: "Python (3.8.1)", version: "3.8.1" },
  { code: 1083, name: "Ruby (2.7.0)", version: "2.7.0" },
  { code: 1020, name: "Rust (1.40.0)", version: "1.40.0" },
  { code: 1070, name: "TypeScript (3.7.4)", version: "3.7.4" },
];

export default function SupportedLanguages() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortColumn, setSortColumn] = useState<keyof Language>("code");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredLanguages = useMemo(() => {
    return languages.filter((lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedLanguages = useMemo(() => {
    return [...filteredLanguages].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === "asc" ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredLanguages, sortColumn, sortDirection]);

  const handleSort = (column: keyof Language) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-gray-600">
          Our platform supports a wide range of programming languages and
          versions. Use the language ID when submitting your code for
          compilation and execution.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search languages..."
          className="pl-10 pr-4 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              onClick={() => handleSort("code")}
              className="cursor-pointer w-20"
            >
              code {sortColumn === "code" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              Language{" "}
              {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
            <TableHead
              onClick={() => handleSort("version")}
              className="cursor-pointer w-40"
            >
              Version{" "}
              {sortColumn === "version" &&
                (sortDirection === "asc" ? "↑" : "↓")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedLanguages.map((lang) => (
            <TableRow key={lang.code}>
              <TableCell>
                <Badge variant="secondary">{lang.code}</Badge>
              </TableCell>
              <TableCell className="font-medium">{lang.name}</TableCell>
              <TableCell>{lang.version}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <p className="text-sm text-gray-500">
        Note: Language versions are subject to change. Always refer to the
        latest documentation for the most up-to-date information.
      </p>
    </div>
  );
}
