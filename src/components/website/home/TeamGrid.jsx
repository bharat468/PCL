import { useState } from "react";
import { Badge } from "../../ui/badge";
import { Trophy, Star } from "lucide-react";

export default function TeamGrid() {
  const teamMembers = [
    {
      name: "Rakesh Pareek",
      position: "League Director",
      positionHindi: "लीग निदेशक",
      imageUrl: "/rakesh.jpeg",
    },
    {
      name: "sanwarmal Pareek",
      position: "Head Coach",
      positionHindi: "मुख्य कोच",
      imageUrl: "/sanwarmal.jpeg",
    },
    {
      name: "Basant Agarwal",
      position: "Tournament Manager",
      positionHindi: "टूर्नामेंट प्रबंधक",
      imageUrl: "/basant.jpeg",
    },
    {
      name: "Prem Joshi",
      position: "Operations Head",
      positionHindi: "संचालन प्रमुख",
      imageUrl: "/prem.jpeg",
    },
    {
      name: "Santosh Joshi",
      position: "Technical Director",
      positionHindi: "तकनीकी निदेशक",
      imageUrl: "/santosh.jpeg",
    },
    {
      name: "Anand Pareek",
      position: "Finance Manager",
      positionHindi: "वित्त प्रबंधक",
      imageUrl: "/anand.jpeg",
    },
    {
      name: "Harsh Pareek",
      position: "Media Coordinator",
      positionHindi: "मीडिया समन्वयक",
      imageUrl: "/harsh.jpeg",
    },
    {
      name: "Rahul Pareek",
      position: "Ground Manager",
      positionHindi: "मैदान प्रबंधक",
      imageUrl: "/rahul.jpeg",
    },
    {
      name: "Vinod Rav",
      position: "Men's Cricket Head",
      positionHindi: "पुरुष क्रिकेट प्रमुख",
      imageUrl: "/vinu.jpeg",
    },
    {
      name: "JP jat",
      position: "Youth Development",
      positionHindi: "युवा विकास",
      imageUrl: "/jp.jpeg",
    },
    {
      name: "Parkash Bhatia",
      position: "Umpire Coordinator",
      positionHindi: "अंपायर समन्वयक",
      imageUrl: "/parkash.jpeg",
    },
  ];

  return (
    <section>
      {/* Section Heading */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/50">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            Our Team / हमारी टीम
          </h2>
        </div>
        
        {/* Hindi */}
        <p className="text-slate-600 mt-2 max-w-xl mx-auto">
          PCL की जान - समर्पित पेशेवर जो क्रिकेट को आगे बढ़ाने में दिन-रात काम करते हैं
        </p>
        
        {/* English */}
        <p className="text-gray-500 mt-1 max-w-xl mx-auto text-sm">
          Dedicated professionals working day and night to promote cricket
        </p>
      </div>

      {/* Team Grid */}
      <div className="space-y-10">
        {/* First Row - 5 Members */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {teamMembers.slice(0, 5).map((member, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center sm:p-6 transition hover:transform hover:scale-105 duration-300"
            >
              {/* Image */}
              <div className="relative">
                <LazyImage
                  src={member?.imageUrl}
                  alt={`${member.name} - ${member.position}`}
                  className="sm:w-42 w-24 h-24 sm:h-42 rounded-full overflow-hidden border-4 border-[#f59e0b]/30 group-hover:border-[#f59e0b] transition-colors mb-4 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-slate-800 mb-2 flex-1">
                {member.name}
              </h3>
              <Badge className="bg-white border-2 border-[#f59e0b] text-primary hover:bg-[#f59e0b] hover:text-white transition-colors shadow-sm">
                {member.position}
              </Badge>
            </div>
          ))}
        </div>

        {/* Second Row - 6 Members */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
          {teamMembers.slice(5, 11).map((member, index) => (
            <div
              key={index + 5}
              className="group flex flex-col items-center text-center sm:p-6 transition hover:transform hover:scale-105 duration-300"
            >
              {/* Image */}
              <div className="relative">
                <LazyImage
                  src={member?.imageUrl}
                  alt={`${member.name} - ${member.position}`}
                  className="sm:w-42 w-24 h-24 sm:h-42 rounded-full overflow-hidden border-4 border-[#f59e0b]/30 group-hover:border-[#f59e0b] transition-colors mb-4 shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Star className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Info */}
              <h3 className="text-lg font-semibold text-slate-800 mb-2 flex-1">
                {member.name}
              </h3>
              <Badge className="bg-white border-2 border-[#f59e0b] text-primary hover:bg-[#f59e0b] hover:text-white transition-colors shadow-sm">
                {member.position}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Lazy Image Component ---------- */
function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${className} relative`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover object-center transition duration-700 ease-in-out 
          ${
            loaded
              ? "blur-0 scale-100 opacity-100"
              : "blur-md scale-105 opacity-70"
          }`}
      />
    </div>
  );
}
