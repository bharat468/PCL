import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Trophy, Users } from "lucide-react";

const BANK = {
  accountName: "Prempuri Cricket League",
  accountNumber: "10206716006",
  bankName: "IDFC First Bank",
  ifsc: "IDFB0021311",
};

export default function JoinCTA() {
  const [copiedKey, setCopiedKey] = useState(null);

  const copy = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(label);
      const t = setTimeout(() => setCopiedKey(null), 1500);
      return () => clearTimeout(t);
    } catch {
      // swallow
    }
  };

  const Field = ({ label, value, mono = false }) => (
    <div className="flex items-center justify-between gap-3 py-2 border-b border-slate-200 last:border-none">
      <div className="min-w-0">
        <div className="text-slate-500 text-sm">{label}</div>
        <div
          className={`truncate text-slate-800 ${
            mono ? "font-mono" : "font-semibold"
          }`}
          title={value}
        >
          {value}
        </div>
      </div>
      <Button
        variant="secondary"
        size="icon"
        className="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 border-0"
        aria-label={`Copy ${label}`}
        onClick={() => copy(label, value)}
      >
        {copiedKey === label ? (
          <Check className="h-4 w-4" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        <span className="sr-only">Copy {label}</span>
      </Button>
    </div>
  );

  return (
    <section className="md:my-12">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-xl border-2 border-[#f59e0b]">
        <div className="relative grid grid-cols-1 gap-8 p-6 md:p-10 lg:grid-cols-2">
          {/* Left: Hindi Content */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#f59e0b] rounded-full flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                आज ही शामिल हों!
              </h2>
            </div>
            
            <div className="bg-white p-4 rounded-xl mb-4 border border-[#f59e0b]/30 shadow-sm">
              <p className="text-slate-800 text-base md:text-lg leading-relaxed">
                प्रेमपुरी क्रिकेट लीग का हिस्सा बनने के लिए पंजीकरण करें और अपने क्रिकेट करियर को नए मुकाम तक ले जाएं!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/30 shadow-sm">
                <p className="text-[#f59e0b] font-bold text-sm">✓ टूर्नामेंट</p>
                <p className="text-slate-500 text-xs">पेशेवर मैच</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/30 shadow-sm">
                <p className="text-[#f59e0b] font-bold text-sm">✓ प्रशिक्षण</p>
                <p className="text-slate-500 text-xs">विशेषज्ञ कोचिंग</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/30 shadow-sm">
                <p className="text-[#f59e0b] font-bold text-sm">✓ पहचान</p>
                <p className="text-slate-500 text-xs">प्रतिभा मंच</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-[#f59e0b]/30 shadow-sm">
                <p className="text-[#f59e0b] font-bold text-sm">✓ समुदाय</p>
                <p className="text-slate-500 text-xs">क्रिकेट परिवार</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-gradient-to-r from-[#f59e0b] to-[#dc2626] hover:from-[#dc2626] hover:to-[#f59e0b] text-white font-bold shadow-lg" asChild>
                <a
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSehf-1W5kPUcMl7gFQB7bb8J7N6Osa1d_X6veQlWJYozTYoxQ/viewform"
                >
                  <Users className="w-4 h-4 mr-2" />
                  अभी पंजीकरण करें
                </a>
              </Button>
            </div>

            <p className="mt-4 text-xs text-slate-600 bg-white p-3 rounded-lg border border-[#f59e0b]/30 shadow-sm">
              💡 <span className="font-semibold text-slate-800">भुगतान टिप:</span> अपना{" "}
              <span className="text-[#f59e0b] font-semibold">पूरा नाम</span> और{" "}
              <span className="text-[#f59e0b] font-semibold">मोबाइल नंबर</span> भुगतान नोट में जोड़ें
            </p>
          </div>

          {/* Right: Payment Details */}
          <Card className="bg-white border-2 border-[#f59e0b]/30 text-slate-800 shadow-xl">
            <CardHeader>
              <CardTitle className="text-primary text-xl flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#f59e0b]" />
                Payment Options / भुगतान विकल्प
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Account Details */}
                <div className="space-y-2">
                  <Field label="Account Name" value={BANK.accountName} />
                  <Field label="Account Number" value={BANK.accountNumber} mono />
                  <Field label="Bank" value={BANK.bankName} />
                  <Field label="IFSC" value={BANK.ifsc} mono />
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center gap-3">
                  <img
                    src="/qr.jpeg"
                    alt="QR code for PCL payment"
                    className="aspect-square w-40 sm:w-48 rounded-xl bg-white p-2 shadow-lg ring-2 ring-[#f59e0b]"
                    loading="lazy"
                  />
                  <div className="text-center bg-slate-50 p-3 rounded-lg border border-[#f59e0b]/30 shadow-sm">
                    <p className="text-slate-800 font-bold">Scan to Pay</p>
                    <p className="text-[#f59e0b] text-sm font-mono">sbirow1221@idfcbank</p>
                  </div>
                </div>
              </div>
              <span className="sr-only" aria-live="polite">
                {copiedKey ? `${copiedKey} copied to clipboard` : ""}
              </span>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
