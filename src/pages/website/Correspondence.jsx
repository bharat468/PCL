import { FileText, Eye, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const documents = [
  {
    title: "Letter to Chairman-Spl Pay",
    fileName: "correspondence/letter_to_chairman_spl_pay.pdf",
    description: "Official letter to Chairman regarding special pay matters",
  },
  {
    title: "Letter to Chairman",
    fileName: "correspondence/letter_to_chairman_2.pdf",
    description: "Official letter to Chairman",
  },
  {
    title: "S.B.I ROWA AGM-Notice",
    fileName: "correspondence/agm_notice.pdf",
    description: "Official letter to Chairman",
  },
  {
    title: "Congratulations Letter to FSBIPA New Team",
    fileName: "correspondence/congratulation_to_fsbipa_new_team.pdf",
    description: "Official letter to FSBIPA New Team",
  },
  {
    title: "Unknown Document",
    fileName: "correspondence/unknown.pdf",
    description: "Description not available",
  },
  {
    title: "Unknown Document",
    fileName: "correspondence/unknown_2.pdf",
    description: "Description not available",
  },
  {
    title: "Unknown Document",
    fileName: "correspondence/unknown_3.pdf",
    description: "Description not available",
  },
  {
    title: "SBI Employees Pension Funds Rules 1965",
    fileName: "correspondence/pension_fund_rules_1965.pdf",
    description: "Description not available",
  },
  {
    title: "Board Resolution Dated  24.12.2024",
    fileName: "correspondence/board_resolution_2024.pdf",
    description: "Board Resolution Dated  24.12.2024",
  },
  {
    title: "Certificate of registration- SBIROWA",
    fileName: "correspondence/certificate_of_registration_sbirowa.pdf",
    description: "Certificate of registration- SBIROWA",
  },
];
export default function Correspondence() {
  const handleViewDocument = (document) => {
    // Open PDF in new tab instead of modal to avoid iframe issues
    window.open(`/${document.fileName}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <FileText className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Correspondence
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Access official documents, meeting minutes, financial reports, and
          other important organizational correspondence. All documents are
          available for viewing by registered members.
        </p>
      </section>

      {/* Documents Grid */}
      <section className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document) => (
            <Card
              key={document.fileName}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 space-y-4">
                {/* Document Header */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground leading-tight">
                      {document.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {document.description}
                    </p>
                  </div>
                </div>

                {/* Document Info */}

                {/* Action Button */}
                <Button
                  onClick={() => handleViewDocument(document)}
                  className="w-full mt-4"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
