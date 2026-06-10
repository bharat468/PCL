import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const [token, setToken] = useState(Cookies.get("accessToken"));
  const cookie = Cookies.get("accessToken");
  useEffect(() => {
    setToken(cookie);
  }, [cookie]);
  
  return (
    <div className="sticky top-0 z-50">
      <header className="bg-white/95 backdrop-blur-md shadow-md border-b-2 border-[#f59e0b]">
        <div className="container mx-auto px-4">
          {/* Main Header Bar */}
          <div className="flex items-center justify-between py-3">
            {/* Logo Section - Properly Sized */}
            <Link to="/" className="flex items-center gap-4 hover:scale-105 transition-transform">
              <div className="relative flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="Prempuri Cricket League"
                  className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain ring-4 ring-[#f59e0b] rounded-full bg-white p-1"
                />
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xs font-bold">PCL</span>
                </div>
              </div>
              
              {/* Title - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:block">
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold text-primary leading-tight">
                  Prempuri Cricket League
                </h1>
                <p className="text-xs lg:text-sm text-[#f59e0b]">🏏 Village Cricket Tournament</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#f59e0b] text-white shadow-lg"
                        : "text-slate-600 hover:text-primary hover:bg-slate-100"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              {!token ? (
                <Link
                  to="/login"
                  className="ml-2 px-6 py-2 bg-gradient-to-r from-[#f59e0b] to-[#dc2626] text-white rounded-lg font-medium hover:from-[#dc2626] hover:to-[#f59e0b] transition-all shadow-lg"
                >
                  Login
                </Link>
              ) : (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `ml-2 px-6 py-2 rounded-lg font-medium transition-all ${
                      isActive
                        ? "bg-[#f59e0b] text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:text-primary hover:bg-slate-200"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-[#f59e0b] hover:bg-slate-100 p-3"
                  >
                    <Menu className="w-8 h-8" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 bg-white border-l-2 border-[#f59e0b]">
                  <SheetHeader>
                    <SheetTitle className="flex flex-col items-center gap-3">
                      <img 
                        src="/logo.png" 
                        alt="PCL" 
                        className="w-24 h-24 ring-4 ring-[#f59e0b] rounded-full bg-white p-1" 
                      />
                      <span className="text-primary text-lg text-center font-bold">Prempuri Cricket League</span>
                    </SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col gap-3 mt-8">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                          `px-4 py-3 rounded-lg font-medium transition-all ${
                            isActive
                              ? "bg-[#f59e0b] text-white"
                              : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                    {!token ? (
                      <Link
                        to="/login"
                        className="px-4 py-3 bg-gradient-to-r from-[#f59e0b] to-[#dc2626] text-white rounded-lg font-medium text-center hover:from-[#dc2626] hover:to-[#f59e0b] transition-all"
                      >
                        Login
                      </Link>
                    ) : (
                      <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                          `px-4 py-3 rounded-lg font-medium transition-all ${
                            isActive
                              ? "bg-[#f59e0b] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-primary hover:text-white"
                          }`
                        }
                      >
                        Dashboard
                      </NavLink>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
