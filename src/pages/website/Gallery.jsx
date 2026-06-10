import React, { useState, useEffect } from "react";
import { getImageBySection } from "@/services/imageService";
import Loader from "@/components/Loader";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Images,
  Camera,
  Trophy,
  ZoomIn,
  X,
} from "lucide-react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageCategories, setImageCategories] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        setLoading(true);
        const response = await getImageBySection("gallery");

        if (response.status === 200) {
          setImages(response.data || []);
          const categories = [
            ...new Set(
              (response.data || []).map((img) => img.category).filter(Boolean)
            ),
          ];
          setImageCategories(categories);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryImages();
  }, []);

  const openLightbox = (image) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  if (loading) {
    return (
      <main className="space-y-8">
        <section className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/50">
              <Images className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              PCL Gallery
            </h1>
          </div>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Cricket moments captured - Matches, tournaments and celebrations
          </p>
        </section>

        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader />
            <p className="text-slate-500">Loading cricket memories...</p>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="space-y-8">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#f59e0b] to-[#dc2626] rounded-full flex items-center justify-center shadow-lg shadow-[#f59e0b]/50">
            <Images className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            PCL Gallery
          </h1>
        </div>
        
        {/* Hindi */}
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          प्रेमपुरी क्रिकेट लीग की यादगार तस्वीरें
        </p>
        
        {/* English */}
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Memorable moments from Prempuri Cricket League
        </p>
      </section>

      {images.length === 0 ? (
        <Card className="max-w-md mx-auto bg-white border-2 border-[#f59e0b]/30 shadow-md">
          <CardContent className="text-center py-12">
            <Camera className="h-16 w-16 text-[#f59e0b] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No Images Available
            </h3>
            <p className="text-slate-600">
              Cricket photos will be uploaded soon. Stay tuned!
            </p>
          </CardContent>
        </Card>
      ) : (
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, i) => (
              <Card
                key={image._id || i}
                className="group cursor-pointer overflow-hidden bg-white border-2 border-[#f59e0b]/20 hover:border-[#f59e0b] shadow-md hover:shadow-xl hover:shadow-[#f59e0b]/10 transition-all duration-300 transform hover:-translate-y-2 py-0"
                onClick={() => openLightbox(image)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title || `PCL Gallery Image ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      {image.category && (
                        <Badge className="text-xs bg-[#f59e0b] text-white border-none">
                          {image.category}
                        </Badge>
                      )}
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4">
                      <div className="p-2 bg-[#f59e0b] rounded-full shadow-lg">
                        <ZoomIn className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-[#f59e0b] hover:bg-[#dc2626] border-0"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X className="h-4 w-4 text-white" />
            </Button>

            {/* Image */}
            <img
              src={selectedImage.url}
              alt={selectedImage.title || "PCL Gallery Image"}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl ring-2 ring-[#f59e0b]"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Image Details */}
            {selectedImage.category && (
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 border border-[#f59e0b]/30">
                <div className="text-slate-800 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#f59e0b]" />
                  <Badge className="text-xs bg-[#f59e0b] text-white border-none">
                    {selectedImage.category}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
