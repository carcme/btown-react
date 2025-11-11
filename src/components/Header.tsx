import { Link } from "@tanstack/react-router";

import { useState } from "react";
import { Home, Menu, Network, X } from "lucide-react";

import ToggleDark from "@/components/nav/ToggleDark";
import ToggleLanguage from "@/components/nav/ToggleLanguage";

const navItems = {
  logo: {
    url: ".",
    src: "/btown/city.svg",
    alt: "B-Town Logo",
    title: "",
  },
  menu: [
    { title: "Home", url: "/", icon: <Home className="size={20}" /> },
    {
      title: "TanStack Query",
      url: "/demo/tanstack-query",
      icon: <Network className="size={20}" />,
    },
  ],
};
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className=" p-2 w-full max-w-4xl mx-auto flex items-center justify-between  text-foreground bg-background">
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-xl font-semibold">
            <Link to="/">
              <img
                src={navItems.logo.src}
                alt={navItems.logo.alt}
                className="h-10"
              />
            </Link>
          </h1>
        </div>
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
          <h2 className="text-xl font-bold">Navigation</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
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
                className="flex items-center gap-3 p-3 rounded-lg hover:text-foreground transition-colors mb-2"
                activeProps={{
                  className:
                    "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
                }}
              >
                <div className="text-muted-foreground">{item.icon}</div>
                <span className="font-medium">{item.title}</span>
              </Link>
            );
          })}

          <ToggleDark />
          <ToggleLanguage />
        </nav>
      </aside>
    </>
  );
}
