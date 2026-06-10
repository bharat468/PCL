import { Mail, Phone, MapPin, Clock, Trophy, MessageSquare } from "lucide-react";
import ContactForm from "../../components/ContactForm";

export default function ContactUs() {
  return (
    <main className="space-y-8 md:space-y-12 max-w-7xl mx-auto px-4">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/50">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary">
            Contact Us
          </h1>
        </div>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Get in touch with us for tournament registrations and queries
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Hindi Section */}
          <div className="bg-white border-2 border-[#f59e0b]/30 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-[#f59e0b] mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              संपर्क करें
            </h2>
            <p className="text-slate-700 mb-4">
              टूर्नामेंट के बारे में जानकारी या पंजीकरण के लिए हमसे संपर्क करें।
            </p>
          </div>

          {/* English Section */}
          <div className="bg-white border-2 border-[#dc2626]/30 rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-semibold text-[#dc2626] mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              Get in Touch
            </h2>
            <p className="text-slate-700 mb-4">
              Contact us for tournament information or registration queries.
            </p>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f59e0b]/30 hover:border-[#f59e0b] transition-all hover:shadow-2xl hover:shadow-[#f59e0b]/20">
            <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-3">
              <div className="p-2 bg-[#f59e0b]/10 rounded-lg">
                <Phone className="w-5 h-5 text-[#f59e0b]" />
              </div>
              Phone / फोन
            </h3>
            <p className="text-slate-500 text-sm mb-3">
              📱 Direct call for instant support / तुरंत मदद के लिए कॉल करें
            </p>
            <div className="space-y-2">
              <a
                href="tel:+919649197690"
                className="block text-[#f59e0b] text-lg hover:text-[#dc2626] transition-colors font-medium"
              >
                +91 9649197690
              </a>
              <a
                href="tel:+919216531975"
                className="block text-[#f59e0b] text-lg hover:text-[#dc2626] transition-colors font-medium"
              >
                +91 9216531975
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f59e0b]/30 hover:border-[#f59e0b] transition-all hover:shadow-2xl hover:shadow-[#f59e0b]/20">
            <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-3">
              <div className="p-2 bg-[#dc2626]/10 rounded-lg">
                <Mail className="w-5 h-5 text-[#dc2626]" />
              </div>
              Email / ईमेल
            </h3>
            <p className="text-slate-500 text-sm mb-3">
              📧 Send us an email / हमें ईमेल करें
            </p>
            <a
              href="mailto:prempuricricketleague@gmail.com"
              className="text-[#f59e0b] text-lg hover:text-[#dc2626] transition-colors font-medium break-all"
            >
              prempuricricketleague@gmail.com
            </a>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-[#f59e0b]/30 hover:border-[#f59e0b] transition-all hover:shadow-2xl hover:shadow-[#f59e0b]/20">
            <h3 className="text-xl font-semibold text-primary mb-3 flex items-center gap-3">
              <div className="p-2 bg-[#1e3a8a]/10 rounded-lg">
                <MapPin className="w-5 h-5 text-[#1e3a8a]" />
              </div>
              Address / पता
            </h3>
            <p className="text-slate-500 text-sm mb-3">
              📍 Visit us / हमसे मिलें
            </p>
            <p className="text-slate-800 text-lg font-medium">
              Prempuri Cricket League Ground
              <br />
              Phogan
              <br />
              Rajasthan, India
            </p>
          </div>

          {/* Timings Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-slate-800 border-2 border-[#f59e0b]/30">
            <h3 className="text-xl font-semibold mb-3 text-primary flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#f59e0b]" />
              Contact Hours / समय
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span>📅 Monday - Saturday</span>
                <span className="font-bold text-[#f59e0b]">9 AM - 7 PM</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span>🏏 Tournament Days (6-9 Nov)</span>
                <span className="font-bold text-[#dc2626]">All Day</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#f59e0b]" />
            Send Message / संदेश भेजें
          </h2>
          <div className="bg-white p-6 rounded-2xl border-2 border-[#f59e0b]/30 shadow-md">
            <ContactForm />
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-[#f59e0b] to-[#dc2626] p-4 rounded-xl text-white text-center">
            <p className="font-medium">
              🏏 Tournament Registration: 6-9 November 2026
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
