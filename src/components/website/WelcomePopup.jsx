import { Trophy, Calendar, MapPin, X } from "lucide-react";

export default function WelcomePopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center w-full h-full z-50 p-4 backdrop-blur-sm">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-8 border-2 border-[#f59e0b]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#f59e0b] hover:bg-[#dc2626] rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Animated trophy */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center float-animation shadow-lg shadow-[#f59e0b]/50">
          <Trophy className="w-10 h-10 text-white" />
        </div>

        <div className="mt-8 mb-6">
          <div className="relative rounded-full w-32 h-32 mx-auto mb-4 ring-4 ring-[#f59e0b] shadow-xl">
            <img
              src="/logo.png"
              alt="Prempuri Cricket League"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Prempuri Cricket League
          </h2>
          <p className="text-center text-[#f59e0b] font-medium">
            🏏 Village Cricket Tournament 2026
          </p>
        </div>

        {/* Tournament Details Banner */}
        <div className="bg-gradient-to-r from-[#f59e0b] via-[#dc2626] to-[#f59e0b] p-1 rounded-xl mb-6">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-center text-slate-800 font-bold text-xl mb-4">Tournament Dates</h3>
            <div className="grid grid-cols-4 gap-3">
              {[6, 7, 8, 9].map((date) => (
                <div key={date} className="bg-white p-4 rounded-lg text-center border border-[#f59e0b]/30 shadow-sm">
                  <Calendar className="w-6 h-6 text-[#f59e0b] mx-auto mb-2" />
                  <p className="text-primary font-bold text-2xl">{date}</p>
                  <p className="text-slate-500 text-xs">November</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hindi Content */}
        <div className="space-y-4 mb-6">
          <div className="bg-[#1e3a8a]/10 p-5 rounded-xl border-l-4 border-[#f59e0b]">
            <p className="text-slate-700 leading-relaxed">
              फोगा के युवाओं के लिए एक विशेष क्रिकेट टूर्नामेंट। यह हमारे गाँव की एकता और खेल 
              भावना का उत्सव है।
            </p>
          </div>

          {/* English Content */}
          <div className="bg-slate-50 p-5 rounded-xl border-l-4 border-[#dc2626]">
            <p className="text-slate-700 leading-relaxed">
              A special cricket tournament for the youth of Phogan. This is a celebration 
              of our village unity and sporting spirit.
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <MapPin className="w-4 h-4 text-[#f59e0b]" />
            <span>Phogan, Rajasthan</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-[#f59e0b] to-[#dc2626] hover:from-[#dc2626] hover:to-[#f59e0b] text-white rounded-xl py-4 font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
        >
          <Trophy className="w-5 h-5" />
          Let's Play Cricket!
        </button>
      </div>
    </div>
  );
}
