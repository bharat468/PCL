import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  MapPin,
  Calendar,
  Home,
  Building2,
  Eye,
  X,
} from "lucide-react";
import ExcelViewer from "../../components/ExcelViewer";

const holidayResources = [
  {
    id: 1,
    title: "Holiday Homes Directory",
    description: "List of holiday homes available for SBIROWA members",
    fileName: "holiday_homes.pdf",
    fileType: "pdf",
    fileSize: "464 KB",
    icon: Home,
    category: "Directory",
  },
  {
    id: 2,
    title: "Guest House Details",
    description: "Excel sheet with guest house details",
    fileName: "guest_house.xlsx",
    fileType: "excel",
    fileSize: "17.4 KB",
    icon: Building2,
    category: "Booking Info",
  },
  {
    id: 2,
    title: "Officer Only Guest House",
    description: "Excel sheet with officer only guest house details",
    fileName: "officer_only_gh.xlsx",
    fileType: "excel",
    fileSize: "17.4 KB",
    icon: Building2,
    category: "Booking Info",
  },
];

export default function HolidayHomes() {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const handleView = (resource) => {
    if (resource.fileType === "pdf") {
      // Open PDF directly in new tab to avoid iframe blocking
      window.open(`/${resource.fileName}`, "_blank", "noopener,noreferrer");
    } else {
      // Use modal for Excel files
      setCurrentFile(resource);
      setViewerOpen(true);
    }
  };

  const closeViewer = () => {
    setViewerOpen(false);
    setCurrentFile(null);
  };

  return (
    <main className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <MapPin className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Holiday Homes
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover comfortable and affordable accommodation options exclusively
          for SBIROWA members. Access our network of holiday homes and guest
          houses across India.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Badge variant="secondary" className="text-sm px-4 py-2">
            <Home className="h-4 w-4 mr-2" />
            Member Exclusive
          </Badge>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto justify-center">
          {holidayResources.map((resource) => {
            const IconComponent = resource.icon;

            return (
              <Card
                key={resource.id}
                className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
              >
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold text-foreground">
                            {resource.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {resource.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {resource.description}
                        </p>
                      </div>
                    </div>

                    {/* File Info */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          File Type:
                        </span>
                        <span className="uppercase text-muted-foreground font-mono">
                          {resource.fileType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          File Size:
                        </span>
                        <span className="text-muted-foreground">
                          {resource.fileSize}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleView(resource)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Additional Information */}
      <section className="bg-muted/30 rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">
            Important Information
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6">
            <CardContent className="space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-foreground">Advance Booking</h3>
              <p className="text-sm text-muted-foreground">
                Book your stay in advance for better availability and rates
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                Valid Membership
              </h3>
              <p className="text-sm text-muted-foreground">
                Present valid SBIROWA membership card during check-in
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-foreground">
                Multiple Locations
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose from holiday destinations across India
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* File Viewer Modal */}
      {viewerOpen && currentFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {currentFile.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentFile.fileName}
                  </p>
                </div>
              </div>
              <button
                onClick={closeViewer}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Viewer Content */}
            <div className="h-full pb-16">
              {currentFile.fileType === "excel" ? (
                <ExcelViewer file={`/${currentFile.fileName}`} />
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {currentFile.fileType === "excel" ? "Excel file" : "PDF file"}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={closeViewer}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
