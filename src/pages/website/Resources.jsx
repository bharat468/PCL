import { BookOpen, FileText, Link2 } from "lucide-react";

const resources = [
  {
    title: "SBIROWA Handbook",
    description: "Comprehensive guide for members and office bearers.",
    link: "/public/resources/handbook.pdf",
    type: "pdf",
  },
  {
    title: "Useful Links",
    description:
      "Curated list of important government and association websites.",
    link: "https://www.rbi.org.in/",
    type: "link",
  },
  {
    title: "Forms & Templates",
    description: "Downloadable forms for membership, claims, and more.",
    link: "/public/resources/forms.zip",
    type: "file",
  },
];

export default function Resources() {
  return (
    <main className="">
      <h1 className="text-4xl font-semibold mb-10 text-blue-900"> Resources</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {resources.map((r) => (
          <section
            key={r.title}
            className="bg-white rounded-2xl shadow p-8 border-l-4 border-blue-900 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-2">
              {r.type === "pdf" && (
                <FileText className="text-blue-900 w-6 h-6" />
              )}
              {r.type === "file" && (
                <BookOpen className="text-blue-900 w-6 h-6" />
              )}
              {r.type === "link" && <Link2 className="text-blue-900 w-6 h-6" />}
              <h2 className="text-2xl font-bold text-blue-950">{r.title}</h2>
            </div>
            <p className="text-blue-900 text-lg">{r.description}</p>
            <a
              href={r.link}
              target={r.type === "link" ? "_blank" : undefined}
              rel={r.type === "link" ? "noopener noreferrer" : undefined}
              className="inline-block mt-2 bg-blue-950 hover:bg-blue-900 text-white font-semibold px-6 py-3 rounded-full shadow-md transition text-base w-fit"
              download={r.type !== "link"}
            >
              {r.type === "link" ? "Visit Link" : "Download"}
            </a>
          </section>
        ))}
      </div>
    </main>
  );
}
