import React, { useState, useEffect } from "react";
import {
  Camera,
  RefreshCw,
  Wifi,
  Smartphone,
  Wrench,
  ShieldAlert,
  Shield,
  CheckCircle,
  Tag,
  FileText,
  Tv,
  Clock,
  ThumbsUp,
  Star,
  Mail,
  Phone,
  ArrowUp,
  ChevronDown,
  Menu,
  X,
  Info,
  MapPin,
  Lock,
  Bell,
  Check,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MessageSquare,
  Plus,
  Award,
  Image as ImageIcon,
  ExternalLink
} from "lucide-react";

// Import custom data and modular components
import { servicesData, productsData, testimonialsData, faqsData, whyChooseUsData } from "./data";
import { ProductItem } from "./types";
import Cctv3DModel from "./components/Cctv3DModel";
import SecurityChatbot from "./components/SecurityChatbot";
import SurveillanceMap from "./components/SurveillanceMap";
import secureMcrLogo from "./assets/images/secure_mcr_logo_1783093153518.jpg";
import heroBackground from "./assets/images/gallery_res_cctv_1783094572912.jpg";
import catHomesShops from "./assets/images/cat_homes_shops_1783094341065.jpg";
import catOfficesWarehouses from "./assets/images/cat_offices_warehouses_1783094353601.jpg";
import catSchoolsEateries from "./assets/images/cat_schools_eateries_1783094364417.jpg";
import catCommercialSites from "./assets/images/cat_commercial_sites_1783094377869.jpg";
import galleryResCctv from "./assets/images/gallery_res_cctv_1783094572912.jpg";
import galleryComCctv from "./assets/images/gallery_com_cctv_1783094600102.jpg";
import galleryMonitoring from "./assets/images/gallery_monitoring_1783094615020.jpg";
import gallerySmartHome from "./assets/images/gallery_smart_home_1783094631023.jpg";

export default function App() {
  // Navigation & UI States
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  
  // Gallery states and static items
  const [galleryFilter, setGalleryFilter] = useState<"All" | "Residential" | "Commercial" | "Control Rooms">("All");
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<{
    id: string;
    title: string;
    category: string;
    image: string;
    desc: string;
    postcode: string;
    cameras: number;
  } | null>(null);

  const galleryItems = [
    {
      id: "gal-1",
      title: "Premium Home 4K CCTV Setup",
      category: "Residential",
      image: galleryResCctv,
      desc: "An ultra-clean installation of discrete 4K external cameras mounted on red-brick masonry, safeguarding the main entrance and wide driveway with intelligent vehicle detection.",
      postcode: "M20 (Didsbury)",
      cameras: 4
    },
    {
      id: "gal-2",
      title: "Corporate Lobby Security Dome",
      category: "Commercial",
      image: galleryComCctv,
      desc: "Full vandal-resistant 360° dome camera installation, meticulously aligned inside the suspended corporate ceiling, integrated with remote app monitoring for the security desk.",
      postcode: "M3 (Deansgate)",
      cameras: 12
    },
    {
      id: "gal-3",
      title: "Industrial Operations Monitor Wall",
      category: "Control Rooms",
      image: galleryMonitoring,
      desc: "High-spec multi-screen operational desk showing live grid cameras, configured with active motion sensors, tripwire alerts, and automated local server logging.",
      postcode: "M17 (Trafford Park)",
      cameras: 32
    },
    {
      id: "gal-4",
      title: "Smart Home Security Porch",
      category: "Residential",
      image: gallerySmartHome,
      desc: "Clean residential installation of active smart deterrence camera on wood-clad front porch, featuring real-time motion-activated lights and integrated voice intercom.",
      postcode: "M33 (Sale)",
      cameras: 3
    }
  ];

  // Reviews states (extending static testimonials data)
  const [reviewsList, setReviewsList] = useState(testimonialsData);
  const [reviewSort, setReviewSort] = useState<"recent" | "highest" | "lowest">("recent");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewFormSubmitted, setReviewFormSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    location: "Manchester City Centre",
    tag: "Residential" as "Residential" | "Commercial",
    text: ""
  });
  const [reviewFormErrors, setReviewFormErrors] = useState<Record<string, string>>({});

  // Testimonial filter state
  const [testimonialFilter, setTestimonialFilter] = useState<"All" | "Residential" | "Commercial">("All");

  // Contact Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "CCTV Supply & Installation",
    message: ""
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Monitor scroll for sticky navbar active links and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button visibility
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Determine current section in view
      const sections = ["home", "about", "services", "products", "gallery", "why-choose-us", "reviews", "faq", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // Map sub-sections to the 5 main page navigation items
            if (section === "why-choose-us") {
              setActiveSection("about");
            } else if (section === "products") {
              setActiveSection("services");
            } else if (section === "faq" || section === "contact") {
              setActiveSection("reviews");
            } else {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === "home" ? 0 : offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Helper to map string icon to Lucide component
  const renderServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Camera":
        return <Camera className="w-6 h-6 text-red-400" />;
      case "RefreshCw":
        return <RefreshCw className="w-6 h-6 text-red-400" />;
      case "Wifi":
        return <Wifi className="w-6 h-6 text-red-400" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-red-400" />;
      case "Wrench":
        return <Wrench className="w-6 h-6 text-red-400" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-6 h-6 text-red-400" />;
      default:
        return <Camera className="w-6 h-6 text-red-400" />;
    }
  };

  const renderWhyIcon = (iconName: string) => {
    switch (iconName) {
      case "Shield":
        return <Shield className="w-6 h-6 text-red-400" />;
      case "CheckCircle":
        return <CheckCircle className="w-6 h-6 text-red-400" />;
      case "Tag":
        return <Tag className="w-6 h-6 text-red-400" />;
      case "FileText":
        return <FileText className="w-6 h-6 text-red-400" />;
      case "Tv":
        return <Tv className="w-6 h-6 text-red-400" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-red-400" />;
      case "Clock":
        return <Clock className="w-6 h-6 text-red-400" />;
      case "ThumbsUp":
        return <ThumbsUp className="w-6 h-6 text-red-400" />;
      default:
        return <CheckCircle className="w-6 h-6 text-red-400" />;
    }
  };

  // Decorative product SVG outline components for a futuristic visual feel
  const renderProductGraphic = (type: string) => {
    return (
      <div className="relative w-full h-48 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center group-hover:border-red-500/20 transition-all duration-300">
        <div className="absolute inset-0 bg-scanlines opacity-5"></div>
        {/* Radar scanner sweep line effect */}
        <div className="absolute left-0 right-0 h-0.5 bg-red-500/10 shadow-[0_0_15px_#ef4444] animate-scanline pointer-events-none"></div>

        {/* Decorative blueprint grids */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ef4444" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Dynamic graphics depending on camera package types */}
        {type === "ptz" && (
          <svg className="w-24 h-24 text-red-400/80 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="10" r="6" />
            <path d="M12 16v5M9 21h6" />
            <circle cx="12" cy="10" r="2" className="fill-red-500/10 animate-pulse" />
            <path d="M12 5h.01M12 15h.01M5 10h.01M19 10h.01" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 2a10 10 0 0 0-10 10" strokeDasharray="2 2" />
          </svg>
        )}

        {(type === "kit2" || type === "kit4" || type === "kit8") && (
          <div className="relative flex items-center justify-center gap-2">
            <svg className="w-16 h-16 text-red-400/80 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
            </svg>
            <div className="absolute -bottom-1 bg-red-600/20 text-red-400 border border-red-500/30 font-mono text-[9px] px-2 py-0.5 rounded-full font-bold">
              {type === "kit2" ? "2 CAMERA KIT" : type === "kit4" ? "4 CAMERA KIT" : "8 CAMERA KIT"}
            </div>
          </div>
        )}

        {type === "wireless" && (
          <svg className="w-24 h-24 text-red-400/80 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 18h.01M8.5 14.5a5 5 0 0 1 7 0M5 11a10 10 0 0 1 14 0M12 5a15 15 0 0 1 0 30" />
            <rect x="9" y="14" width="6" height="8" rx="1" className="fill-red-500/5" />
            <circle cx="12" cy="17" r="1" className="fill-red-400" />
          </svg>
        )}

        {type === "dome" && (
          <svg className="w-24 h-24 text-red-400/80 stroke-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M2 12a10 10 0 0 1 20 0M12 12v6m-4 0h8" />
            <circle cx="12" cy="12" r="4" className="fill-red-500/10" />
            <circle cx="12" cy="12" r="1.5" className="fill-red-400 animate-pulse" />
          </svg>
        )}

        {/* Dynamic status badges in card overlay */}
        <div className="absolute top-3 left-3 bg-slate-950/80 border border-slate-800 text-[9px] font-mono font-semibold px-2 py-0.5 rounded-md text-red-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span>4K DIGITAL FEED</span>
        </div>
      </div>
    );
  };

  // Contact form submission handler with front-end validation
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9+\s-]{8,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      errors.phone = "Please enter a valid UK phone number";
    }
    if (!formData.message.trim()) errors.message = "Message cannot be empty";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setSubmitting(true);

    // Simulate backend API posting delay
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      // Reset form fields
      setFormData({
        name: "",
        email: "",
        phone: "CCTV Installation",
        service: "CCTV Installation",
        message: ""
      });
    }, 1200);
  };

  const handleLearnMoreInquiry = (product: ProductItem) => {
    // Prefill form service and scroll down to the contact section
    setFormData((prev) => ({
      ...prev,
      service: `${product.name} Inquiry`,
      message: `Hi, I am interested in the ${product.name} priced at ${product.price}. Please contact me to arrange a free site quotation and confirm installation dates.`
    }));
    scrollTo("contact");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between scroll-smooth relative selection:bg-red-600/30 selection:text-white font-sans">
      
      {/* Dynamic Background Mesh Grid lines */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none z-0"></div>

      {/* STICKY HEADER & NAVIGATION */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Group */}
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => scrollTo("home")}>
              <img
                src={secureMcrLogo}
                alt="Secure MCR Logo"
                className="w-11 h-11 rounded-xl object-cover border border-red-500/30 shadow-lg shadow-red-500/20"
                referrerPolicy="no-referrer"
              />
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-white block uppercase leading-none">
                  SECURE <span className="text-red-500">MCR</span>
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold block mt-1">
                  Security Solutions UK
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium">
              {[
                { label: "Opening page", id: "home" },
                { label: "About Us", id: "about" },
                { label: "Services", id: "services" },
                { label: "Gallery", id: "gallery" },
                { label: "Reviews & Contact Us", id: "reviews" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`py-1 text-[13px] font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeSection === item.id
                      ? "text-red-400 border-b-2 border-red-500 pb-1"
                      : "text-slate-400 hover:text-red-400"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Sticky Header Call-to-Actions */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="tel:+447514856229"
                className="text-white flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700 transition-all text-xs font-semibold"
              >
                <span className="text-red-500 animate-pulse">●</span> +44 7514 856229
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-lg shadow-red-500/20 transition-all text-xs cursor-pointer"
              >
                Get a Free Quote
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-slate-100 rounded-xl hover:bg-slate-900 transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-900 bg-slate-950 px-4 pt-2 pb-6 space-y-2 animate-fade-in">
            {[
              { label: "Opening page", id: "home" },
              { label: "About Us", id: "about" },
              { label: "Services", id: "services" },
              { label: "Gallery", id: "gallery" },
              { label: "Reviews & Contact Us", id: "reviews" }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "text-red-400 bg-red-500/10 font-bold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-slate-900/80 flex flex-col gap-3">
              <a
                href="tel:+447514856229"
                className="flex items-center justify-center gap-2.5 w-full py-3 bg-slate-900 border border-slate-800 rounded-xl text-sm font-mono text-slate-300"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>+44 7514 856229</span>
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="w-full py-3.5 bg-red-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-500/20"
              >
                Get a Free Quote
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN WEBSITE BODY */}
      <main className="flex-grow z-10">

        {/* HERO SECTION */}
        <section id="home" className="relative py-12 md:py-20 lg:py-28 overflow-hidden border-b border-slate-900 bg-slate-950">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={heroBackground}
              alt="Secure MCR Background"
              className="w-full h-full object-cover opacity-20 mix-blend-luminosity filter brightness-75 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column (Hero copy & actions) */}
              <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
                {/* Decorative Pill Badge */}
                <div className="inline-block self-center lg:self-start px-3 py-1 bg-red-600/10 border border-red-500/30 rounded text-red-400 text-xs font-bold uppercase tracking-widest max-w-max">
                  Professional CCTV Installation
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] font-sans tracking-tight">
                  Protecting Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 italic underline underline-offset-8 decoration-slate-850">Home & Business</span>
                </h1>

                <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Protect your home and business with high-quality CCTV systems professionally supplied and installed by Secure MCR. Enjoy crystal-clear 4K imaging, color night vision, and global smartphone app viewing with **£0 monthly fees**.
                </p>

                {/* Main Prominent Phone & Callouts */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded shadow-xl shadow-red-600/20 transition-all text-sm tracking-wide cursor-pointer"
                  >
                    Get a Free Quote
                  </button>
                  <a
                    href="tel:+447514856229"
                    className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-700 hover:border-slate-500 text-white font-bold rounded transition-all text-sm text-center"
                  >
                    View Services
                  </a>
                </div>

                {/* Stats Grid from Theme */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-900 max-w-xl mx-auto lg:mx-0">
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-xl font-mono">HD 4K</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Resolutions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-xl font-mono">24/7</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-xl font-mono">FULLY</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">Insured</div>
                  </div>
                  <div className="text-center">
                    <div className="text-red-500 font-bold text-xl font-mono">SMART</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-tighter">App Access</div>
                  </div>
                </div>

                {/* Subtext Prominent Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-2 max-w-xl mx-auto lg:mx-0 border-t border-slate-900/60">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Direct Phone</span>
                    <a href="tel:+447514856229" className="text-slate-200 text-sm font-mono font-bold hover:text-red-400 transition-colors">
                      +44 7514 856229
                    </a>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Direct Email</span>
                    <a href="mailto:securemcr@gmail.com" className="text-slate-200 text-sm font-mono font-bold hover:text-red-400 transition-colors truncate">
                      securemcr@gmail.com
                    </a>
                  </div>
                  <div className="flex flex-col gap-0.5 col-span-2 sm:col-span-1">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Service Area</span>
                    <span className="text-slate-200 text-sm font-bold">
                     Manchester / UK
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column (Three.js 3D Interactive camera model viewport) */}
              <div className="lg:col-span-5 w-full relative">
                {/* Embedded absolute badge background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-red-500/5 blur-3xl rounded-full pointer-events-none"></div>
                <div className="relative z-10 flex flex-col gap-2">
                  <Cctv3DModel />
                  <span className="text-center font-mono text-[10px] text-slate-500 flex items-center justify-center gap-1.5 select-none">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                    <span>3D ACTIVE HUD: MOVE MOUSE OVER CAMERA VIEWPORT TO ROTATE LENS</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column - Beautiful Info Graphic */}
              <div className="lg:col-span-6 relative flex flex-col gap-4">
                <div className="absolute inset-0 bg-red-500/5 blur-3xl rounded-full pointer-events-none"></div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col group hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300">
                    <div className="h-32 sm:h-36 w-full overflow-hidden relative">
                      <img
                        src={catHomesShops}
                        alt="Homes & Shops"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 bg-red-600/10 border border-red-500/20 backdrop-blur-md w-8 h-8 rounded-lg flex items-center justify-center text-red-400 shadow-md">
                        <Shield className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-1">
                      <h4 className="text-base font-bold text-slate-100 group-hover:text-red-400 transition-colors">Homes & Shops</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Sleek camera kits and neat routing, designed to fit cleanly into residential settings and high-traffic storefronts.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col mt-4 group hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300">
                    <div className="h-32 sm:h-36 w-full overflow-hidden relative">
                      <img
                        src={catOfficesWarehouses}
                        alt="Offices & Warehouses"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 bg-red-600/10 border border-red-500/20 backdrop-blur-md w-8 h-8 rounded-lg flex items-center justify-center text-red-400 shadow-md">
                        <Tv className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-1">
                      <h4 className="text-base font-bold text-slate-100 group-hover:text-red-400 transition-colors">Offices & Warehouses</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Heavy-duty 4K coverage, high-capacity NVR servers, multi-room feeds, and perimeter fence intrusion sensors.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col group hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300">
                    <div className="h-32 sm:h-36 w-full overflow-hidden relative">
                      <img
                        src={catSchoolsEateries}
                        alt="Schools & Eateries"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 bg-red-600/10 border border-red-500/20 backdrop-blur-md w-8 h-8 rounded-lg flex items-center justify-center text-red-400 shadow-md">
                        <Lock className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-1">
                      <h4 className="text-base font-bold text-slate-100 group-hover:text-red-400 transition-colors">Schools & Eateries</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Vandal-resistant dome cameras, facial recognition, and continuous reliable loop loops compliant with UK laws.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden flex flex-col mt-4 group hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300">
                    <div className="h-32 sm:h-36 w-full overflow-hidden relative">
                      <img
                        src={catCommercialSites}
                        alt="Commercial Sites"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 bg-red-600/10 border border-red-500/20 backdrop-blur-md w-8 h-8 rounded-lg flex items-center justify-center text-red-400 shadow-md">
                        <Bell className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="p-5 flex flex-col gap-1">
                      <h4 className="text-base font-bold text-slate-100 group-hover:text-red-400 transition-colors">Commercial Sites</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Large-scale setups with active target zoom and customized remote alert centers tailored to local operations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Copy Content */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                  TRUSTED SECURITY ENGINEERS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Supply & Expert Installation of Certified CCTV Systems
                </h2>
                <p className="text-slate-300 leading-relaxed">
                  At Secure MCR, we specialize in supplying, fitting, and programming high-end security cameras. Our fully insured team serves a wide variety of customers, ensuring complete custom-fitted security for:
                </p>

                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-300 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Homes & Estates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Retail Shops & Boutiques
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Office Units
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Industrial Warehouses
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Restaurants & Cafes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Schools & Colleges
                  </li>
                </ul>

                <p className="text-slate-300 leading-relaxed mt-2">
                  We are heavily driven by our core service values: **Experienced professional installers** who conceal cable routings perfectly, **cutting-edge hardware** with outstanding low-light sensors, **highly competitive pricing** with no recurring payments, and a commitment to **outstanding customer support** for life.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-slate-900 mt-2">
                  <button
                    onClick={() => scrollTo("contact")}
                    className="px-6 py-3.5 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold rounded-xl text-center text-sm transition-all"
                  >
                    Discuss Your Setup
                  </button>
                  <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-mono text-sm font-bold">
                      ✓
                    </div>
                    <span className="text-xs text-slate-300 leading-tight font-medium">
                      Fully Insured Up to £5M <br />
                      Free Local Postcode Surveys
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-20 md:py-28 border-b border-slate-900 bg-[radial-gradient(ellipse_at_bottom,rgba(15,23,42,0.4),transparent_60%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                WHAT WE EXCELLENTLY PROVIDE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                Our CCTV Sales & Installation Services
              </h2>
              <p className="text-slate-400 mt-3 leading-relaxed">
                Whether you need a brand-new high-end installation, a technology upgrade on an older wiring layout, or regular system health servicing, Secure MCR has you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {servicesData.map((service) => (
                <div
                  key={service.id}
                  className="bg-slate-900/50 border border-slate-800 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 p-6 rounded-3xl transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600/20 group-hover:border-red-500/40 transition-all duration-300">
                      {renderServiceIcon(service.iconName)}
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-red-400 transition-colors mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setFormData((p) => ({ ...p, service: service.title }));
                      scrollTo("contact");
                    }}
                    className="text-xs font-mono font-bold text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors group/btn cursor-pointer self-start"
                  >
                    Inquire About Service <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section id="products" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                  OUR HARDWARE PACKAGES
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                  Featured Camera Kits & Equipment
                </h2>
                <p className="text-slate-400 mt-3 leading-relaxed">
                  We supply only professional, weather-resistant security hardware. Standard configurations can be adjusted to support your exact property dimensions.
                </p>
              </div>
              <button
                onClick={() => scrollTo("contact")}
                className="px-5 py-3 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono text-slate-300 transition-all hover:scale-102 self-start md:self-auto cursor-pointer"
              >
                Inquire For Custom Kit Configuration
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productsData.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="bg-slate-850/40 border border-slate-800 rounded-2xl p-6 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Index & Popular tag line */}
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-red-400 font-mono text-xs">0{idx + 1} //</span>
                      {idx === 1 && (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded">POPULAR</span>
                      )}
                    </div>

                    {/* Visual schematic representation */}
                    {renderProductGraphic(prod.imageType)}

                    <div className="flex justify-between items-start gap-4 mt-6">
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-red-400 transition-colors">
                        {prod.name}
                      </h3>
                      <div className="flex flex-col items-end">
                        <span className="text-white font-bold text-lg font-mono leading-none">
                          {prod.price}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono mt-1">INSTALLED</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-xs leading-relaxed mt-2 mb-6">
                      {prod.description}
                    </p>

                    <div className="pt-4 border-t border-slate-800/80">
                      <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3">
                        Specifications Included:
                      </h4>
                      <ul className="space-y-2">
                        {prod.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex gap-2 items-start text-xs text-slate-355 leading-relaxed">
                            <span className="text-red-500 font-bold mt-0.5 select-none">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-2">
                    <button
                      onClick={() => handleLearnMoreInquiry(prod)}
                      className="w-full py-3 bg-slate-900 hover:bg-red-600 hover:text-white border border-slate-800 hover:border-red-500/30 text-xs font-semibold rounded-xl tracking-wide transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-1 text-red-400"
                    >
                      <span>Learn More →</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950 relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> PROVEN FIELD EXPERIENCE
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 font-sans">
                  Recent CCTV Installations Gallery
                </h2>
                <p className="text-slate-400 mt-3 leading-relaxed">
                  Browse our portfolio of high-specification camera systems recently installed across Greater Manchester. Click on any project to view configuration details and setup layout.
                </p>
              </div>

              {/* Gallery Filter controls */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl font-mono text-xs">
                {(["All", "Residential", "Commercial", "Control Rooms"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setGalleryFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      galleryFilter === filter
                        ? "bg-red-600 text-white font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryItems
                .filter((item) => galleryFilter === "All" || item.category === galleryFilter)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedGalleryItem(item)}
                    className="group bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-red-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/5 cursor-pointer flex flex-col h-full"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                      
                      {/* Interactive zoom hover icon overlay */}
                      <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="p-3 bg-red-600 text-white rounded-full shadow-lg shadow-red-500/30 scale-90 group-hover:scale-100 transition-all duration-300">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Top float badges */}
                      <div className="absolute top-3 left-3 flex gap-1.5 font-mono text-[9px] font-bold">
                        <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 backdrop-blur-md text-red-400 uppercase">
                          {item.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-slate-800 backdrop-blur-md text-slate-300">
                          {item.postcode}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-bold text-slate-100 tracking-tight group-hover:text-red-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-900 mt-4 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>EQUIPMENT LEVEL:</span>
                        <span className="text-red-400 font-bold">{item.cameras}x 4K CAMERAS</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Empty view for custom filters */}
            {galleryItems.filter((item) => galleryFilter === "All" || item.category === galleryFilter).length === 0 && (
              <div className="text-center py-12 bg-slate-900/20 border border-slate-800 rounded-3xl">
                <ImageIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No projects found in this category.</p>
              </div>
            )}
          </div>

          {/* GALLERY LIGHTBOX DETAIL MODAL */}
          {selectedGalleryItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
              <div 
                className="absolute inset-0 cursor-pointer" 
                onClick={() => setSelectedGalleryItem(null)}
              ></div>
              
              <div className="relative bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl shadow-red-500/5 z-10 flex flex-col md:flex-row max-h-[90vh]">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-slate-950/80 hover:bg-red-600 text-slate-400 hover:text-white rounded-full border border-slate-800 hover:border-red-500/30 transition-all cursor-pointer"
                  title="Close light box"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Side: Photo */}
                <div className="md:w-1/2 relative bg-slate-950 flex items-center">
                  <img
                    src={selectedGalleryItem.image}
                    alt={selectedGalleryItem.title}
                    className="w-full h-full object-cover max-h-[40vh] md:max-h-full"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 to-transparent p-6 md:hidden"></div>
                </div>

                {/* Right Side: Setup details */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex gap-2 font-mono text-[10px] font-bold">
                      <span className="px-2.5 py-0.5 rounded bg-red-600/10 border border-red-500/20 text-red-400 uppercase">
                        {selectedGalleryItem.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400">
                        {selectedGalleryItem.postcode}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                      {selectedGalleryItem.title}
                    </h3>
                    
                    <p className="text-slate-350 text-sm leading-relaxed">
                      {selectedGalleryItem.desc}
                    </p>

                    <div className="pt-4 border-t border-slate-800 space-y-3 font-mono text-[11px] text-slate-400">
                      <div className="flex justify-between">
                        <span>INSTALLATION DATE:</span>
                        <span className="text-slate-200">Recently Completed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SYSTEM SPECIFICATION:</span>
                        <span className="text-slate-200 font-bold">4K UHD Smart Series</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CHANNELS / CAMERAS:</span>
                        <span className="text-red-400 font-bold">{selectedGalleryItem.cameras} Channels Installed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>WARRANTY COVERAGE:</span>
                        <span className="text-emerald-400">3 Year Parts & Labor</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-6 border-t border-slate-800 flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          service: `${selectedGalleryItem.category} CCTV`,
                          message: `Hi, I saw your ${selectedGalleryItem.title} in the gallery. I'm located near the ${selectedGalleryItem.postcode} region and would like a similar layout for my property. Please contact me to arrange a site quote.`
                        }));
                        setSelectedGalleryItem(null);
                        scrollTo("contact");
                      }}
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors shadow-lg shadow-red-500/15 cursor-pointer text-center"
                    >
                      Inquire About This Layout
                    </button>
                    <button
                      onClick={() => setSelectedGalleryItem(null)}
                      className="w-full py-3 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition-colors cursor-pointer text-center"
                    >
                      Return to Gallery
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section id="why-choose-us" className="py-20 md:py-28 border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.4),transparent_60%)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                OUR PROTECTION STANDARDS
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                Why Secure MCR is the Premier Choice
              </h2>
              <p className="text-slate-400 mt-3 leading-relaxed">
                When it comes to safeguarding your property, there is no room for compromise. Our technical standards and service quality ensure flawless security coverage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {whyChooseUsData.map((why, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300 hover:border-red-500/10 flex flex-col gap-4"
                >
                  <div className="w-12 h-12 bg-red-600/10 border border-red-500/20 rounded-2xl flex items-center justify-center text-red-400">
                    {renderWhyIcon(why.iconName)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100 tracking-tight mb-2">
                      {why.title}
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      {why.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section id="reviews" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950 relative overflow-hidden">
          {/* Background mesh glow */}
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-red-600/5 blur-3xl rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> VERIFIED MANCHESTER REVIEWS
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                  Customer Ratings & Reviews
                </h2>
                <p className="text-slate-400 mt-3 leading-relaxed">
                  We are proud to maintain a near-perfect rating across Greater Manchester. Read honest, verified reviews from local homeowners, retail shops, and commercial offices.
                </p>
              </div>

              {/* Action: Leave a Review trigger */}
              <button
                onClick={() => {
                  setShowReviewForm(!showReviewForm);
                  setReviewFormSubmitted(false);
                }}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-100 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-bold rounded-xl tracking-wider uppercase transition-all duration-300 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <Plus className={`w-4 h-4 text-red-500 transition-transform duration-300 ${showReviewForm ? "rotate-45" : ""}`} />
                <span>{showReviewForm ? "Close Review Panel" : "Leave a Review"}</span>
              </button>
            </div>

            {/* Rating Metrics & Dashboard Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              
              {/* Average score card */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center">
                <span className="text-slate-500 font-mono text-xs uppercase tracking-widest font-semibold">AVERAGE RATING</span>
                <h3 className="text-6xl font-extrabold text-white font-mono tracking-tight mt-3">
                  4.9<span className="text-slate-600 text-3xl font-normal">/5</span>
                </h3>
                
                {/* Score Stars */}
                <div className="flex items-center gap-1.5 mt-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                
                <p className="text-xs text-slate-450 mt-4 leading-relaxed max-w-xs">
                  Based on <span className="text-slate-200 font-semibold font-mono">{reviewsList.length} verified installations</span> in Manchester.
                </p>

                <div className="mt-5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Genuine Customers
                </div>
              </div>

              {/* Rating Bars progress list */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-center space-y-3.5">
                {[
                  { stars: 5, percentage: 94, count: Math.ceil(reviewsList.length * 0.94) },
                  { stars: 4, percentage: 6, count: Math.floor(reviewsList.length * 0.06) },
                  { stars: 3, percentage: 0, count: 0 },
                  { stars: 2, percentage: 0, count: 0 },
                  { stars: 1, percentage: 0, count: 0 }
                ].map((item) => (
                  <div key={item.stars} className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-slate-400 font-bold w-12 flex items-center gap-1">
                      {item.stars} <Star className="w-3.5 h-3.5 fill-slate-500 text-slate-500" />
                    </span>
                    <div className="flex-grow h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                      <div 
                        className="h-full bg-red-600 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-slate-400 font-bold text-right w-10">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified Badges and highlights */}
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col justify-center space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-600/10 border border-red-500/20 rounded-xl text-red-400 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">SSAIB Standard Work</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-1">
                      All systems are designed and commissioned to strictly comply with high UK surveillance criteria.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-600/10 border border-red-500/20 rounded-xl text-red-400 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider">Fast Local Response</h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-1">
                      Our Manchester engineering base guarantees 24-hour support and maintenance site call-outs.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* DYNAMIC LEAVE A REVIEW FORM */}
            {showReviewForm && (
              <div className="mb-12 bg-slate-900 border border-slate-800/80 rounded-3xl p-6 md:p-8 animate-fade-in relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
                
                <h3 className="text-xl font-bold text-white tracking-tight">Write a Verified Customer Review</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Your feedback helps local homeowners and business owners choose reliable local CCTV contractors in Greater Manchester.
                </p>

                {reviewFormSubmitted ? (
                  <div className="mt-6 p-6 bg-red-600/10 border border-red-500/20 rounded-2xl text-center">
                    <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center text-red-400 mx-auto mb-3">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-white text-base">Review Submitted Successfully!</h4>
                    <p className="text-slate-350 text-xs mt-1.5 leading-relaxed max-w-md mx-auto">
                      Thank you for sharing your experience. Your verified customer review has been added to our live ratings board.
                    </p>
                    <button
                      onClick={() => setShowReviewForm(false)}
                      className="mt-4 px-5 py-2 bg-slate-950 hover:bg-slate-850 text-xs font-semibold rounded-lg border border-slate-800 transition-colors cursor-pointer"
                    >
                      Close Panel
                    </button>
                  </div>
                ) : (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      // Simple validation
                      const errors: Record<string, string> = {};
                      if (!newReview.name.trim()) errors.name = "Please enter your name";
                      if (!newReview.text.trim()) errors.text = "Please write your review comment";
                      
                      if (Object.keys(errors).length > 0) {
                        setReviewFormErrors(errors);
                        return;
                      }

                      // Create new review object
                      const addedReview = {
                        id: `rev-${Date.now()}`,
                        name: newReview.name,
                        rating: newReview.rating,
                        location: newReview.location,
                        tag: newReview.tag,
                        text: newReview.text,
                        date: "Just now"
                      };

                      // Prepend to review list
                      setReviewsList([addedReview, ...reviewsList]);
                      setReviewFormSubmitted(true);
                      setNewReview({
                        name: "",
                        rating: 5,
                        location: "Manchester City Centre",
                        tag: "Residential",
                        text: ""
                      });
                      setReviewFormErrors({});
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
                  >
                    
                    {/* Left Columns */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold mb-1.5">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          placeholder="e.g. David Harrison"
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500/50"
                        />
                        {reviewFormErrors.name && (
                          <span className="text-[10px] text-red-500 font-mono block mt-1">{reviewFormErrors.name}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold mb-1.5">
                            Manchester Location
                          </label>
                          <select
                            value={newReview.location}
                            onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500/50"
                          >
                            {["Manchester City Centre", "Didsbury", "Chorlton", "Salford", "MediaCity", "Altrincham", "Stockport", "Ancoats", "Prestwich", "Oldham", "Bury", "Chadderton"].map((loc) => (
                              <option key={loc} value={loc}>{loc}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold mb-1.5">
                            Property Type
                          </label>
                          <select
                            value={newReview.tag}
                            onChange={(e) => setNewReview({ ...newReview, tag: e.target.value as "Residential" | "Commercial" })}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500/50"
                          >
                            <option value="Residential">Residential Home</option>
                            <option value="Commercial">Commercial Office / Shop</option>
                          </select>
                        </div>
                      </div>

                      {/* Interactive Rating Selection */}
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold mb-2">
                          Star Rating
                        </label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((starVal) => (
                            <button
                              key={starVal}
                              type="button"
                              onClick={() => setNewReview({ ...newReview, rating: starVal })}
                              className="p-1 transition-transform active:scale-90 cursor-pointer"
                            >
                              <Star 
                                className={`w-6 h-6 transition-colors ${
                                  starVal <= newReview.rating 
                                    ? "fill-amber-500 text-amber-500" 
                                    : "text-slate-650 hover:text-amber-500/60"
                                }`} 
                              />
                            </button>
                          ))}
                          <span className="text-xs font-mono font-bold text-slate-300 ml-2">({newReview.rating} out of 5 stars)</span>
                        </div>
                      </div>

                    </div>

                    {/* Right Column: Review Text */}
                    <div className="flex flex-col justify-between space-y-4">
                      <div>
                        <label className="block text-[11px] font-mono text-slate-400 uppercase font-semibold mb-1.5">
                          Review Comments
                        </label>
                        <textarea
                          rows={4}
                          value={newReview.text}
                          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                          placeholder="Write your review here. E.g. Secure MCR did a fantastic job installing 4 cameras on my property in Stockport. Very clean wiring, helpful app configuration..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-red-500/50 h-[122px] resize-none"
                        ></textarea>
                        {reviewFormErrors.text && (
                          <span className="text-[10px] text-red-500 font-mono block mt-1">{reviewFormErrors.text}</span>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-grow py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          Submit Verified Review
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowReviewForm(false);
                            setNewReview({ name: "", rating: 5, location: "Manchester City Centre", tag: "Residential", text: "" });
                            setReviewFormErrors({});
                          }}
                          className="px-5 py-3.5 bg-slate-950 hover:bg-slate-850 text-slate-450 hover:text-slate-200 text-xs font-semibold rounded-xl border border-slate-800 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                  </form>
                )}
              </div>
            )}

            {/* Filters and Sorting bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-6 mb-8 font-mono text-xs">
              
              {/* Filter by Property Type */}
              <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl self-start">
                {(["All", "Residential", "Commercial"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTestimonialFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      testimonialFilter === filter
                        ? "bg-red-600 text-white font-bold"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Sorting Filter */}
              <div className="flex items-center gap-2 self-end">
                <span className="text-slate-500">SORT BY:</span>
                <select
                  value={reviewSort}
                  onChange={(e) => setReviewSort(e.target.value as "recent" | "highest" | "lowest")}
                  className="bg-slate-900 border border-slate-800 text-slate-300 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-red-500/30 cursor-pointer"
                >
                  <option value="recent">Most Recent</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                </select>
              </div>

            </div>

            {/* Reviews List Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reviewsList
                .filter((item) => testimonialFilter === "All" || item.tag === testimonialFilter)
                .sort((a, b) => {
                  if (reviewSort === "highest") return b.rating - a.rating;
                  if (reviewSort === "lowest") return a.rating - b.rating;
                  // 'recent' sorts custom submitted reviews first, then ID
                  return b.id.localeCompare(a.id);
                })
                .map((test) => (
                  <div
                    key={test.id}
                    className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-300 relative group"
                  >
                    {/* Double quotes graphic */}
                    <div className="absolute top-6 right-6 text-slate-800 text-6xl font-serif pointer-events-none select-none opacity-40 group-hover:opacity-60 transition-opacity">
                      ”
                    </div>

                    <div className="flex flex-col gap-4 relative z-10">
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                        ))}
                        {[...Array(5 - test.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-slate-800 fill-slate-800" />
                        ))}
                      </div>

                      <p className="text-slate-300 text-sm leading-relaxed italic">
                        "{test.text}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-900 mt-6 relative z-10 font-sans">
                      <div>
                        <h4 className="font-bold text-slate-100">{test.name}</h4>
                        <span className="text-xs text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-red-400/60" /> {test.location}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1 text-[10px] font-mono">
                        <span className="px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 uppercase font-semibold">
                          {test.tag}
                        </span>
                        <span className="text-slate-500">{test.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="py-20 md:py-28 border-b border-slate-900 bg-[radial-gradient(ellipse_at_bottom,rgba(15,23,42,0.4),transparent_60%)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                GOT QUESTIONS? WE ANSWERED THEM
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-400 mt-3 leading-relaxed">
                Have a query regarding cables, app configuration, coverage areas, or warranties? Read our helpful guides below or chat with our live assistant.
              </p>
            </div>

            <div className="space-y-4">
              {faqsData.map((faq) => {
                const isOpen = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left text-slate-200 hover:text-slate-100 focus:outline-none cursor-pointer"
                    >
                      <span className="font-semibold text-base tracking-wide pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-red-400" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 text-slate-300 text-sm leading-relaxed border-t border-slate-900 pt-4 animate-fade-in">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chatbot trigger help banner */}
            <div className="mt-8 bg-slate-900 border border-red-500/10 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex gap-3 items-start text-left">
                <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl mt-0.5 flex-shrink-0 hidden sm:block">
                  <ShieldCheck className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-100">Need immediate tailored answers?</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mt-0.5">
                    Our AI CCTV Assistant is ready. Click the floating chat bubble on the bottom right of your screen to get custom quotes.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  const btn = document.getElementById("chat-toggle-btn");
                  if (btn) btn.click();
                }}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 text-xs font-mono rounded-lg border border-red-500/30 transition-all cursor-pointer"
              >
                LAUNCH_ASSISTANT_FEED
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 md:py-28 border-b border-slate-900 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-400">
                BOOK YOUR NO-OBLIGATION SITE QUOTE
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
                Connect With Secure MCR Today
              </h2>
              <p className="text-slate-400 mt-3 leading-relaxed">
                Ready to protect your property? Submit our quick inquiry form below for a fast response from our Manchester-based engineers.
              </p>
            </div>

            {/* Coverage Map Section Integrated inside Contact Page */}
            <div className="mb-16">
              <SurveillanceMap />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
              
              {/* Left Column (Contacts List) */}
              <div className="lg:col-span-5 flex flex-col gap-6 justify-between bg-slate-900/30 border border-slate-800/80 p-6 md:p-8 rounded-3xl">
                <div>
                  <h3 className="text-xl font-bold text-slate-100 tracking-tight mb-4">
                    Direct Operations Desk
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    Feel free to call us or send an email directly. Our dispatch office can usually provide accurate estimated pricing over the phone if you have photos of your layout!
                  </p>

                  <div className="space-y-4">
                    {/* Phone Anchor 1 - Mobile */}
                    <a
                      href="tel:+447514856229"
                      className="flex gap-4 items-center p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl group transition-all"
                    >
                      <div className="p-3 bg-red-600/10 text-red-400 rounded-xl group-hover:scale-105 transition-all flex-shrink-0">
                        <Phone className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono block">CLICK TO CALL MOBILE/EMERGENCY</span>
                        <span className="text-slate-200 text-base font-bold font-mono">+44 7514 856229</span>
                      </div>
                    </a>

                    {/* Phone Anchor 2 - Landline */}
                    <a
                      href="tel:+441618506229"
                      className="flex gap-4 items-center p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl group transition-all"
                    >
                      <div className="p-3 bg-red-600/10 text-red-400 rounded-xl group-hover:scale-105 transition-all flex-shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono block">MANCHESTER OPERATIONS DESK</span>
                        <span className="text-slate-200 text-base font-bold font-mono">+44 161 850 6229</span>
                      </div>
                    </a>

                    {/* Email Anchor */}
                    <a
                      href="mailto:securemcr@gmail.com"
                      className="flex gap-4 items-center p-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 rounded-2xl group transition-all"
                    >
                      <div className="p-3 bg-red-600/10 text-red-400 rounded-xl group-hover:scale-105 transition-all flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-mono block">CLICK TO EMAIL DIRECT</span>
                        <span className="text-slate-200 text-base font-bold font-mono truncate border-none outline-none">securemcr@gmail.com</span>
                      </div>
                    </a>
                  </div>

                  {/* Social Media Details Grid inside contact side block */}
                  <div className="mt-6 pt-6 border-t border-slate-850/60">
                    <span className="block text-[11px] font-mono text-slate-500 uppercase tracking-widest mb-3">FOLLOW OUR CHANNELS</span>
                    <div className="grid grid-cols-4 gap-2.5">
                      <a
                        href="https://facebook.com/securemcr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-red-400 transition-all group"
                        title="Follow Secure MCR on Facebook"
                      >
                        <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] font-mono mt-1 text-slate-500 group-hover:text-slate-400">FACEBOOK</span>
                      </a>
                      <a
                        href="https://instagram.com/securemcr_cctv"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-red-400 transition-all group"
                        title="Follow Secure MCR on Instagram"
                      >
                        <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] font-mono mt-1 text-slate-500 group-hover:text-slate-400">INSTAGRAM</span>
                      </a>
                      <a
                        href="https://twitter.com/securemcr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-red-400 transition-all group"
                        title="Follow Secure MCR on X (Twitter)"
                      >
                        <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] font-mono mt-1 text-slate-500 group-hover:text-slate-400">TWITTER</span>
                      </a>
                      <a
                        href="https://linkedin.com/company/secure-mcr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-red-400 transition-all group"
                        title="Connect with Secure MCR on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[9px] font-mono mt-1 text-slate-500 group-hover:text-slate-400">LINKEDIN</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Red CTA Banner from Design Theme */}
                <div className="bg-red-600 p-6 rounded-2xl relative overflow-hidden shadow-xl shadow-red-500/10">
                  <div className="relative z-10">
                    <p className="text-red-100 text-xs font-bold uppercase mb-1 tracking-wider">Need assistance?</p>
                    <h4 className="text-white text-xl font-bold mb-4">Book a Free Site Survey</h4>
                    <button
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          service: "CCTV Installation",
                          message: "Hi, I would like to book a free site survey to discuss our property security requirements. Please contact me to coordinate a date and time."
                        }));
                        scrollTo("contact");
                      }}
                      className="inline-block bg-white hover:bg-slate-100 text-red-600 font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg transition-colors cursor-pointer"
                    >
                      Contact Specialists
                    </button>
                  </div>
                  <svg className="absolute -right-4 -bottom-4 w-32 h-32 text-red-500/30" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>

                <div className="pt-6 border-t border-slate-800/60 space-y-3">
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Office Address:</span>
                    <span className="text-slate-200">Manchester City Centre, UK</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Monday - Saturday:</span>
                    <span className="text-slate-200 font-mono">08:00 AM - 18:00 PM</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>Sunday Coverage:</span>
                    <span className="text-amber-400/85">Emergency Callout Service Only</span>
                  </div>
                </div>
              </div>

              {/* Right Column (Contact Form) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 relative">
                
                {/* Form Submitted Successful Overlay */}
                {formSubmitted && (
                  <div className="absolute inset-0 bg-slate-900/98 rounded-3xl flex flex-col items-center justify-center p-8 text-center z-20 animate-fade-in">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center mb-6">
                      <Check className="w-8 h-8 animate-bounce" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-100 tracking-tight">
                      Inquiry Logged Successfully!
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mt-2 max-w-md">
                      Thank you for contacting Secure MCR. One of our certified security surveyors will review your address and reach out to you on your provided phone number shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-6 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}

                <h3 className="text-xl font-bold text-slate-100 tracking-tight mb-6">
                  Online Inquiry & Quote Form
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name input */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="John Doe"
                        className={`w-full bg-slate-950 border ${
                          formErrors.name ? "border-red-500/60" : "border-slate-800"
                        } rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-red-500/40 transition-colors`}
                      />
                      {formErrors.name && (
                        <span className="block text-[10px] text-red-400 font-mono mt-1">
                          {formErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Your Email Address
                      </label>
                      <input
                        type="type"
                        value={formData.email}
                        onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                        placeholder="john@example.com"
                        className={`w-full bg-slate-950 border ${
                          formErrors.email ? "border-red-500/60" : "border-slate-800"
                        } rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-red-500/40 transition-colors`}
                      />
                      {formErrors.email && (
                        <span className="block text-[10px] text-red-400 font-mono mt-1">
                          {formErrors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone input */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Your Contact Phone Number
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="e.g., +44 7514 856229"
                        className={`w-full bg-slate-950 border ${
                          formErrors.phone ? "border-red-500/60" : "border-slate-800"
                        } rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-red-500/40 transition-colors`}
                      />
                      {formErrors.phone && (
                        <span className="block text-[10px] text-red-400 font-mono mt-1">
                          {formErrors.phone}
                        </span>
                      )}
                    </div>

                    {/* Service requested selector */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Service Required
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none focus:border-red-500/40 transition-colors cursor-pointer"
                      >
                        <option value="CCTV Installation">CCTV Supply & Installation</option>
                        <option value="CCTV Upgrades">CCTV Upgrades / Replacements</option>
                        <option value="Wireless CCTV">Smart Wireless CCTV</option>
                        <option value="Remote Viewing">Mobile App Viewing Setup</option>
                        <option value="Maintenance">Routine Servicing & Support</option>
                        <option value="Commercial Security">Commercial Scale Security</option>
                        {formData.service.includes("Inquiry") && (
                          <option value={formData.service}>{formData.service}</option>
                        )}
                      </select>
                    </div>
                  </div>

                  {/* Message body */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Describe Your Layout or Questions
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Please let us know how many cameras you require, property details, and postcode coverage."
                      rows={4}
                      className={`w-full bg-slate-950 border ${
                        formErrors.message ? "border-red-500/60" : "border-slate-800"
                      } rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-red-500/40 transition-colors`}
                    />
                    {formErrors.message && (
                      <span className="block text-[10px] text-red-400 font-mono mt-1">
                        {formErrors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:from-slate-800 disabled:to-slate-800 text-white font-bold rounded-xl active:scale-98 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>LOGGING INQUIRY...</span>
                      </>
                    ) : (
                      <span>Request Free Quote Surveys</span>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-slate-950 border-t border-slate-900 py-16 text-slate-400 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
            
            {/* Column 1 - Brand Info */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <div className="flex items-center justify-center w-10 h-10 bg-red-600/10 border border-red-500/20 text-red-500 rounded-xl">
                  <Shield className="w-5.5 h-5.5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Secure <span className="text-red-500">MCR</span>
                </span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm text-slate-400">
                Secure MCR is a leading supplier and professional installer of high-definition and wireless smart CCTV camera systems across Greater Manchester and the wider United Kingdom. Protect your residential home or commercial business with a trusted local expert.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollTo("home")} className="hover:text-red-400 transition-colors cursor-pointer">Home</button></li>
                <li><button onClick={() => scrollTo("about")} className="hover:text-red-400 transition-colors cursor-pointer">About Us</button></li>
                <li><button onClick={() => scrollTo("services")} className="hover:text-red-400 transition-colors cursor-pointer">Services</button></li>
                <li><button onClick={() => scrollTo("products")} className="hover:text-red-400 transition-colors cursor-pointer">Security Systems</button></li>
                <li><button onClick={() => scrollTo("gallery")} className="hover:text-red-400 transition-colors cursor-pointer">CCTV Gallery</button></li>
                <li><button onClick={() => scrollTo("reviews")} className="hover:text-red-400 transition-colors cursor-pointer">Customer Reviews</button></li>
              </ul>
            </div>

            {/* Column 3 - Services quick references */}
            <div className="md:col-span-2">
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider mb-4">Services</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => { setFormData(p => ({ ...p, service: "CCTV Installation" })); scrollTo("contact"); }} className="hover:text-red-400 transition-colors">CCTV Installation</button></li>
                <li><button onClick={() => { setFormData(p => ({ ...p, service: "CCTV Upgrades" })); scrollTo("contact"); }} className="hover:text-red-400 transition-colors">CCTV Upgrades</button></li>
                <li><button onClick={() => { setFormData(p => ({ ...p, service: "Wireless CCTV" })); scrollTo("contact"); }} className="hover:text-red-400 transition-colors">Wireless CCTV</button></li>
                <li><button onClick={() => { setFormData(p => ({ ...p, service: "Remote Viewing" })); scrollTo("contact"); }} className="hover:text-red-400 transition-colors">Remote Mobile Viewing</button></li>
                <li><button onClick={() => { setFormData(p => ({ ...p, service: "Maintenance" })); scrollTo("contact"); }} className="hover:text-red-400 transition-colors">CCTV Repairs</button></li>
              </ul>
            </div>

            {/* Column 4 - Contact reference */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <h4 className="text-sm font-bold text-slate-100 uppercase tracking-wider">Contact Info</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex gap-2 items-start">
                  <Phone className="w-3.5 h-3.5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    <a href="tel:+447514856229" className="hover:text-red-400 transition-colors font-mono font-bold block">
                      +44 7514 856229 <span className="text-[10px] text-slate-500 font-normal ml-1">(Mobile Dispatch)</span>
                    </a>
                    <a href="tel:+441618506229" className="hover:text-red-400 transition-colors font-mono font-bold block">
                      +44 161 850 6229 <span className="text-[10px] text-slate-500 font-normal ml-1">(Office Desk)</span>
                    </a>
                  </div>
                </li>
                <li className="flex gap-2 items-center">
                  <Mail className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <a href="mailto:securemcr@gmail.com" className="hover:text-red-400 transition-colors font-mono font-bold truncate">
                    securemcr@gmail.com
                  </a>
                </li>
                <li className="flex gap-2 items-center">
                  <MapPin className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                  <span>Manchester City Centre, UK</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center text-center sm:text-left">
              <span>© 2026 Secure MCR Ltd.</span>
              <span className="hidden sm:inline text-slate-800">|</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SSAIB Certificated Installer</span>
            </div>
            
            {/* Backlinks as explicitly outlined in requirements */}
            <div className="text-center">
              Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:underline font-bold">iWebNext</a>
            </div>

            {/* Social media details with beautiful interactive buttons */}
            <div className="flex items-center gap-2">
              <a
                href="https://facebook.com/securemcr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 border border-slate-800 hover:border-red-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                title="Follow Secure MCR on Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/securemcr_cctv"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 border border-slate-800 hover:border-red-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                title="Follow Secure MCR on Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com/securemcr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 border border-slate-800 hover:border-red-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                title="Follow Secure MCR on Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/secure-mcr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 hover:bg-red-600 border border-slate-800 hover:border-red-500/30 flex items-center justify-center text-slate-400 hover:text-white transition-all"
                title="Connect with Secure MCR on LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOAT WIDGETS */}
      
      {/* Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-40 p-3.5 bg-slate-900/80 hover:bg-red-600 hover:text-white text-red-400 border border-red-500/20 rounded-xl shadow-2xl active:scale-95 transition-all duration-300 pointer-events-auto"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating AI Chatbot Assistant Widget */}
      <SecurityChatbot />

    </div>
  );
}
