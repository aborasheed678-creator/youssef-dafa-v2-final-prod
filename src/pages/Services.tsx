import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarDays,
  FileText,
  HeartPulse,
  Home,
  Landmark,
  Scale,
  ShieldCheck,
  Stethoscope,
  Truck,
} from "lucide-react";
import { Country, COUNTRIES } from "@/lib/countries";
import SEOHead from "@/components/SEOHead";
import BottomNav from "@/components/BottomNav";
import { serviceLogos } from "@/lib/serviceLogos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CatalogService {
  id: string;
  titleAr: string;
  titleEn: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
}

interface CatalogSectionProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accentClass: string;
  services: CatalogService[];
}

const governmentServicesByCountry: Record<string, string[]> = {
  SA: ["nafath", "absher", "tawakkalna", "etheq", "etimad", "sadad"],
  AE: ["uae-pass", "edirham", "jaywan", "abu-dhabi-pay"],
  KW: ["hawyti", "sahel", "knet"],
  QA: ["qdi", "hukoomi"],
  BH: ["ekey", "benefit", "mygov"],
  OM: ["rop-id", "theqa", "omannet"],
};

const shippingServiceKeys = [
  "aramex",
  "dhl",
  "fedex",
  "ups",
  "smsa",
  "naqel",
  "zajil",
  "saudipost",
  "emiratespost",
];

const platformServices: CatalogService[] = [
  {
    id: "chalets",
    titleAr: "الشاليهات والحجوزات",
    titleEn: "Chalets & bookings",
    description: "إدارة طلبات الإقامة والحجوزات والضيوف.",
    icon: Home,
    gradient: "from-emerald-500 to-teal-700",
  },
  {
    id: "invoices",
    titleAr: "الفواتير",
    titleEn: "Invoices",
    description: "إنشاء الفواتير وعرضها وإدارة بيانات العميل.",
    icon: FileText,
    gradient: "from-blue-500 to-indigo-700",
  },
  {
    id: "health",
    titleAr: "الخدمات الصحية",
    titleEn: "Health services",
    description: "دليل خدمات المواعيد والاستشارات والرعاية الصحية.",
    icon: Stethoscope,
    gradient: "from-rose-500 to-pink-700",
  },
  {
    id: "logistics",
    titleAr: "الشحن واللوجستيات",
    titleEn: "Logistics",
    description: "خدمات الشحن والتسليم وتتبع الطلبات.",
    icon: Truck,
    gradient: "from-amber-500 to-orange-700",
  },
  {
    id: "contracts",
    titleAr: "العقود الإلكترونية",
    titleEn: "Electronic contracts",
    description: "إدارة قوالب العقود والوثائق والاتفاقيات.",
    icon: Scale,
    gradient: "from-violet-500 to-purple-700",
  },
];

const ServiceCard = ({ service }: { service: CatalogService }) => {
  const Icon = service.icon;

  return (
    <article
      className="group h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
      aria-label={`${service.titleAr} — ${service.description}`}
    >
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} shadow-sm`}>
        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h3 className="text-base font-black text-slate-900">{service.titleAr}</h3>
      <p className="mt-1 text-xs font-semibold text-slate-400" dir="ltr">
        {service.titleEn}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
    </article>
  );
};

const CatalogSection = ({ id, title, description, icon: Icon, accentClass, services }: CatalogSectionProps) => (
  <section id={id} className="scroll-mt-6 space-y-5" aria-labelledby={`section-${id}`}>
    <div className="flex items-start gap-3 px-1">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${accentClass}`}>
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <div>
        <h2 id={`section-${id}`} className="text-lg font-black text-slate-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {services.map((service) => (
        <div key={service.id} role="listitem">
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  </section>
);

const Services = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    () => COUNTRIES.find((country) => country.code === "SA") ?? COUNTRIES[0],
  );

  const governmentServices = useMemo<CatalogService[]>(() => {
    return (governmentServicesByCountry[selectedCountry.code] ?? []).flatMap((key) => {
      const branding = serviceLogos[key];
      if (!branding) return [];

      return [{
        id: key,
        titleAr: branding.nameAr ?? key,
        titleEn: branding.nameEn ?? key,
        description: "خدمة رقمية مدرجة ضمن دليل الخدمات لهذه الدولة.",
        icon: Landmark,
        gradient: "from-slate-800 to-slate-950",
      }];
    });
  }, [selectedCountry.code]);

  const shippingServices = useMemo<CatalogService[]>(() => {
    return shippingServiceKeys.flatMap((key) => {
      const branding = serviceLogos[key];
      if (!branding) return [];

      return [{
        id: key,
        titleAr: branding.nameAr ?? key,
        titleEn: branding.nameEn ?? key,
        description: "خدمة شحن أو لوجستيات مدرجة ضمن دليل المنصة.",
        icon: Truck,
        gradient: "from-orange-500 to-amber-600",
      }];
    });
  }, []);

  const totalServices = governmentServices.length + shippingServices.length + platformServices.length;

  return (
    <div className="min-h-screen bg-slate-50 pb-32 font-['Cairo']" dir="rtl">
      <SEOHead
        title="دليل الخدمات"
        description="كتالوج منظم للخدمات الرقمية واللوجستية وخدمات المنصة."
      />

      <header className="relative overflow-hidden bg-slate-950 px-6 pb-20 pt-10 text-white">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />

        <div className="container relative mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                <ShieldCheck className="h-6 w-6 text-cyan-200" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-white/55">دليل المنصة</p>
                <h1 className="text-2xl font-black">جميع فئات الخدمات</h1>
              </div>
            </div>

            <Select value={selectedCountry.code} onValueChange={(code) => {
              const country = COUNTRIES.find((item) => item.code === code);
              if (country) setSelectedCountry(country);
            }}>
              <SelectTrigger className="w-full border-white/20 bg-white/10 text-white sm:w-[210px]">
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent className="font-bold">
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    <span className="ml-2" aria-hidden="true">{country.flag}</span>
                    {country.nameAr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-10 max-w-2xl">
            <h2 className="text-3xl font-black leading-tight">خدمات منظمة في مكان واحد</h2>
            <p className="mt-3 text-sm font-semibold leading-7 text-white/65">
              يعرض هذا الدليل الخدمات الرقمية والخدمات التشغيلية المتاحة في واجهة المنصة حسب الدولة المختارة.
            </p>
          </div>
        </div>
      </header>

      <main className="container relative z-10 mx-auto max-w-6xl px-6">
        <div className="-mt-8 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <Building2 className="h-5 w-5 text-slate-700" aria-hidden="true" />
          <span className="text-sm font-black text-slate-900">{selectedCountry.nameAr}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
            {totalServices} خدمة معروضة
          </span>
          <span className="mr-auto flex items-center gap-1 text-xs font-semibold text-slate-500">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            دليل معلوماتي للخدمات
          </span>
        </div>

        <div className="space-y-12 py-10">
          <CatalogSection
            id="digital-services"
            title="الخدمات الرقمية والحكومية"
            description="خدمات رقمية مرتبطة بالدولة المختارة."
            icon={Landmark}
            accentClass="bg-slate-900"
            services={governmentServices}
          />

          <CatalogSection
            id="shipping-services"
            title="شركاء الشحن والتسليم"
            description="خدمات شحن ولوجستيات مدرجة في واجهة المنصة."
            icon={Truck}
            accentClass="bg-orange-500"
            services={shippingServices}
          />

          <CatalogSection
            id="platform-services"
            title="خدمات المنصة"
            description="الخدمات التي كانت غير ظاهرة في صفحة الدليل الرئيسية."
            icon={HeartPulse}
            accentClass="bg-cyan-600"
            services={platformServices}
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Services;
