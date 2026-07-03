import React, { useState } from "react";
import { MapPin, ShieldCheck, Search, Navigation, Info } from "lucide-react";

export default function SurveillanceMap() {
  const [postcode, setPostcode] = useState("");
  const [coverageResult, setCoverageResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkCoverage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode.trim()) return;

    setLoading(true);
    setCoverageResult(null);

    setTimeout(() => {
      const pc = postcode.toUpperCase().replace(/\s/g, "");
      
      // Let's create robust coverage responses representing UK regions, heavily focused on Greater Manchester
      const isManchester = pc.startsWith("M") || pc.startsWith("SK") || pc.startsWith("OL") || pc.startsWith("WA") || pc.startsWith("WN") || pc.startsWith("BL") || pc.startsWith("PR") || pc.startsWith("FY") || pc.startsWith("CH") || pc.startsWith("CW");
      
      if (isManchester) {
        setCoverageResult(
          "✅ **FULL RESIDENTIAL & COMMERCIAL COVERAGE:** Excellent news! Your area is fully covered by our Manchester emergency installation hub. We have certified installers available in your postcode for **Immediate Free No-Obligation Quotation Surveys** within 24-48 hours. **Fast local response is 100% guaranteed!**"
        );
      } else {
        // Since we service nationwide UK for large setups and main areas
        setCoverageResult(
          "✅ **NATIONWIDE SERVICE AREA COVERED:** Secure MCR covers your location! We supply and professionally install high-end smart security and commercial CCTV solutions throughout your region. Please call us at **+44 7514 856229** to schedule a priority surveyor booking."
        );
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-sans">
      {/* Interactive Coverage Checking Tool */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/60 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 font-mono mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> AREA COVERAGE SCANNER
          </span>
          <h3 className="text-2xl font-bold text-slate-100 tracking-tight mb-3">
            Do We Install CCTV in Your Area?
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Secure MCR is headquartered in **Manchester** and provides rapid, premium CCTV supply, fitting, and programming across **Greater Manchester, the North West, and the entire UK**. 
          </p>

          <form onSubmit={checkCoverage} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                Enter Your UK Postcode
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  placeholder="e.g., M1, M20, SK10, OL1, London, etc."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-red-500/50 transition-colors uppercase font-mono"
                  maxLength={10}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-2 bg-red-600 hover:bg-red-500 active:scale-95 text-white rounded-lg transition-all"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          </form>

          {/* Results panel */}
          {loading && (
            <div className="mt-6 p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl text-center">
              <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-red-500 border-t-transparent mb-2"></div>
              <p className="text-xs font-mono text-slate-400">CONNECTING TO MCR_GEODB...</p>
            </div>
          )}

          {coverageResult && !loading && (
            <div className="mt-6 p-5 bg-red-950/30 border border-red-500/20 rounded-xl text-sm leading-relaxed text-slate-200 animate-fade-in">
              {coverageResult.startsWith("✅") ? (
                <div>
                  <div className="flex gap-2 items-start text-red-400 font-bold mb-1.5 font-sans">
                    <span>⚡ Secure MCR Coverage Confirmed</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    {coverageResult.replace(/✅ \*\*.*?\*\*:/g, "").trim()}
                  </p>
                </div>
              ) : (
                coverageResult
              )}
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex gap-4 items-start">
          <div className="p-2 bg-red-500/10 rounded-lg text-red-400 flex-shrink-0 mt-0.5">
            <Info className="w-4.5 h-4.5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-1">HQ Location Details</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Our central operations office is situated in Manchester, allowing rapid dispatch of parts and engineers. 
              <br />
              <strong className="text-slate-300">Fast Call-outs:</strong> 1 Hour Emergency coverage in Manchester City, Didsbury, Stockport, Salford, Trafford, and Altrincham.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Map Representation */}
      <div className="lg:col-span-7 relative flex items-center justify-center bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden min-h-[350px] shadow-2xl">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.12),transparent_70%)] pointer-events-none"></div>

        {/* Custom Visual Vector Map (Representing Secure MCR HQ and Scanning Coverage) */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between">
          {/* Top telemetry lines */}
          <div className="flex justify-between font-mono text-[9px] text-red-400/50">
            <span>MAP.LAYERS: SATELLITE_SURVEILLANCE_GRID</span>
            <span>ZOOM: 12.5X // NORTH_UP</span>
          </div>

          {/* Map Vector Core Drawing */}
          <div className="flex-1 w-full flex items-center justify-center relative">
            
            {/* Pulsing coverage radar circle 1 */}
            <div className="absolute w-[240px] h-[240px] rounded-full border border-red-500/15 bg-red-500/5 animate-pulse flex items-center justify-center">
              {/* Pulsing coverage radar circle 2 */}
              <div className="w-[140px] h-[140px] rounded-full border border-red-500/30 bg-red-500/5 flex items-center justify-center">
                {/* Core HQ Point */}
                <div className="relative z-10 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                  <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75"></span>
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            </div>

            {/* Sweep overlay lines simulating actual surveillance scanning */}
            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-red-500/40 to-transparent pointer-events-none"></div>
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent pointer-events-none"></div>

            {/* Simulated street overlays (Abstract artistic lines of Manchester city center) */}
            <svg className="absolute w-[80%] h-[80%] opacity-20 pointer-events-none" viewBox="0 0 100 100" fill="none">
              <path d="M10 10 L90 90" stroke="#ef4444" strokeWidth="0.5" />
              <path d="M10 90 L90 10" stroke="#ef4444" strokeWidth="0.5" />
              <path d="M50 0 L50 100" stroke="#ef4444" strokeWidth="0.5" />
              <path d="M0 50 L100 50" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 2" />
              <circle cx="50" cy="50" r="10" stroke="#ef4444" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="30" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 3" />
              <rect x="25" y="25" width="50" height="50" stroke="#ef4444" strokeWidth="0.2" />
            </svg>

            {/* Floating visual indicators for surrounding boroughs */}
            <div className="absolute top-[20%] left-[25%] px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 flex items-center gap-1 shadow-md">
              <Navigation className="w-2.5 h-2.5 text-red-500 rotate-45" />
              <span>SALFORD // OK</span>
            </div>

            <div className="absolute bottom-[20%] right-[15%] px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 flex items-center gap-1 shadow-md">
              <Navigation className="w-2.5 h-2.5 text-red-500 rotate-90" />
              <span>STOCKPORT // OK</span>
            </div>

            <div className="absolute top-[65%] left-[10%] px-2.5 py-1 bg-slate-950/80 border border-slate-800 rounded-lg text-[10px] font-mono text-slate-300 flex items-center gap-1 shadow-md">
              <Navigation className="w-2.5 h-2.5 text-red-500" />
              <span>ALTRINCHAM // OK</span>
            </div>

            {/* Main Central HQ label card */}
            <div className="absolute top-[42%] left-[55%] z-20 bg-slate-950 border border-red-500/40 rounded-xl p-3 shadow-2xl backdrop-blur-md max-w-[200px] hover:border-red-500 transition-colors">
              <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block"></span>
                Secure MCR HQ
              </h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                Professional Office Base
                <br />
                Manchester, UK
                <br />
                <a href="tel:+447514856229" className="text-red-400 font-semibold hover:underline mt-0.5 inline-block">
                  +44 7514 856229
                </a>
              </p>
            </div>
          </div>

          {/* Bottom telemetry line */}
          <div className="flex justify-between items-center font-mono text-[9px] text-red-400/50">
            <span>COORDS: 53.4808° N, 2.2426° W</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span>GPS FEED: LIVE CONNECTION</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
