import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin } from "lucide-react";
import JoinCTA from "./home/JoinCTA";

const footerNav = [
  { name: "About Us", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact Us", path: "/contact" },
  { name: "Login", path: "/login" },
];

export default function Footer() {
  return (
    <>
      <section className="container mx-auto px-4 py-3">
        {/* <JoinCTA /> */}
      </section>
      <footer className="bg-slate-100 text-slate-800 mt-12 border-t-2 border-[#f59e0b]">
        <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
          {/* Left: Logo + tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Prempuri Cricket League"
                className="rounded-full ring-4 ring-[#f59e0b] bg-white p-1 object-contain"
                width={80}
                height={80}
              />
              <div>
                <span className="text-lg font-bold text-primary">Prempuri Cricket League</span>
                <p className="text-sm text-[#f59e0b]">
                  🏏 Village Cricket Tournament
                </p>
              </div>
            </div>
            
            {/* Map - Baba Prempuri Playground */}
            <div
              className="rounded-xl overflow-hidden shadow-xl ring-2 ring-[#f59e0b]/30"
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.8475821234567!2d74.6513625!3d28.5367769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39146130ae52c3d1%3A0x766f745f33fba373!2sBaba%20Prempuri%20Playground!5e0!3m2!1sen!2sin!4v1749547200000!5m2!1sen!2sin"
                style={{
                  border: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Baba Prempuri Playground - Phogan"
              />
            </div>
          </div>

          {/* Center: Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-primary text-lg flex items-center gap-2 border-b border-[#f59e0b]/30 pb-2">
              <span className="text-[#f59e0b]">🏏</span> Quick Links
            </h3>
            <nav className="flex flex-col space-y-2">
              {footerNav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm text-slate-600 hover:text-primary transition-colors hover:translate-x-1 transform duration-200 flex items-center gap-2"
                >
                  <span className="text-[#f59e0b]">▸</span> {item.name}
                </Link>
              ))}
            </nav>
            
            <div className="pt-4 border-t border-[#f59e0b]/30">
              <h4 className="font-semibold text-slate-700 mb-3 text-sm">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="https://www.facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center hover:bg-[#0c63d4] transition-all hover:scale-110 shadow-md"
                  aria-label="Facebook"
                >
                  <Facebook className="text-white" size={20} />
                </a>
                <a 
                  href="https://www.instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-md"
                  aria-label="Instagram"
                >
                  <Instagram className="text-white" size={20} />
                </a>
                <a 
                  href="https://www.youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#ff0000] rounded-full flex items-center justify-center hover:bg-[#cc0000] transition-all hover:scale-110 shadow-md"
                  aria-label="YouTube"
                >
                  <Youtube className="text-white" size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-primary text-lg flex items-center gap-2 border-b border-[#f59e0b]/30 pb-2">
              <span className="text-[#f59e0b]">📞</span> Contact Us
            </h3>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 border border-[#f59e0b]/20 shadow-sm">
                <p className="text-xs text-[#f59e0b] font-semibold mb-1">Organization</p>
                <p className="text-slate-800 font-medium text-sm">Prempuri Cricket League</p>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-[#f59e0b]/20 shadow-sm">
                <p className="text-xs text-[#f59e0b] font-semibold mb-1 flex items-center gap-1">
                  <MapPin size={14} /> Location
                </p>
                <p className="text-slate-800 text-sm font-medium">Baba Prempuri Playground</p>
                <p className="text-slate-600 text-xs">Phogan, Rajasthan 331402</p>
                <a 
                  href="https://www.google.com/maps/place/Baba+Prempuri+Playground/@28.5367769,74.6513625,15z/data=!4m15!1m8!3m7!1s0x391461de2da214d1:0x26ddcf69f67dd54f!2sPhogan,+Rajasthan+331402!3b1!8m2!3d28.5399894!4d74.6605365!16s%2Fg%2F1hc4d378_!3m5!1s0x39146130ae52c3d1:0x766f745f33fba373!8m2!3d28.5361941!4d74.651595!16s%2Fg%2F11swrsf_x1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#f59e0b] hover:text-[#dc2626] transition-colors font-medium mt-2"
                >
                  <MapPin size={12} />
                  View on Google Maps
                </a>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-[#f59e0b]/20 shadow-sm">
                <p className="text-xs text-[#f59e0b] font-semibold mb-1">📧 Email</p>
                <a href="mailto:prempuricricketleague@gmail.com" className="text-slate-800 hover:text-primary transition-colors text-xs break-all">
                  prempuricricketleague@gmail.com
                </a>
              </div>
              
              <div className="bg-white rounded-lg p-3 border border-[#f59e0b]/20 shadow-sm">
                <p className="text-xs text-[#f59e0b] font-semibold mb-1">📱 Phone</p>
                <div className="flex flex-col gap-1">
                  <a href="tel:+919636585760" className="text-slate-800 hover:text-primary transition-colors text-sm">
                    +91 9636585760
                  </a>
                  <a href="tel:+918949893628" className="text-slate-800 hover:text-primary transition-colors text-sm">
                    +91 8949893628
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#f59e0b]/30 bg-slate-200/50 py-4">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-slate-700">
              © {new Date().getFullYear()} <span className="text-[#f59e0b] font-bold">Prempuri Cricket League</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              🏏 Tournament Dates: 6, 7, 8, 9 November 2026
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
