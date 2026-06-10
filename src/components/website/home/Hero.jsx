import { ImageCarousel } from "../Carousel";
import { Trophy, Calendar, MapPin, Users } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 py-6">
      <div className="space-y-4">
        {/* Tournament Banner */}
        <div className="relative bg-gradient-to-r from-[#f59e0b] via-[#dc2626] to-[#f59e0b] p-[2px] rounded-xl">
          <div className="bg-white p-4 rounded-xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-[#f59e0b]" />
              <h2 className="text-xl md:text-2xl font-bold text-primary">
                Tournament 2026
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-50 p-2 rounded-lg border border-[#f59e0b]/30 text-center shadow-sm">
                <Calendar className="w-4 h-4 text-[#f59e0b] mx-auto mb-1" />
                <p className="text-[#f59e0b] font-bold">6-9 Nov</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-[#f59e0b]/30 text-center shadow-sm">
                <MapPin className="w-4 h-4 text-[#f59e0b] mx-auto mb-1" />
                <p className="text-slate-800 font-bold text-sm">Phogan</p>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-[#f59e0b]/30 text-center shadow-sm">
                <Users className="w-4 h-4 text-[#f59e0b] mx-auto mb-1" />
                <p className="text-slate-800 font-bold text-sm">Only Villagers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hindi Content */}
        <div className="bg-white p-4 rounded-xl border border-[#f59e0b]/20 shadow-sm">
          <h3 className="text-lg font-bold text-primary mb-2">
            🏏 प्रेमपुरी क्रिकेट लीग
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            फोगा के युवाओं के लिए विशेष टूर्नामेंट। 6, 7, 8 और 9 नवंबर को हमारे साथ जुड़ें।
          </p>
        </div>

        {/* English Content */}
        <div className="bg-white p-4 rounded-xl border border-[#f59e0b]/20 shadow-sm">
          <h3 className="text-lg font-bold text-primary mb-2">
            🏏 Prempuri Cricket League
          </h3>
          <p className="text-slate-700 text-sm leading-relaxed">
            Special tournament for youth of Phogan. Join us on November 6, 7, 8 & 9.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/20 hover:border-[#f59e0b] hover:shadow-sm transition-all">
            <div className="text-[#f59e0b] text-xl mb-1">🏆</div>
            <p className="text-primary font-bold text-sm">4 Days</p>
            <p className="text-slate-500 text-xs">Cricket</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/20 hover:border-[#f59e0b] hover:shadow-sm transition-all">
            <div className="text-[#f59e0b] text-xl mb-1">🏏</div>
            <p className="text-primary font-bold text-sm">Local</p>
            <p className="text-slate-500 text-xs">Teams</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/20 hover:border-[#f59e0b] hover:shadow-sm transition-all">
            <div className="text-[#f59e0b] text-xl mb-1">🎁</div>
            <p className="text-primary font-bold text-sm">Prizes</p>
            <p className="text-slate-500 text-xs">Winners</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/20 hover:border-[#f59e0b] hover:shadow-sm transition-all">
            <div className="text-[#f59e0b] text-xl mb-1">🤝</div>
            <p className="text-primary font-bold text-sm">Unity</p>
            <p className="text-slate-500 text-xs">Spirit</p>
          </div>
        </div>
      </div>
      
      <ImageCarousel />
    </section>
  );
}
