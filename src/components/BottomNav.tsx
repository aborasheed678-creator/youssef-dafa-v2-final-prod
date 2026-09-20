import { Home, Landmark, Package, Truck } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const isActive = (path: string) => {
    const [pathname, hash] = path.split("#");
    return location.pathname === pathname && (hash ? location.hash === `#${hash}` : !location.hash);
  };

  const navItems = [
    { path: "/services", icon: Home, label: "الرئيسية" },
    { path: "/services#platform-services", icon: Package, label: "خدمات المنصة" },
    { path: "/services#shipping-services", icon: Truck, label: "الشحن" },
    { path: "/services#digital-services", icon: Landmark, label: "الرقمية" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-6 pb-6 pt-2 pointer-events-none">
      <div className="container mx-auto max-w-lg pointer-events-auto">
        <nav className="bg-[#0A1628] backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center justify-around py-4 px-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1.5 transition-all duration-300 relative group"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${
                isActive(item.path) 
                  ? "bg-[#EB7625] text-white shadow-[0_8px_20px_rgba(235,118,37,0.4)] scale-110" 
                  : "text-white/40 hover:text-white/80"
              }`}>
                <item.icon size={22} strokeWidth={isActive(item.path) ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-black transition-all duration-300 ${
                isActive(item.path) ? "text-white opacity-100 translate-y-0" : "text-white/30 opacity-60 translate-y-1"
              }`}>
                {item.label}
              </span>
              {isActive(item.path) && (
                <div className="absolute -top-1 w-1 h-1 bg-white rounded-full animate-pulse"></div>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;
