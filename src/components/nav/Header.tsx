import { Link } from "@tanstack/react-router";

import { useState } from "react";
import { Home, Map, X } from "lucide-react";


import ToggleDark from "@/components/nav/ToggleDark";
import ToggleLanguage from "@/components/nav/ToggleLanguage";
import { SkylineIcon } from "@/assets/svgIcons";
import { useTheme } from "@/state/theme-provider";
import ToggleTourMapBtn from "./ToggleTourMapBtn";

const navItems = {
  logo: {
    url: ".",
    src: "/skyline.svg",
    alt: "B-Town Logo",
    title: "",
  },
  menu: [
    { title: "Home", url: "/", icon: <Home className="size={20}" /> },
    { title: "Map", url: "viewMap", icon: <Map className="size={20}" /> },
  ],
};
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();

  const bg = theme === "dark" ? "#000" : "#fff";

  return (
    <>
      <header className=" p-2 px-4 w-full max-w-6xl mx-auto flex items-center justify-between  text-foreground bg-background">
        <ToggleTourMapBtn />
        <div className="flex justify-end">
          <ToggleDark />
          <ToggleLanguage />
        </div>
      </header>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-background text-muted-foreground shadow-2xl z-10000 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <SkylineIcon className="fill-foreground" bg={bg} />

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-berlin hover:text-foreground rounded-lg transition-colors duration-300"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navItems.menu.map((item) => {
            return (
              <Link
                key={item.title}
                to={item.url}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 p-3 rounded-lg hover:text-secondary transition-colors mb-2"
                activeProps={{
                  className:
                    "flex items-center gap-3 p-3 rounded-lg bg-berlin mb-2",
                }}
              >
                <div className="text-shadow-background">{item.icon}</div>
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}

          <div className="justify-end place-items-end space-y-3">
            <ToggleDark />
            <ToggleLanguage />
          </div>
        </nav>
      </aside>
    </>
  );
}
