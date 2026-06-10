import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SubHeader from "../components/website/SubHeader";
import { useEffect } from "react";
import { setNavigate } from "../utils/navigation";

export default function WebsiteLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <div className="min-h-svh flex flex-col">
      <ScrollToTop />
      <Header />
      <div className="bg-primary">
        {/* <SubHeader /> */}
      </div>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
