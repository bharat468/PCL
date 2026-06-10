import { UserPlus, Gift, FileText } from "lucide-react";
import Members from "../../components/website/about/Members";

const benefits = [
  "Access to exclusive resources and events",
  "Networking with professionals nationwide",
  "Professional development and training opportunities",
  "Voting rights in association matters",
  "Discounts on seminars and workshops",
];

const members = [
  { name: "Dr. A. Sharma", since: "2018" },
  { name: "Ms. B. Singh", since: "2019" },
  { name: "Mr. C. Kumar", since: "2020" },
  { name: "Mrs. D. Patel", since: "2021" },
];

export default function Membership() {
  return (
    <main className="">
      <h1 className="text-4xl font-semibold mb-10 text-blue-900">Membership</h1>
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        {/* Eligibility */}
        <section className="bg-white rounded-2xl shadow p-8 flex flex-col gap-3 border-l-4 border-blue-900">
          <div className="flex items-center gap-2 mb-2">
            <UserPlus className="text-blue-900 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">Eligibility</h2>
          </div>
          <p className="text-gray-700 text-lg">
            Membership is open to all laboratory professionals, researchers, and
            students who share our mission and values. Applicants must be at
            least 18 years old and actively involved in the field.
          </p>
        </section>
        {/* Benefits */}
        <section className="bg-white rounded-2xl shadow p-8 flex flex-col gap-3 border-l-4 border-blue-900">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="text-blue-900 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-800">Benefits</h2>
          </div>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
            {benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      </div>
      {/* How to Join */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl shadow-lg p-10 mb-10 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/2 pointer-events-none hidden md:block">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="150" r="120" fill="#fff" fillOpacity="0.12" />
            <circle cx="320" cy="150" r="80" fill="#fff" fillOpacity="0.10" />
            <circle cx="340" cy="150" r="40" fill="#fff" fillOpacity="0.08" />
          </svg>
        </div>
        <div className="relative z-10 max-w-xl">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="text-white w-6 h-6" />
            <h2 className="text-2xl font-bold text-white">How to Join</h2>
          </div>
          <p className="text-white/90 text-lg mb-6">
            To become a member, please download and fill out the membership
            form. You can submit the completed form via email or use our online
            application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/public/membership-form.pdf"
              download
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transition text-base"
            >
              Download Membership Form (PDF)
            </a>
            <a
              href="/membership/apply"
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-full shadow-md transition text-base"
            >
              Apply Online
            </a>
          </div>
        </div>
      </section>
      {/* List of Active Members */}
      <section className="mb-8">
        <Members title="List of Active Members" />
      </section>
    </main>
  );
}
