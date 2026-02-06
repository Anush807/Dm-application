
import { DottedMap } from "@/components/ui/dotted-map";
import  { NavBar } from "@/components/ui/tubelight-navbar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#f8f9fb] text-[#0f172a] overflow-hidden">
      
      {/* Global background map */}
      <div className="absolute inset-0 z-0">
        <DottedMap />
      </div>

        <header className="sticky top-0 z-20">
          <NavBar items={[]} />
        </header>

      {/* Page content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}
