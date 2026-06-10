import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Users, Trophy, Heart, Sparkles } from "lucide-react";

export default function AboutUs() {
  return (
    <main className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/50">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            About Prempuri Cricket League
          </h1>
        </div>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A village cricket tournament bringing together the youth of Phogan
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge className="px-4 py-2 bg-white border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white shadow-sm">
            <Users className="h-4 w-4 mr-2" />
            Village Tournament
          </Badge>
          <Badge className="px-4 py-2 bg-white border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white shadow-sm">
            <Trophy className="h-4 w-4 mr-2" />
            6-9 November 2026
          </Badge>
          <Badge className="px-4 py-2 bg-white border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-white shadow-sm">
            <Heart className="h-4 w-4 mr-2" />
            Community Spirit
          </Badge>
        </div>
      </section>

      {/* Mission and Vision Cards */}
      <section className="grid md:grid-cols-2 gap-8">
        {/* Hindi Mission Card */}
        <Card className="bg-white border-2 border-[#f59e0b]/30 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#f59e0b]/10 rounded-full">
                <Target className="h-8 w-8 text-[#f59e0b]" />
              </div>
              <h2 className="text-3xl font-bold text-[#f59e0b]">
                हमारा उद्देश्य
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-slate-50 to-[#1e3a8a]/5 p-6 rounded-lg border-l-4 border-l-[#f59e0b]">
                <p className="text-lg leading-relaxed text-slate-700">
                  प्रेमपुरी क्रिकेट लीग का उद्देश्य फोगा के युवाओं को एक मंच प्रदान करना है 
                  जहाँ वे अपनी क्रिकेट प्रतिभा को दिखा सकें।
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg border border-[#f59e0b]/20">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-1">✓</span>
                    <span>गाँव के युवाओं को एक साथ लाना</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-1">✓</span>
                    <span>स्थानीय प्रतिभा को बढ़ावा देना</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-1">✓</span>
                    <span>खेल भावना और एकता को मजबूत करना</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#f59e0b] mt-1">✓</span>
                    <span>स्वस्थ प्रतिस्पर्धा का माहौल बनाना</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* English Vision Card */}
        <Card className="bg-white border-2 border-[#f59e0b]/30 shadow-lg hover:shadow-xl transition-all">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-[#dc2626]/10 rounded-full">
                <Eye className="h-8 w-8 text-[#dc2626]" />
              </div>
              <h2 className="text-3xl font-bold text-[#dc2626]">
                Our Vision
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-slate-50 to-[#dc2626]/5 p-6 rounded-lg border-l-4 border-l-[#dc2626]">
                <p className="text-lg leading-relaxed text-slate-700">
                  To create a platform where young cricketers from Phogan can showcase 
                  their talent and build lasting friendships through the spirit of cricket.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-lg border border-[#dc2626]/20">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#dc2626] mt-1">✓</span>
                    <span>Unite village youth through cricket</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#dc2626] mt-1">✓</span>
                    <span>Promote local sporting talent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#dc2626] mt-1">✓</span>
                    <span>Strengthen community bonds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#dc2626] mt-1">✓</span>
                    <span>Foster healthy competition</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* What We Offer */}
      <section className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-7 h-7 text-[#f59e0b]" />
            Tournament Highlights
          </h2>
          <p className="text-slate-500">What makes PCL special</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white border-2 border-[#f59e0b]/30 hover:border-[#f59e0b] shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary">4 Days Tournament</h3>
              <p className="text-slate-600">
                6, 7, 8, 9 November - Non-stop cricket action across four exciting days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-[#f59e0b]/30 hover:border-[#f59e0b] shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#dc2626] to-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary">Local Teams</h3>
              <p className="text-slate-600">
                Teams from Phogan village competing with pride
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-[#f59e0b]/30 hover:border-[#f59e0b] shadow-sm hover:shadow-md transition-all">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1e3a8a] to-[#f59e0b] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-primary">Community Spirit</h3>
              <p className="text-slate-600">
                Bringing together families and friends in celebration of cricket
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
