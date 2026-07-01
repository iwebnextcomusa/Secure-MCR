import { ServiceItem, ProductItem, TestimonialItem, FAQItem } from "./types";

export const servicesData: ServiceItem[] = [
  {
    id: "cctv-installation",
    title: "CCTV Installation",
    description: "Professional supply and installation of high-definition and IP-based CCTV cameras, complete with DVR/NVR recorders and neat, high-spec cabling.",
    iconName: "Camera"
  },
  {
    id: "cctv-upgrades",
    title: "CCTV Upgrades",
    description: "Upgrade your legacy analog cameras to state-of-the-art HD or 4K technology. In many cases, we can utilize your existing wiring to keep costs extremely low.",
    iconName: "RefreshCw"
  },
  {
    id: "wireless-cctv",
    title: "Wireless CCTV",
    description: "Smart, reliable, high-speed wireless surveillance systems. Ideal for properties where running physical ethernet or coax cables is structurally difficult.",
    iconName: "Wifi"
  },
  {
    id: "remote-viewing",
    title: "Remote Viewing Setup",
    description: "Connect your cameras to your secure home network. We set up and configure apps on your Apple iOS and Android devices for worldwide live viewing with £0 monthly fees.",
    iconName: "Smartphone"
  },
  {
    id: "cctv-maintenance",
    title: "Maintenance & Repairs",
    description: "Routine annual health checks, lens cleaning, rewiring, hard drive health inspections, and urgent repair services to keep your property protected 24/7.",
    iconName: "Wrench"
  },
  {
    id: "commercial-security",
    title: "Commercial Security",
    description: "Large-scale security installations for shops, warehouses, schools, and offices. Multi-channel recording, integration, and security guard station configurations.",
    iconName: "ShieldAlert"
  }
];

export const productsData: ProductItem[] = [
  {
    id: "2-cam-kit",
    name: "Premium 2-Camera 4K Kit",
    description: "Perfect for terraced/semi-detached houses and small retail units. Provides full front and rear security coverage.",
    price: "£499",
    features: [
      "2x 4K UHD Weatherproof Dome Cameras",
      "1x 4-Channel Network Video Recorder (NVR)",
      "1TB Surveillance-Grade Hard Drive (30-day loop)",
      "Full Mobile App Remote Viewing Setup",
      "Smart Motion Alerts & Color Night Vision",
      "Professional Installation & 3-Year Warranty"
    ],
    imageType: "kit2"
  },
  {
    id: "4-cam-kit",
    name: "Supreme 4-Camera 4K Kit",
    description: "Our most popular residential package. Offers full perimeter coverage for medium homes, offices, and restaurants.",
    price: "£799",
    features: [
      "4x 4K UHD Weatherproof Cameras (Dome/Bullet)",
      "1x 4-Channel Network Video Recorder (NVR)",
      "2TB High-Performance Surveillance Storage",
      "Worldwide Phone & Tablet Live Viewing",
      "Intelligent Human & Vehicle Detection",
      "Professional Installation & Full Demo"
    ],
    imageType: "kit4"
  },
  {
    id: "8-cam-kit",
    name: "Enterprise 8-Camera 4K Kit",
    description: "Full-scale coverage designed for larger residential estates, commercial warehouses, or multi-floor office blocks.",
    price: "£1,499",
    features: [
      "8x 4K Ultra-HD Network IP Cameras",
      "1x 8-Channel PoE NVR Recorder",
      "4TB Dedicated Surveillance Storage",
      "Advanced AI Face & Intrusion Line Detection",
      "Power over Ethernet (PoE) direct cabling",
      "Full remote viewing app configuration"
    ],
    imageType: "kit8"
  },
  {
    id: "smart-wifi-cam",
    name: "Smart Wireless WiFi Camera",
    description: "Flexible, ultra-modern smart cameras that integrate seamlessly into your home automation system.",
    price: "£189",
    features: [
      "Full HD 1080p Resolution & Wide Angle Lens",
      "Two-Way Audio (Speak and listen through app)",
      "Built-in Bright Siren & Spotlights for Deterrence",
      "Rechargeable battery or continuous solar power",
      "MicroSD Local Card backup support"
    ],
    imageType: "wireless"
  },
  {
    id: "ptz-camera",
    name: "4K Speed Dome PTZ Camera",
    description: "Advanced Pan-Tilt-Zoom security camera with 30x optical zoom and automatic active target tracking.",
    price: "£349",
    features: [
      "360° Continuous Pan, 90° Tilt",
      "30x Optical Zoom for long-distance reading",
      "Smart AI Human Auto-Tracking technology",
      "Ultra-long range 150m smart IR Night Vision",
      "Highly durable vandal-proof IK10 alloy body"
    ],
    imageType: "ptz"
  },
  {
    id: "night-vision-cam",
    name: "Extreme Color Night Vision Camera",
    description: "Revolutionary low-light technology that delivers vivid, full-color images even in complete darkness.",
    price: "£149",
    features: [
      "5MP High-Sensitivity sensor",
      "Dual warm-white LEDs (Activates on motion detection)",
      "Protects against midnight blind spots",
      "IP67 Professional Waterproof rating",
      "On-board microphone for sound recording"
    ],
    imageType: "dome"
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Marcus Thorne",
    location: "Didsbury, Manchester",
    rating: 5,
    text: "Absolutely superb service from Secure MCR. They supplied and installed a 4-camera 4K system at my home last week. The cabling is completely hidden, the cameras look sleek, and they took the time to set up the mobile app on both mine and my wife's phones. Excellent explanation of how to use it too. Highly recommended!",
    date: "June 2026",
    tag: "Residential"
  },
  {
    id: "test-2",
    name: "Sarah Jenkins",
    location: "Stockport, Greater Manchester",
    rating: 5,
    text: "We had our old grainy analog CCTV cameras upgraded to 4K IP digital cameras at our high-street boutique. Secure MCR managed to reuse some of our piping, which saved us hundreds of pounds. The quality difference is unbelievable—we can actually read license plates in the back alley now! Professional, clean, and friendly crew.",
    date: "May 2026",
    tag: "Commercial"
  },
  {
    id: "test-3",
    name: "David Alabi",
    location: "Salford Quays",
    rating: 5,
    text: "Very competitive pricing. I got several quotes for an 8-camera warehouse setup and Secure MCR was by far the most responsive and reasonably priced. The technician arrived on time, was fully insured, and worked around our busy dispatch hours. The intelligent human tracking works perfectly on our phones.",
    date: "April 2026",
    tag: "Commercial"
  },
  {
    id: "test-4",
    name: "Fiona Higgins",
    location: "Altrincham",
    rating: 5,
    text: "Brilliant customer service! As an elderly lady living alone, security is very important to me. Secure MCR installed two smart wireless cameras and a smart doorbell. They were so polite, vacuumed up the small amount of plaster dust from drilling, and didn't leave until I felt fully confident turning the system on and off. 5 stars!",
    date: "June 2026",
    tag: "Residential"
  }
];

export const faqsData: FAQItem[] = [
  {
    id: "faq-cost",
    question: "How much does professional CCTV installation cost?",
    answer: "Our entry-level 2-camera 4K kit starts at £499, and our popular 4-camera 4K home security package starts at £799. This is an all-inclusive price covering the cameras, the recording box (NVR), hard drive storage, professional cabling, configuration of the mobile app, training, and a 3-year warranty. We offer free, custom, no-obligation quotes for both residential and commercial buildings."
  },
  {
    id: "faq-residential",
    question: "Do you install residential systems or only commercial?",
    answer: "We install both! We cater to homes of all sizes (from terraces and flats to large country estates) as well as commercial premises such as shops, restaurants, warehouses, office complexes, schools, and business yards."
  },
  {
    id: "faq-remote-viewing",
    question: "Can I view my cameras remotely on my phone, and is there a monthly fee?",
    answer: "Yes, you can view your security cameras live and play back historic footage from anywhere in the world on your smartphone (iPhone and Android) or tablet. Best of all, once installed, there are absolutely NO monthly subscription fees or running costs. It is completely free to use."
  },
  {
    id: "faq-install-duration",
    question: "How long does a typical CCTV installation take?",
    answer: "A standard 2 to 4 camera home installation is completed in a single day. Our professional engineers will arrive in the morning, complete the mounting and neat cabling, configure your recording unit and phone apps in the afternoon, and give you a complete demonstration before leaving."
  },
  {
    id: "faq-maintenance",
    question: "Do you provide maintenance and support after installation?",
    answer: "Absolutely. Secure MCR prides itself on post-purchase care. All our hardware and installations come with a minimum 2 to 3-year warranty. We also offer annual health-check maintenance plans (lens cleaning, connection checks, firmware updates) and emergency support to ensure continuous operation."
  },
  {
    id: "faq-wireless",
    question: "Are wireless CCTV cameras reliable?",
    answer: "Yes! Modern smart wireless CCTV cameras are highly reliable when paired with a robust WiFi network or direct secure bridges. They are ideal for properties where drilling or extensive cabling is prohibited or physically impossible. We evaluate your property's WiFi signal strength during our survey to ensure excellent connectivity."
  }
];

export const whyChooseUsData = [
  {
    title: "Fully Insured",
    description: "Full public and professional indemnity insurance for absolute peace of mind during works.",
    iconName: "Shield"
  },
  {
    title: "Professional Installation",
    description: "Highly experienced and certified security installers ensuring completely hidden, neat cabling.",
    iconName: "CheckCircle"
  },
  {
    title: "Competitive Prices",
    description: "We supply premium high-end equipment at fair, honest prices with zero hidden monthly fees.",
    iconName: "Tag"
  },
  {
    title: "Free Quotations",
    description: "No-obligation free home surveys and customized quotes based on your exact layout and budget.",
    iconName: "FileText"
  },
  {
    title: "HD & 4K Cameras",
    description: "Enjoy ultra-crisp zoom clarity, license plate recognition, and advanced color night vision.",
    iconName: "Tv"
  },
  {
    title: "Mobile App Viewing",
    description: "Watch live, playback history, and receive motion alerts on your phone or tablet from anywhere.",
    iconName: "Smartphone"
  },
  {
    title: "Fast Response",
    description: "Local team based in Manchester. Quick turnaround times from quote survey to final installation.",
    iconName: "Clock"
  },
  {
    title: "Customer Satisfaction",
    description: "Dozens of 5-star local reviews. We don't leave until you are 100% satisfied with your system.",
    iconName: "ThumbsUp"
  }
];
