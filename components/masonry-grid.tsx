"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera,
  Video,
  Instagram,
  Heart,
  ExternalLink,
  Award,
} from "lucide-react";
import { useMasonry } from "@/hooks/use-masonry";

interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "social" | "photo" | "video" | "events";
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

interface MasonryGridProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
}

const categories = [
  { id: "all" as const, label: "All Work", icon: null },
  { id: "photo" as const, label: "Photography", icon: Camera },
  { id: "video" as const, label: "Videography", icon: Video },
  { id: "social" as const, label: "Social Media", icon: Instagram },
  { id: "events" as const, label: "Events", icon: Heart },
];

export function MasonryGrid({ items, onItemClick }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [columnWidth, setColumnWidth] = useState(300);

  const { isLoaded, relayout } = useMasonry(containerRef, items, {
    columnWidth,
    gap: 24,
    breakpoints: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
    },
  });

  // Calculate responsive column width
  useEffect(() => {
    const updateColumnWidth = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const gap = 24;

      let columns = 1;
      if (containerWidth >= 1024) columns = 3;
      else if (containerWidth >= 768) columns = 2;

      const availableWidth = containerWidth - gap * (columns - 1);
      const newColumnWidth = Math.floor(availableWidth / columns);

      setColumnWidth(newColumnWidth);
    };

    updateColumnWidth();
    window.addEventListener("resize", updateColumnWidth);

    return () => window.removeEventListener("resize", updateColumnWidth);
  }, []);

  // Handle image load events
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
    setTimeout(() => relayout(), 50); // Small delay to ensure DOM updates
  };

  // Relayout when all images are loaded
  useEffect(() => {
    if (imagesLoaded === items.length && items.length > 0) {
      relayout();
    }
  }, [imagesLoaded, items.length, relayout]);

  // Reset image counter when items change
  useEffect(() => {
    setImagesLoaded(0);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <p className="text-xl text-muted-foreground">
          No photos found for this category.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative transition-opacity duration-300 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ minHeight: "400px" }}
    >
      {items.map((item, index) => (
        <Card
          key={item.id}
          className="group overflow-hidden rounded-3xl glass-border-enhanced bg-card transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl cursor-pointer animate-fade-in-up"
          style={{ animationDelay: `${index * 0.1}s` }}
          onClick={() => onItemClick(item)}
        >
          <div className="relative overflow-hidden">
            <Image
              src={item.src || "/placeholder.svg"}
              alt={item.title}
              width={columnWidth}
              height={200}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              onLoad={handleImageLoad}
              sizes={`${columnWidth}px`}
              style={{
                aspectRatio: "auto",
                maxWidth: "100%",
                height: "auto",
              }}
            />

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

            {/* View project overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-white font-medium">View Project</span>
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
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
  );
}
