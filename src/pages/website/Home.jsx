import { useEffect, useState } from "react";

import Hero from "../../components/website/home/Hero";
// import WelcomePopup from "../../components/website/WelcomePopup";
import TeamGrid from "../../components/website/home/TeamGrid";
import InfoCards from "../../components/website/home/InfoCards";

export default function Home() {
  // const [showWelcome, setShowWelcome] = useState(false);

  // useEffect(() => {
  //   const hasVisited = localStorage.getItem("pcl_visited");
  //   if (!hasVisited) {
  //     setShowWelcome(true);
  //     localStorage.setItem("pcl_visited", "true");
  //   }
  // }, []);

  // const closeWelcome = () => {
  //   setShowWelcome(false);
  // };

  return (
    <div className="space-y-12">
      {/* <WelcomePopup isOpen={showWelcome} onClose={closeWelcome} /> */}
      <Hero />
      <TeamGrid />
      <InfoCards />
    </div>
  );
}
