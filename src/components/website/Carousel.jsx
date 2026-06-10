import * as React from "react";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getImageBySection } from "@/services/imageService";

export function ImageCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImage = "/logo.png";

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        setLoading(true);
        const response = await getImageBySection("banner");

        if (response.status === 200) {
          setImages(response.data || []);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching banner images:", error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerImages();
  }, []);

  // Show default image while loading
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full xl:mt-0 my-4">
        <div className="w-full aspect-square max-w-2xl mx-auto overflow-hidden rounded-full shadow-xl ring-4 ring-[#f59e0b]">
          <img
            src={defaultImage}
            alt="Loading..."
            className="w-full h-full object-cover"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    );
  }

  // If no images or empty array, show default image
  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center w-full xl:mt-0 my-4">
        <div className="w-full aspect-square max-w-2xl mx-auto overflow-hidden rounded-full shadow-xl ring-4 ring-[#f59e0b]">
          <img
            src={defaultImage}
            alt="Default Banner"
            className="w-full h-full object-cover"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    );
  }

  // If only one image, display it directly (no carousel)
  if (images.length === 1) {
    return (
      <div className="flex items-center justify-center w-full xl:mt-0 my-4">
        <div className="w-full aspect-square max-w-2xl mx-auto overflow-hidden rounded-full shadow-xl ring-4 ring-[#f59e0b]">
          <img
            src={images[0].url}
            alt="Banner"
            className="w-full h-full object-cover"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>
      </div>
    );
  }

  // If multiple images, show carousel with autoplay
  return (
    <div className="flex items-center justify-center w-full xl:mt-0 my-4">
      <div className="w-full aspect-square max-w-2xl mx-auto overflow-hidden rounded-full shadow-xl ring-4 ring-[#f59e0b]">
        <Carousel
          plugins={[plugin.current]}
          className="w-full h-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="h-full -ml-0">
            {images.map((image, index) => (
              <CarouselItem key={image._id} className="h-full pl-0">
                <div className="w-full h-full relative">
                  <img
                    src={image.url}
                    alt={`Banner ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
