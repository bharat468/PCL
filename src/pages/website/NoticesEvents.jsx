import { FileText, Gavel, Users } from "lucide-react";

const circulars = [
  {
    title: "Pension Scheme Update",
    date: "Aug 2025",
    file: "/public/circulars/pension-update.pdf",
  },
  {
    title: "Medical Scheme Circular",
    date: "July 2025",
    file: "/public/circulars/medical-scheme.pdf",
  },
];

const legalUpdates = [
  {
    title: "Special Pay Court Order",
    date: "Aug 2025",
    summary: "Latest court order on special pay eligibility.",
  },
  {
    title: "Pension Revision Notice",
    date: "July 2025",
    summary: "Govt. notification on pension revision for retirees.",
  },
];

const meetingMinutes = [
  {
    title: "AGM 2025 Minutes",
    date: "June 2025",
    file: "/public/minutes/agm-2025.pdf",
  },
  {
    title: "Executive Committee Meeting",
    date: "May 2025",
    file: "/public/minutes/executive-may.pdf",
  },
];

export default function NoticesEvents() {
  return (
    <main className="space-y-10">
      <h1 className="text-4xl font-semibold mb-10 text-blue-900">
        {" "}
        Notices & Events
      </h1>

      {/* Bank/Association Circulars */}
      <section className="bg-white rounded-2xl shadow p-8 border-l-4 border-blue-900">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-blue-900 w-6 h-6" />
          <h2 className="text-2xl font-bold text-blue-900">
            Bank/Association Circulars
          </h2>
        </div>
        <ul className="space-y-4">
          {circulars.map((c) => (
            <li
              key={c.title}
              className="flex flex-col gap-1 bg-orange-50 rounded p-4 shadow border border-orange-100"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{c.title}</span>
                <span className="text-xs text-gray-500">{c.date}</span>
              </div>
              <a
                href={c.file}
                download
                className="text-blue-900 hover:underline text-sm font-medium"
              >
                Download PDF
              </a>
            </li>
          ))}
        </ul>
      </section>
      {/* Legal Updates */}
      <section className="bg-white rounded-2xl shadow p-8 border-l-4 border-blue-900">
        <div className="flex items-center gap-2 mb-4">
          <Gavel className="text-blue-900 w-6 h-6" />
          <h2 className="text-2xl font-bold text-blue-900">Legal Updates</h2>
        </div>
        <ul className="space-y-4">
          {legalUpdates.map((l) => (
            <li
              key={l.title}
              className="flex flex-col gap-1 bg-orange-50 rounded p-4 shadow border border-orange-100"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{l.title}</span>
                <span className="text-xs text-gray-500">{l.date}</span>
              </div>
              <p className="text-gray-700 text-sm mt-1">{l.summary}</p>
            </li>
          ))}
        </ul>
      </section>
      {/* Meeting Minutes and Resolutions */}
      <section className="bg-white rounded-2xl shadow p-8 border-l-4 border-blue-900">
        <div className="flex items-center gap-2 mb-2">
          <Users className="text-blue-900 w-6 h-6" />
          <h2 className="text-2xl font-bold text-blue-900">
            Meeting Minutes & Resolutions
          </h2>
        </div>
        <ul className="space-y-4 ">
          {meetingMinutes.map((m) => (
            <li
              key={m.title}
              className="flex flex-col gap-1 bg-orange-50 rounded p-4 shadow border border-orange-100"
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-900">{m.title}</span>
                <span className="text-xs text-gray-500">{m.date}</span>
              </div>
              <a
                href={m.file}
                download
                className="text-blue-900 hover:underline text-sm font-medium"
              >
                Download PDF
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
