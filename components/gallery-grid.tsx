"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Video,
  Heart,
  Instagram,
  ExternalLink,
  Award,
  Play,
  X,
} from "lucide-react";
import { MasonryGrid } from "./masonry-grid";
import { Pagination } from "./pagination";

type GalleryCategory = "all" | "social" | "photo" | "video" | "events";

interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  type: "image" | "video";
  src: string;
  description: string;
  client?: string;
  tags: string[];
  created_at?: string;
  is_featured?: boolean;
  sort_order?: number;
  thumbnail_url?: string;
  original_file_url?: string;
}

const categories = [
  { id: "all" as const, label: "All Work", icon: null },
  { id: "photo" as const, label: "Photography", icon: Camera },
  { id: "video" as const, label: "Videography", icon: Video },
  { id: "social" as const, label: "Social Media", icon: Instagram },
  { id: "events" as const, label: "Events", icon: Heart },
];

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); // 12 items per page

  // Handle keyboard events for modals
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (selectedVideo) setSelectedVideo(null);
        if (selectedPhoto) setSelectedPhoto(null);
      }
    };

    if (selectedVideo || selectedPhoto) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedVideo, selectedPhoto]);

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        console.log("Fetching portfolio items from API...");
        const response = await fetch("/api/portfolio/public");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch portfolio items: ${response.status}`
          );
        }

        const data = await response.json();

        if (data.success && data.items) {
          console.log(
            `Loaded ${data.items.length} portfolio items from database`
          );
          setGalleryItems(data.items);
        } else {
          console.error("Invalid API response:", data);
          setError("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load portfolio"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioItems();
  }, []);

  // Filter items by category
  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Separate photos and videos
  const photoItems = filteredItems.filter((item) => item.type === "image");
  const videoItems = filteredItems.filter((item) => item.type === "video");

  // Pagination logic
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get paginated items (photos first, then videos)
  const allSortedItems = [...photoItems, ...videoItems];
  const paginatedItems = allSortedItems.slice(startIndex, endIndex);
  const paginatedPhotos = paginatedItems.filter(
    (item) => item.type === "image"
  );
  const paginatedVideos = paginatedItems.filter(
    (item) => item.type === "video"
  );

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of gallery
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg text-muted-foreground">
          Loading portfolio...
        </p>
      </div>
    );
  }

  if (error && galleryItems.length === 0) {
    return (
      <div className="text-center py-16">
        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-xl text-muted-foreground mb-2">
          Unable to load portfolio
        </p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 perspective-glow scale-105"
                  : "border-border bg-card/50 text-foreground hover:bg-accent hover:scale-105"
              }`}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {category.label}
            </Button>
          );
        })}
      </div>

      <div className="space-y-12">
        {/* Photo Gallery (Masonry Grid) */}
        {paginatedPhotos.length > 0 && (
          <div className="space-y-6">
            {(paginatedVideos.length > 0 ||
              photoItems.length !== paginatedPhotos.length) && (
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Photography
                </h3>
                <div className="w-16 h-0.5 bg-primary mx-auto"></div>
              </div>
            )}
            <MasonryGrid
              items={paginatedPhotos}
              onItemClick={setSelectedPhoto}
            />
          </div>
        )}

        {/* Video Gallery (Regular Grid) */}
        {paginatedVideos.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Videos
              </h3>
              <div className="w-16 h-0.5 bg-primary mx-auto"></div>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedVideos.map((item, index) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden rounded-3xl glass-border-enhanced bg-card transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />

                    {/* Video play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setSelectedVideo(item);
                        }}
                        className="rounded-full bg-primary/90 p-4 backdrop-blur-sm hover:bg-primary transition-colors z-10 pointer-events-auto"
                      >
                        <Play className="h-8 w-8 text-white fill-white" />
                      </button>
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-4 right-4">
                      <Badge
                        variant="secondary"
                        className="bg-black/70 text-white backdrop-blur-sm border-0 font-medium"
                      >
                        {item.category === "social" && (
                          <Instagram className="mr-1 h-3 w-3" />
                        )}
                        {item.category === "photo" && (
                          <Camera className="mr-1 h-3 w-3" />
                        )}
                        {item.category === "video" && (
                          <Video className="mr-1 h-3 w-3" />
                        )}
                        {item.category === "events" && (
                          <Heart className="mr-1 h-3 w-3" />
                        )}
                        {categories.find((c) => c.id === item.category)?.label}
                      </Badge>
                    </div>

                    {/* Video type indicator */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-600 text-white border-0">
                        <Video className="mr-1 h-3 w-3" />
                        VIDEO
                      </Badge>
                    </div>

                    {/* View project overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-white font-medium">
                          View Project
                        </span>
                        <ExternalLink className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.client && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          Client: {item.client}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs border-border text-muted-foreground hover:bg-accent transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-xl text-muted-foreground">
            No projects found for this category.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Try selecting a different category above.
          </p>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="bg-black rounded-lg overflow-hidden">
              <video
                key={selectedVideo.original_file_url || selectedVideo.src}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh]"
                poster={selectedVideo.thumbnail_url || selectedVideo.src}
              >
                <source
                  src={selectedVideo.original_file_url || selectedVideo.src}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h3>
                <p className="text-gray-300">{selectedVideo.description}</p>
                {selectedVideo.client && (
                  <p className="text-sm text-gray-400 mt-2">
                    Client: {selectedVideo.client}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={selectedPhoto.original_file_url || selectedPhoto.src}
                alt={selectedPhoto.title}
                width={1200}
                height={800}
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "90vw",
                  maxHeight: "80vh",
                }}
                className="object-contain"
                priority
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-xl font-bold text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                {selectedPhoto.description && (
                  <p className="text-gray-300 mb-2">
                    {selectedPhoto.description}
                  </p>
                )}
                {selectedPhoto.client && (
                  <p className="text-sm text-gray-400">
                    Client: {selectedPhoto.client}
                  </p>
                )}
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedPhoto.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white/20 text-white border-0 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
