import { Globe } from "lucide-react";

export const NavbarData = [
  {
    name: "Learner",
    path: "/",
    image: "",
  },
  {
    name: "Instructor",
    path: "/",
    image: "",
  },
  {
    name: "Buisness",
    path: "/",
    image: "",
  },
  {
    name: "EN",
    path: "/",
    image: (
      <Globe className="h-4 w-4 opacity-50 text-light lg:text-dark transition-all duration-300 ease-in-out group-hover/lang:rotate-[360deg]" />
    ),
  },
  {
    name: "Help",
    path: "/",
    image: "",
  },
];
