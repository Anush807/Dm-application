import { Home, User, Briefcase, FileText } from "lucide-react";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Resume", href: "/resume", icon: FileText },
];

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#e5e7eb] bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* Brand / Logo */}
          <div className="text-sm font-semibold text-[#0f172a]">
            Campaign Analytics
          </div>

          {/* Nav items */}
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-sm text-[#475569] hover:text-[#0f172a] transition"
                >
                  <Icon size={16} />
                  {item.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
