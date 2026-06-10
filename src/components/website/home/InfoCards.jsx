import { useEffect, useState } from "react";
import {
  Phone,
  Calendar,
  Trophy,
  Clock,
  Users,
  Sparkles,
  Award,
} from "lucide-react";
import { birthdays } from "../../../services/memberService";

export default function InfoCards() {
  const [todaysBirthdays, setTodaysBirthdays] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch today's birthdays
  useEffect(() => {
    const fetchBirthdays = async () => {
      setLoading(true);
      try {
        const response = await birthdays();
        if (!response.status == 200) {
          throw response;
        }

        setTodaysBirthdays(response.data?.birthdays || []);
      } catch (error) {
        console.error("Error fetching birthdays:", error);
        setTodaysBirthdays([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBirthdays();
  }, []);

  const BirthdayContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="relative">
            <div className="w-8 h-8 border-2 border-[#f59e0b] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      );
    }

    if (todaysBirthdays.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="relative mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md border border-[#f59e0b]/30">
              <Trophy className="w-8 h-8 text-[#f59e0b]" />
            </div>
          </div>
          <h4 className="text-lg font-semibold text-slate-800 mb-2">
            No Birthday Celebrations Today
          </h4>
          <p className="text-sm text-slate-500 mb-4">
            Every player is special in our PCL family!
          </p>
        </div>
      );
    }

    if (todaysBirthdays.length === 1) {
      const member = todaysBirthdays[0];
      return (
        <div className="py-8 flex items-center justify-center gap-8">
          <div className="relative mb-6">
            <div className="md:w-30 w-20 h-20 md:h-30 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-2xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-[#f59e0b]/30">
              <span className="text-white text-2xl md:text-5xl font-bold">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="md:text-3xl text-lg font-bold text-slate-800">
                {member.name}
              </h4>
              <p className="md:text-lg text-md text-slate-500">
                {member.designation || "Player"}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#f59e0b]/10 to-[#dc2626]/10 rounded-full border-2 border-[#f59e0b]">
              <Trophy className="w-4 h-4 text-[#f59e0b] animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-slate-800">
                🎂 Birthday Champion Today!
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="py-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-sm font-semibold text-slate-800 uppercase tracking-wider">
              Birthday Stars
            </span>
          </div>
          <span className="px-2 py-1 bg-[#f59e0b] text-white text-xs font-medium rounded-full">
            {todaysBirthdays.length}
          </span>
        </div>

        <div className="max-h-60 overflow-y-auto">
          {todaysBirthdays.map((member, index) => (
            <div
              key={member.id}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-[#f59e0b]"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-semibold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)}
                  </span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {member.name}
                </p>
              </div>
              <Award className="w-4 h-4 text-[#f59e0b] group-hover:text-[#dc2626] transition-colors" />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="pt-8">
      <div className="">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/50">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-primary">
              PCL Community
            </h2>
          </div>
          <p className="text-slate-500 mt-2 max-w-xl mx-auto">
            Celebrating our cricket family and providing support
          </p>
        </div>

        {/* Equal Height Cards Container */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Birthday Card */}
          <div className="group h-full">
            <div className="relative h-full">
              <div className="relative h-full bg-white rounded-3xl border-2 border-[#f59e0b]/30 shadow-lg hover:shadow-2xl hover:shadow-[#f59e0b]/10 transition-all duration-300 hover:border-[#f59e0b]">
                <div className="h-full flex flex-col p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-2xl flex items-center justify-center shadow-lg">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#dc2626] rounded-full flex items-center justify-center shadow-sm">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">
                          Player Birthdays
                        </h3>
                        <p className="text-sm text-slate-500">
                          Celebrating our cricket stars
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center">
                    <BirthdayContent />
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-[#f59e0b]/20">
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>Updated daily • PCL Family</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="group h-full">
            <div className="relative h-full">
              <div className="relative h-full bg-white rounded-3xl border-2 border-[#f59e0b]/30 shadow-lg hover:shadow-2xl hover:shadow-[#f59e0b]/10 transition-all duration-300 hover:border-[#f59e0b]">
                <div className="h-full flex flex-col p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center shadow-lg">
                          <Phone className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#f59e0b] rounded-full flex items-center justify-center shadow-sm">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-1">
                          Contact PCL
                        </h3>
                        <p className="text-sm text-slate-500">
                          We're here to help you
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#10b981]/20 rounded-full border border-[#10b981]/30">
                      <div className="w-2 h-2 bg-[#10b981] rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-[#10b981]">
                        Available
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-center space-y-6">
                    {/* Primary Contacts */}
                    <div className="space-y-3">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-[#f59e0b]/20 shadow-sm">
                        <p className="text-xs font-semibold text-[#f59e0b] mb-2 uppercase tracking-wider">
                          📞 Primary Contact
                        </p>
                        <a
                          href="tel:+919649197690"
                          className="group/phone inline-flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4 group-hover/phone:rotate-12 transition-transform duration-200 text-[#f59e0b]" />
                          +91 9649197690
                        </a>
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 border border-[#f59e0b]/20 shadow-sm">
                        <p className="text-xs font-semibold text-[#f59e0b] mb-2 uppercase tracking-wider">
                          📱 Secondary Contact
                        </p>
                        <a
                          href="tel:+919216531975"
                          className="group/phone inline-flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-primary transition-colors"
                        >
                          <Phone className="w-4 h-4 group-hover/phone:rotate-12 transition-transform duration-200 text-[#f59e0b]" />
                          +91 9216531975
                        </a>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-slate-800 text-center mb-4 flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 text-[#f59e0b]" />
                        Contact Hours
                      </h4>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between py-3 px-4 bg-slate-50 rounded-xl hover:bg-[#1e3a8a]/10 transition-colors border border-[#f59e0b]/20 shadow-sm">
                          <span className="text-sm font-medium text-slate-800">
                            📅 Monday - Saturday
                          </span>
                          <span className="text-sm text-[#f59e0b] font-semibold">
                            9 AM - 7 PM
                          </span>
                        </div>

                        <div className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-[#dc2626]/10 to-[#f59e0b]/10 rounded-xl border border-[#dc2626]/20 shadow-sm">
                          <span className="text-sm font-medium text-slate-800">
                            🏏 Tournament Days
                          </span>
                          <span className="text-sm text-[#dc2626] font-semibold">
                            All Day
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-6 border-t border-[#f59e0b]/20">
                    <div className="text-center">
                      <p className="text-xs text-slate-500">
                        🏏 For tournament queries & registrations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
