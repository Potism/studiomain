"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UploadModal from "@/components/admin/UploadModal";
import {
  Home,
  Settings,
  LogOut,
  Save,
  Sparkles,
  DollarSign,
  User,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  FileText,
  BarChart3,
  HelpCircle,
  Eye,
  AlertCircle,
  CheckCircle,
  Video,
  Menu,
  X,
  Plus,
  Trash2,
  Package,
  Move,
  Camera,
  ImageIcon,
  Upload,
  Download,
  Edit,
  MoreHorizontal,
  Tag,
} from "lucide-react";

interface ContentData {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
  features: {
    title: string;
    subtitle: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  about: {
    title: string;
    description: string;
    mission: string;
    vision: string;
    teamSize: string;
    founded: string;
    locations: string;
  };
  pricing: {
    startup: {
      price_usd: string;
      price_inr: string;
      features: string[];
      videos: string[];
    };
    pro: {
      price_usd: string;
      price_inr: string;
      features: string[];
      videos: string[];
    };
    premium: {
      price_usd: string;
      price_inr: string;
      features: string[];
      videos: string[];
    };
  };
  orderForm: {
    whatsappNumber: string;
    modelingOptions: {
      simple: { price_usd: number; price_inr: number; description: string };
      medium: { price_usd: number; price_inr: number; description: string };
      complex: { price_usd: number; price_inr: number; description: string };
    };
    renderOptions: {
      basic: { price_usd: number; price_inr: number; quantity: number };
      standard: { price_usd: number; price_inr: number; quantity: number };
      premium: { price_usd: number; price_inr: number; quantity: number };
    };
    formSteps: {
      enabled: boolean;
      title: string;
      description: string;
    }[];
  };
  settings: {
    adminEmail: string;
    adminPassword: string;
  };
}

interface ActivityItem {
  id: string;
  name: string;
  status: string;
  change: string;
  icon: string;
  time: string;
  timestamp: number;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_type: "image" | "video";
  file_size: number;
  thumbnail_url?: string;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

const defaultContent: ContentData = {
  hero: {
    title: "HIGH-IMPACT 3D ANIMATION FOR BRANDS",
    subtitle: "skitbit",
    buttonText: "Chat With Us",
  },
  features: {
    title: "What makes us the best studio for you.",
    subtitle: "Discover our unique approach to 3D animation",
  },
  footer: {
    tagline:
      "Experience 3D animation like never before. We craft cinematic visuals for brands and products.",
    copyright: "© 2025 — Skitbit International Uk",
  },
  about: {
    title: "About Skitbit International",
    description:
      "Pioneering the future of 3D product animation for global brands.",
    mission:
      "To create stunning 3D animations that help brands tell their story and connect with their audience.",
    vision:
      "To be the world's leading 3D animation studio, known for creativity, quality, and innovation.",
    teamSize: "50+ Creative Professionals",
    founded: "2020",
    locations:
      "London, Noida, Bangalore, Mumbai, Toronto, New York, Dubai, Melbourne",
  },
  pricing: {
    startup: {
      price_usd: "$299",
      price_inr: "₹25,000/-",
      features: [
        "Up to 15s 3D Animation",
        "2 Revisions",
        "Creative Backgrounds",
        "Simple 3D Animation",
        "7–10 Day Turnaround time",
        "Simple 3D Models Included", // Updated to show it's included
      ],
      videos: [
        "ysz5S6PUM-U",
        "aqz-KE-bpKQ",
        "ScMzIvxBSi4",
        "dQw4w9WgXcQ",
        "VYOjWnS4cMY",
        "9bZkp7q19f0",
        "3JZ_D3ELwOQ",
        "e-ORhEE9VVg",
        "fJ9rUzIMcZQ",
      ],
    },
    pro: {
      price_usd: "$699",
      price_inr: "₹55,000/-",
      features: [
        "Up to 25s 3D Animation",
        "4 Revisions",
        "Creative Backgrounds, Lite graphics",
        "Detailed 3D Animation",
        "20–25 Day Turnaround",
        "Pre-built 3D Models",
      ],
      videos: [
        "ASV2myPRfKA",
        "eTfS2lqwf6A",
        "KALbYHmGV4I",
        "Go0AA9hZ4as",
        "sB7RZ9QCOAg",
        "TK2WboJOJaw",
        "5Xq7UdXXOxI",
        "kMjWCidQSK0",
        "RKKdQvwKOhQ",
      ],
    },
    premium: {
      price_usd: "$2,049",
      price_inr: "₹1,70,500/-",
      features: [
        "40–60s 3D Animation",
        "Creative Backgrounds, Lite graphics",
        "Liquid, Smoke, Fire, Cloth Simulations",
        "Lighting, Camera Animation, Depth effects",
        "Priority – 20 Day Turnaround",
        "Highly Complex 3D Models Included", // Updated to show it's included
      ],
      videos: [
        "v2AC41dglnM",
        "pRpeEdMmmQ0",
        "3AtDnEC4zak",
        "JRfuAukYTKg",
        "LsoLEjrDogU",
        "RB-RcX5DS5A",
        "hTWKbfoikeg",
        "YQHsXMglC9A",
        "09R8_2nJtjg",
      ],
    },
  },
  orderForm: {
    whatsappNumber: "+918384092211",
    modelingOptions: {
      simple: {
        price_usd: 35,
        price_inr: 3000,
        description: "Basic shapes, minimal details",
      },
      medium: {
        price_usd: 60,
        price_inr: 5000,
        description: "Moderate details, textures",
      },
      complex: {
        price_usd: 120,
        price_inr: 10000,
        description: "High detail, advanced geometry",
      },
    },
    renderOptions: {
      basic: { price_usd: 25, price_inr: 2000, quantity: 3 },
      standard: { price_usd: 35, price_inr: 3000, quantity: 5 },
      premium: { price_usd: 60, price_inr: 5000, quantity: 10 },
    },
    formSteps: [
      {
        enabled: true,
        title: "Package Selection",
        description: "Choose your animation package",
      },
      {
        enabled: true,
        title: "3D Model Question",
        description: "Do you have a 3D model? (Pro plan only)",
      },
      {
        enabled: true,
        title: "Modeling Add-on",
        description: "Select modeling complexity (Pro plan only)",
      },
      {
        enabled: true,
        title: "Render Upsell",
        description: "Add 3D renders to your order",
      },
      {
        enabled: true,
        title: "Order Summary",
        description: "Review and confirm your order",
      },
    ],
  },
  settings: {
    adminEmail: "admin@theskitbit.com",
    adminPassword: "1234",
  },
};

// Initial activity data
const initialActivity: ActivityItem[] = [
  {
    id: "1",
    name: "Homepage Content",
    status: "Updated",
    change: "+2.1%",
    icon: "🏠",
    time: "2 hours ago",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
  },
  {
    id: "2",
    name: "Pricing Plans",
    status: "Modified",
    change: "+1.8%",
    icon: "💰",
    time: "4 hours ago",
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
  },
  {
    id: "3",
    name: "About Page",
    status: "Published",
    change: "+3.2%",
    icon: "ℹ️",
    time: "6 hours ago",
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
  },
  {
    id: "4",
    name: "Footer Content",
    status: "Updated",
    change: "+0.9%",
    icon: "📄",
    time: "8 hours ago",
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
  },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("home");
  const [content, setContent] = useState<ContentData>(defaultContent);
  const [originalContent, setOriginalContent] =
    useState<ContentData>(defaultContent);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(3);
  const [saveMessage, setSaveMessage] = useState("");
  const [activityItems, setActivityItems] =
    useState<ActivityItem[]>(initialActivity);
  const [activityPage, setActivityPage] = useState(0);

  // Portfolio management state
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isPortfolioLoading, setIsPortfolioLoading] = useState(false);
  const [portfolioError, setPortfolioError] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "",
    is_featured: false,
    sort_order: 0,
  });

  // Portfolio management functions (moved to top to fix hook order)
  const fetchPortfolioItems = useCallback(async (): Promise<void> => {
    try {
      setIsPortfolioLoading(true);
      setPortfolioError(null);

      const response = await fetch("/api/portfolio/list", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch portfolio items: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.items) {
        setPortfolioItems(data.items);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
      setPortfolioError(
        error instanceof Error ? error.message : "Failed to load portfolio"
      );
    } finally {
      setIsPortfolioLoading(false);
    }
  }, []);

  const handlePortfolioDelete = async (id: string) => {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    try {
      const response = await fetch("/api/portfolio/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      await fetchPortfolioItems();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting item:", error);
      setPortfolioError("Failed to delete item");
    }
  };

  const handlePortfolioEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setEditForm({
      title: item.title,
      description: item.description,
      category: item.category,
      is_featured: item.is_featured,
      sort_order: item.sort_order,
    });
    setIsEditDialogOpen(true);
  };

  const handleSavePortfolioEdit = async () => {
    if (!editingItem) return;

    try {
      const response = await fetch("/api/portfolio/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: editingItem.id,
          ...editForm,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      await fetchPortfolioItems();
      setIsEditDialogOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating item:", error);
      setPortfolioError("Failed to update item");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const portfolioCategories = [
    "Studio Photography",
    "Product Photography",
    "Commercial Video",
    "Event Photography",
    "Portrait Photography",
    "Brand Photography",
    "Creative Content",
  ];

  // Load portfolio items when portfolio page is selected
  useEffect(() => {
    if (selectedPage === "portfolio") {
      fetchPortfolioItems();
    }
  }, [selectedPage, fetchPortfolioItems]);

  const [analyticsData, setAnalyticsData] = useState([
    { metric: "Page Views", value: "12,543", change: "+15.2%", trend: "up" },
    { metric: "Unique Visitors", value: "8,921", change: "+8.7%", trend: "up" },
    { metric: "Bounce Rate", value: "23.4%", change: "-5.1%", trend: "down" },
    { metric: "Avg. Session", value: "3m 42s", change: "+12.3%", trend: "up" },
  ]);
  const [videoToAdd, setVideoToAdd] = useState("");
  const [featureToAdd, setFeatureToAdd] = useState("");
  const [currentPricingTier, setCurrentPricingTier] = useState<
    "startup" | "pro" | "premium"
  >("startup");
  const [adminUser, setAdminUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Function to load content from local storage or API
  const loadContent = async () => {
    try {
      // Attempt to load from API first
      const response = await fetch("/api/content", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const apiResponse = await response.json();
        // Check if API returned the expected structure
        if (apiResponse.success && apiResponse.content) {
          // Merge API content with default content to ensure all required fields exist
          const mergedContent = {
            ...defaultContent,
            ...apiResponse.content,
            // Ensure nested objects are properly merged
            hero: {
              ...defaultContent.hero,
              ...(apiResponse.content.hero || {}),
            },
            features: {
              ...defaultContent.features,
              ...(apiResponse.content.features || {}),
            },
            footer: {
              ...defaultContent.footer,
              ...(apiResponse.content.footer || {}),
            },
            about: {
              ...defaultContent.about,
              ...(apiResponse.content.about || {}),
            },
            pricing: {
              ...defaultContent.pricing,
              ...(apiResponse.content.pricing || {}),
            },
          };
          setContent(mergedContent);
          setOriginalContent(JSON.parse(JSON.stringify(mergedContent)));
          console.log("Content loaded from API and merged with defaults");
        } else {
          throw new Error("Invalid API response structure");
        }
      } else {
        throw new Error(`API responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to load content:", error);
      // Fallback to local storage or default content on error
      const localContent = localStorage.getItem("skitbit-content");
      if (localContent) {
        try {
          const parsedContent = JSON.parse(localContent);
          // Merge with default content to ensure all fields exist
          const mergedContent = {
            ...defaultContent,
            ...parsedContent,
            hero: { ...defaultContent.hero, ...(parsedContent.hero || {}) },
            features: {
              ...defaultContent.features,
              ...(parsedContent.features || {}),
            },
            footer: {
              ...defaultContent.footer,
              ...(parsedContent.footer || {}),
            },
            about: { ...defaultContent.about, ...(parsedContent.about || {}) },
            pricing: {
              ...defaultContent.pricing,
              ...(parsedContent.pricing || {}),
            },
          };
          setContent(mergedContent);
          setOriginalContent(JSON.parse(JSON.stringify(mergedContent)));
          console.log(
            "Content loaded from local storage and merged with defaults"
          );
        } catch (parseError) {
          console.error("Error parsing local storage content:", parseError);
          setContent(defaultContent);
          setOriginalContent(JSON.parse(JSON.stringify(defaultContent)));
          console.log("Using default content after local storage parse error");
        }
      } else {
        setContent(defaultContent);
        setOriginalContent(JSON.parse(JSON.stringify(defaultContent)));
        console.log("Using default content - no API or local storage data");
      }
    }
  };

  useEffect(() => {
    const initializeAdmin = async () => {
      try {
        // Verify server session
        const response = await fetch("/api/admin/verify", {
          credentials: "include",
        });
        if (!response.ok) {
          router.replace("/admin/login");
          return;
        }
        const result = await response.json();
        if (!result.success || result.user?.role !== "admin") {
          router.replace("/admin/login");
          return;
        }
        setAdminUser({ name: result.user.name, email: result.user.email });
        setIsAuthenticated(true);
        await loadContent();
      } catch (e) {
        router.replace("/admin/login");
        return;
      } finally {
        setIsLoading(false);
      }
    };

    initializeAdmin();
  }, []);

  // Check for changes whenever content is updated
  useEffect(() => {
    const hasContentChanged =
      JSON.stringify(content) !== JSON.stringify(originalContent);
    setHasChanges(hasContentChanged);
  }, [content, originalContent]);

  const handleLogout = () => {
    document.cookie =
      "admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin/login");
  };

  const handleContentChange = (
    section: keyof ContentData,
    field: string,
    value: string | string[]
  ) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handlePricingChange = (
    tier: "startup" | "pro" | "premium",
    field: string,
    value: string | string[]
  ) => {
    setContent((prev) => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [tier]: {
          ...prev.pricing[tier],
          [field]: value,
        },
      },
    }));
  };

  const addFeature = (tier: "startup" | "pro" | "premium") => {
    if (featureToAdd.trim()) {
      handlePricingChange(tier, "features", [
        ...content.pricing[tier].features,
        featureToAdd.trim(),
      ]);
      setFeatureToAdd("");
    }
  };

  const removeFeature = (
    tier: "startup" | "pro" | "premium",
    index: number
  ) => {
    const newFeatures = [...content.pricing[tier].features];
    newFeatures.splice(index, 1);
    handlePricingChange(tier, "features", newFeatures);
  };

  const addVideo = (tier: "startup" | "pro" | "premium") => {
    if (videoToAdd.trim()) {
      // Extract YouTube ID if full URL is pasted
      let videoId = videoToAdd.trim();

      // Handle youtube.com/watch?v= format
      if (videoId.includes("youtube.com/watch?v=")) {
        videoId = videoId.split("v=")[1]?.split("&")[0] || videoId;
      }

      // Handle youtu.be/ format
      if (videoId.includes("youtu.be/")) {
        videoId = videoId.split("youtu.be/")[1]?.split("?")[0] || videoId;
      }

      handlePricingChange(tier, "videos", [
        ...content.pricing[tier].videos,
        videoId,
      ]);
      setVideoToAdd("");
    }
  };

  const removeVideo = (tier: "startup" | "pro" | "premium", index: number) => {
    const newVideos = [...content.pricing[tier].videos];
    newVideos.splice(index, 1);
    handlePricingChange(tier, "videos", newVideos);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      const updates = [];

      // Compare content and create update requests
      for (const section in content) {
        // Ensure section exists in originalContent before iterating
        if (originalContent[section]) {
          for (const key in content[section]) {
            if (content[section][key] !== originalContent[section]?.[key]) {
              updates.push(
                fetch("/api/content", {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    section,
                    key,
                    value: content[section][key],
                  }),
                })
              );
            }
          }
        } else {
          // If section is new, add it
          updates.push(
            fetch("/api/content", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                section,
                data: content[section],
              }),
            })
          );
        }
      }

      // Handle deleted sections (if any) - this logic would be more complex and might involve a separate API endpoint or a different approach
      // For now, we assume content is only being updated or added.

      await Promise.all(updates);

      // Create a new activity item
      const section =
        selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1);
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        name: `${section} Content`,
        status: "Updated",
        change: `+${(Math.random() * 3 + 0.5).toFixed(1)}%`,
        icon:
          selectedPage === "home"
            ? "🏠"
            : selectedPage === "pricing"
            ? "💰"
            : selectedPage === "content"
            ? "📝"
            : selectedPage === "settings"
            ? "⚙️"
            : "📄",
        time: "Just now",
        timestamp: Date.now(),
      };

      const updatedActivity = [newActivity, ...activityItems.slice(0, 9)];
      setActivityItems(updatedActivity);
      // localStorage.setItem("skitbit-activity", JSON.stringify(updatedActivity)) // Removed as activity is likely managed server-side too

      // Update original content to match current content
      setOriginalContent(JSON.parse(JSON.stringify(content)));
      setHasChanges(false);
      setSaveMessage("Changes saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      console.error("Save failed:", error);
      setSaveMessage("Failed to save changes. Please try again.");
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    // Open homepage in new tab
    window.open("/", "_blank");
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Simple search functionality
      const sections = [
        "home",
        "content",
        "pricing",
        "analytics",
        "settings",
        "help",
      ];
      const found = sections.find((section) =>
        section.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (found) {
        setSelectedPage(found);
        setSearchQuery("");
      }
    }
  };

  const clearNotifications = () => {
    setNotifications(0);
  };

  const formatTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    if (interval === 1) return `1 day ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    if (interval === 1) return `1 hour ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    if (interval === 1) return `1 minute ago`;

    return `Just now`;
  };

  // Update activity times
  useEffect(() => {
    const updateTimes = () => {
      setActivityItems((prev) =>
        prev.map((item) => ({
          ...item,
          time: formatTimeAgo(item.timestamp),
        }))
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const navigateActivity = (direction: "prev" | "next") => {
    if (direction === "prev" && activityPage > 0) {
      setActivityPage((prev) => prev - 1);
    } else if (
      direction === "next" &&
      (activityPage + 1) * 4 < activityItems.length
    ) {
      setActivityPage((prev) => prev + 1);
    }
  };

  const currentActivityItems = activityItems.slice(
    activityPage * 4,
    (activityPage + 1) * 4
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-300 mt-4">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: "home", name: "Home", icon: Home },
    { id: "content", name: "Content", icon: FileText },
    { id: "portfolio", name: "Portfolio", icon: Camera },
    { id: "pricing", name: "Pricing", icon: DollarSign },
    { id: "orders", name: "Orders", icon: Package },
    { id: "analytics", name: "Analytics", icon: BarChart3 },
    { id: "settings", name: "Settings", icon: Settings },
    { id: "help", name: "Help", icon: HelpCircle },
  ];

  const renderPortfolioPage = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Portfolio Management
            </h2>
            <p className="text-neutral-400">
              Upload and manage your portfolio items
            </p>
          </div>
          <UploadModal
            onUploadComplete={() => {
              fetchPortfolioItems();
            }}
            trigger={
              <Button className="bg-white text-black hover:bg-gray-100">
                <Camera className="h-4 w-4 mr-2" />
                Upload New Items
              </Button>
            }
          />
        </div>

        {/* Error Alert */}
        {portfolioError && (
          <Alert className="bg-red-500/10 border-red-500/30 text-red-300">
            <AlertDescription>{portfolioError}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">
                    Total Items
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {portfolioItems.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Images</p>
                  <p className="text-2xl font-bold text-white">
                    {
                      portfolioItems.filter(
                        (item) => item.file_type === "image"
                      ).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Camera className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">Videos</p>
                  <p className="text-2xl font-bold text-white">
                    {
                      portfolioItems.filter(
                        (item) => item.file_type === "video"
                      ).length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-400">
                    Featured
                  </p>
                  <p className="text-2xl font-bold text-white">
                    {portfolioItems.filter((item) => item.is_featured).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Items Table */}
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Portfolio Items</CardTitle>
          </CardHeader>
          <CardContent>
            {isPortfolioLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : portfolioItems.length === 0 ? (
              <div className="text-center py-8">
                <Camera className="h-16 w-16 text-neutral-500 mx-auto mb-4" />
                <p className="text-xl text-neutral-400 mb-2">
                  No portfolio items yet
                </p>
                <p className="text-sm text-neutral-500">
                  Upload your first item to get started
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-neutral-700">
                      <TableHead className="text-neutral-300">
                        Preview
                      </TableHead>
                      <TableHead className="text-neutral-300">Title</TableHead>
                      <TableHead className="text-neutral-300">
                        Category
                      </TableHead>
                      <TableHead className="text-neutral-300">Type</TableHead>
                      <TableHead className="text-neutral-300">Size</TableHead>
                      <TableHead className="text-neutral-300">
                        Featured
                      </TableHead>
                      <TableHead className="text-neutral-300">
                        Created
                      </TableHead>
                      <TableHead className="text-neutral-300">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioItems.map((item) => (
                      <TableRow key={item.id} className="border-neutral-700">
                        <TableCell>
                          <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-neutral-800">
                            <img
                              src={item.thumbnail_url || item.file_url}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                            {item.file_type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                <Video className="h-6 w-6 text-white" />
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-white">
                              {item.title}
                            </p>
                            <p className="text-sm text-neutral-400 truncate max-w-xs">
                              {item.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-neutral-600 text-neutral-300"
                          >
                            {item.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-neutral-300">
                            {item.file_type === "video" ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <ImageIcon className="h-4 w-4" />
                            )}
                            <span className="capitalize">{item.file_type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-neutral-300">
                          {formatFileSize(item.file_size)}
                        </TableCell>
                        <TableCell>
                          {item.is_featured ? (
                            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                              Featured
                            </Badge>
                          ) : (
                            <span className="text-neutral-500">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-neutral-300 text-sm">
                          {formatDate(item.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                window.open(item.file_url, "_blank")
                              }
                              className="text-neutral-400 hover:text-white"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePortfolioEdit(item)}
                              className="text-neutral-400 hover:text-white"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePortfolioDelete(item.id)}
                              className={
                                deleteConfirm === item.id
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-neutral-400 hover:text-white"
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {deleteConfirm === item.id && (
                            <p className="text-xs text-red-400 mt-1">
                              Click again to confirm
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderMainContent = () => {
    switch (selectedPage) {
      case "home":
        return renderHomePage();
      case "content":
        return renderContentPage();
      case "portfolio":
        return renderPortfolioPage();
      case "pricing":
        return renderPricingPage();
      case "orders":
        return renderOrdersPage();
      case "analytics":
        return renderAnalyticsPage();
      case "settings":
        return renderSettingsPage();
      case "help":
        return renderHelpPage();
      default:
        return renderHomePage();
    }
  };

  // Placeholder functions for other pages (to be implemented)
  const renderHomePage = () => {
    return (
      <div className="space-y-6">
        {/* Status Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-blue-600/80" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  Content Management Active
                </h3>
                <p className="text-purple-100">
                  Your website content is live and ready for updates.
                </p>
              </div>
            </div>
            <Button
              onClick={handlePreview}
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6"
            >
              Preview Site
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-400 text-sm">
                    Total Content Sections
                  </p>
                  <p className="text-2xl font-bold text-white">6</p>
                </div>
                <Button
                  onClick={() => setSelectedPage("content")}
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto font-normal"
                >
                  Manage content <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-400 text-sm">Site Performance</p>
                  <p className="text-2xl font-bold text-white">98.5%</p>
                </div>
                <Button
                  onClick={() => setSelectedPage("analytics")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-[#1a1a1a] border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Updates</CardTitle>
              <p className="text-neutral-400 text-sm">
                Content changes from the last 24 hours
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-neutral-400"
                onClick={() => navigateActivity("prev")}
                disabled={activityPage === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-neutral-400"
                onClick={() => navigateActivity("next")}
                disabled={(activityPage + 1) * 4 >= activityItems.length}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentActivityItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-neutral-400 text-sm">
                      {item.status} • {item.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold">
                    {item.change}
                  </span>
                  <TrendingUp className="h-4 w-4 text-green-400" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderContentPage = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Content Management
            </h2>
            <p className="text-neutral-400">
              Edit your website content and sections
            </p>
          </div>
          <div className="flex gap-3">
            {hasChanges && (
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Unsaved changes
              </Badge>
            )}
            <Button
              onClick={handlePreview}
              variant="outline"
              className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 bg-transparent"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {saveMessage && (
          <Alert
            className={`${
              saveMessage.includes("Error")
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : "bg-green-500/10 border-green-500/30 text-green-300"
            }`}
          >
            {saveMessage.includes("Error") ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-neutral-900/50 border border-neutral-800">
            <TabsTrigger
              value="hero"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Hero
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Features
            </TabsTrigger>
            <TabsTrigger
              value="footer"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Footer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Hero Section</CardTitle>
                    <p className="text-neutral-400 text-sm">
                      The main banner that visitors see first
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-neutral-200">Main Title</Label>
                  <Textarea
                    value={content.hero.title}
                    onChange={(e) =>
                      handleContentChange("hero", "title", e.target.value)
                    }
                    className="min-h-[80px] bg-[#0f0f0f] border-neutral-700 text-white"
                    placeholder="Enter your main headline..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-neutral-200">Subtitle</Label>
                    <Input
                      value={content.hero.subtitle}
                      onChange={(e) =>
                        handleContentChange("hero", "subtitle", e.target.value)
                      }
                      className="bg-[#0f0f0f] border-neutral-700 text-white"
                      placeholder="Enter subtitle..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-neutral-200">Button Text</Label>
                    <Input
                      value={content.hero.buttonText}
                      onChange={(e) =>
                        handleContentChange(
                          "hero",
                          "buttonText",
                          e.target.value
                        )
                      }
                      className="bg-[#0f0f0f] border-neutral-700 text-white"
                      placeholder="Enter button text..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Features Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-neutral-200">Section Title</Label>
                  <Input
                    value={content.features.title}
                    onChange={(e) =>
                      handleContentChange("features", "title", e.target.value)
                    }
                    className="bg-[#0f0f0f] border-neutral-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-200">Section Subtitle</Label>
                  <Input
                    value={content.features.subtitle}
                    onChange={(e) =>
                      handleContentChange(
                        "features",
                        "subtitle",
                        e.target.value
                      )
                    }
                    className="bg-[#0f0f0f] border-neutral-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Footer Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-neutral-200">Tagline</Label>
                  <Textarea
                    value={content.footer.tagline}
                    onChange={(e) =>
                      handleContentChange("footer", "tagline", e.target.value)
                    }
                    className="min-h-[60px] bg-[#0f0f0f] border-neutral-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-neutral-200">Copyright Text</Label>
                  <Input
                    value={content.footer.copyright}
                    onChange={(e) =>
                      handleContentChange("footer", "copyright", e.target.value)
                    }
                    className="bg-[#0f0f0f] border-neutral-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderPricingPage = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Pricing Management
            </h2>
            <p className="text-neutral-400">
              Update pricing tiers and video examples
            </p>
          </div>
          <div className="flex gap-3">
            {hasChanges && (
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Unsaved changes
              </Badge>
            )}
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {saveMessage && (
          <Alert
            className={`${
              saveMessage.includes("Error")
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : "bg-green-500/10 border-green-500/30 text-green-300"
            }`}
          >
            {saveMessage.includes("Error") ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs
          defaultValue="startup"
          className="w-full"
          onValueChange={(value) =>
            setCurrentPricingTier(value as "startup" | "pro" | "premium")
          }
        >
          <TabsList className="grid w-full grid-cols-3 bg-neutral-900/50 border border-neutral-800">
            <TabsTrigger
              value="startup"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Startup
            </TabsTrigger>
            <TabsTrigger
              value="pro"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Pro
            </TabsTrigger>
            <TabsTrigger
              value="premium"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Premium
            </TabsTrigger>
          </TabsList>

          {(["startup", "pro", "premium"] as const).map((tier) => (
            <TabsContent key={tier} value={tier} className="space-y-6">
              <Card className="bg-[#1a1a1a] border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-white capitalize">
                    {tier} Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-neutral-200">USD Price</Label>
                      <Input
                        value={content.pricing[tier].price_usd}
                        onChange={(e) =>
                          handlePricingChange(tier, "price_usd", e.target.value)
                        }
                        className="bg-[#0f0f0f] border-neutral-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-neutral-200">INR Price</Label>
                      <Input
                        value={content.pricing[tier].price_inr}
                        onChange={(e) =>
                          handlePricingChange(tier, "price_inr", e.target.value)
                        }
                        className="bg-[#0f0f0f] border-neutral-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-neutral-200">Features</Label>
                    <div className="space-y-3">
                      {content.pricing[tier].features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => {
                              const newFeatures = [
                                ...content.pricing[tier].features,
                              ];
                              newFeatures[index] = e.target.value;
                              handlePricingChange(
                                tier,
                                "features",
                                newFeatures
                              );
                            }}
                            className="bg-[#0f0f0f] border-neutral-700 text-white"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFeature(tier, index)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex items-center gap-2">
                        <Input
                          value={featureToAdd}
                          onChange={(e) => setFeatureToAdd(e.target.value)}
                          placeholder="Add new feature..."
                          className="bg-[#0f0f0f] border-neutral-700 text-white"
                          onKeyPress={(e) =>
                            e.key === "Enter" && addFeature(tier)
                          }
                        />
                        <Button
                          variant="outline"
                          onClick={() => addFeature(tier)}
                          className="border-neutral-700 text-neutral-300 bg-transparent"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Management */}
              <Card className="bg-[#1a1a1a] border-neutral-800">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-red-400" />
                    <CardTitle className="text-white">Video Examples</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Input
                        value={videoToAdd}
                        onChange={(e) => setVideoToAdd(e.target.value)}
                        placeholder="Add YouTube video ID or URL..."
                        className="bg-[#0f0f0f] border-neutral-700 text-white"
                        onKeyPress={(e) => e.key === "Enter" && addVideo(tier)}
                      />
                      <Button
                        variant="outline"
                        onClick={() => addVideo(tier)}
                        className="border-neutral-700 text-neutral-300 bg-transparent"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {content.pricing[tier].videos.map((videoId, index) => (
                        <div key={index} className="relative">
                          <div className="aspect-video bg-neutral-900 rounded-lg overflow-hidden">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              className="w-full h-full"
                              allowFullScreen
                              title={`${tier} plan video ${index + 1}`}
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeVideo(tier, index)}
                            className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 rounded-full w-6 h-6 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  };

  const renderOrdersPage = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Order Form Management
            </h2>
            <p className="text-neutral-400">
              Configure the order flow, pricing, and form settings
            </p>
          </div>
          <div className="flex gap-3">
            {hasChanges && (
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Unsaved changes
              </Badge>
            )}
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {saveMessage && (
          <Alert
            className={`${
              saveMessage.includes("Error")
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : "bg-green-500/10 border-green-500/30 text-green-300"
            }`}
          >
            {saveMessage.includes("Error") ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-neutral-900/50 border border-neutral-800">
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="modeling"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              3D Modeling
            </TabsTrigger>
            <TabsTrigger
              value="renders"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Renders
            </TabsTrigger>
            <TabsTrigger
              value="flow"
              className="data-[state=active]:bg-[#C6FF3A]/20 data-[state=active]:text-[#C6FF3A]"
            >
              Form Flow
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Order Form Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-neutral-200">WhatsApp Number</Label>
                  <Input
                    value={content.orderForm.whatsappNumber}
                    onChange={(e) =>
                      handleContentChange(
                        "orderForm",
                        "whatsappNumber",
                        e.target.value
                      )
                    }
                    className="bg-[#0f0f0f] border-neutral-700 text-white"
                    placeholder="+1234567890"
                  />
                  <p className="text-neutral-400 text-sm">
                    Orders will be sent to this WhatsApp number. Include country
                    code.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="modeling" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">
                  3D Modeling Add-on Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(["simple", "medium", "complex"] as const).map((option) => (
                  <div
                    key={option}
                    className="p-4 border border-neutral-700 rounded-lg space-y-4"
                  >
                    <h4 className="text-white font-semibold capitalize">
                      {option} Modeling
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-neutral-200">USD Price</Label>
                        <Input
                          type="number"
                          value={
                            content.orderForm.modelingOptions[option].price_usd
                          }
                          onChange={(e) => {
                            const newOptions = {
                              ...content.orderForm.modelingOptions,
                            };
                            newOptions[option].price_usd =
                              Number.parseInt(e.target.value) || 0;
                            handleContentChange(
                              "orderForm",
                              "modelingOptions",
                              newOptions
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-neutral-200">INR Price</Label>
                        <Input
                          type="number"
                          value={
                            content.orderForm.modelingOptions[option].price_inr
                          }
                          onChange={(e) => {
                            const newOptions = {
                              ...content.orderForm.modelingOptions,
                            };
                            newOptions[option].price_inr =
                              Number.parseInt(e.target.value) || 0;
                            handleContentChange(
                              "orderForm",
                              "modelingOptions",
                              newOptions
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-neutral-200">Description</Label>
                        <Input
                          value={
                            content.orderForm.modelingOptions[option]
                              .description
                          }
                          onChange={(e) => {
                            const newOptions = {
                              ...content.orderForm.modelingOptions,
                            };
                            newOptions[option].description = e.target.value;
                            handleContentChange(
                              "orderForm",
                              "modelingOptions",
                              newOptions
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renders" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">
                  Render Package Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(["basic", "standard", "premium"] as const).map((option) => (
                  <div
                    key={option}
                    className="p-4 border border-neutral-700 rounded-lg space-y-4"
                  >
                    <h4 className="text-white font-semibold capitalize">
                      {option} Pack
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label className="text-neutral-200">USD Price</Label>
                        <Input
                          type="number"
                          value={
                            content.orderForm.renderOptions[option].price_usd
                          }
                          onChange={(e) => {
                            const newOptions = {
                              ...content.orderForm.renderOptions,
                            };
                            newOptions[option].price_usd =
                              Number.parseInt(e.target.value) || 0;
                            handleContentChange(
                              "orderForm",
                              "renderOptions",
                              newOptions
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-neutral-200">INR Price</Label>
                        <Input
                          type="number"
                          value={
                            content.orderForm.renderOptions[option].price_inr
                          }
                          onChange={(e) => {
                            const newOptions = {
                              ...content.orderForm.renderOptions,
                            };
                            newOptions[option].price_inr =
                              Number.parseInt(e.target.value) || 0;
                            handleContentChange(
                              "orderForm",
                              "renderOptions",
                              newOptions
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-neutral-200">Quantity</Label>
                        <Input
                          type="number"
                          value={
                            content.orderForm.renderOptions[option].quantity
                          }
                          onChange={(e) => {
                            const newOptions = {
                              ...content.orderForm.renderOptions,
                            };
                            newOptions[option].quantity =
                              Number.parseInt(e.target.value) || 0;
                            handleContentChange(
                              "orderForm",
                              "renderOptions",
                              newOptions
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white"
                        />
                      </div>
                      <div className="flex items-end">
                        <div className="text-sm text-neutral-400">
                          {content.orderForm.renderOptions[option].quantity}{" "}
                          renders
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flow" className="space-y-6">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Plan Configuration</CardTitle>
                <p className="text-neutral-400 text-sm">
                  Configure which plans include 3D modeling
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-neutral-700 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Startup Plan
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300 text-sm">
                        Includes Simple 3D Modeling
                      </span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        Included
                      </Badge>
                    </div>
                    <p className="text-neutral-400 text-xs mt-2">
                      Skips 3D model questions, goes straight to render upsell
                    </p>
                  </div>
                  <div className="p-4 border border-neutral-700 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Pro Plan</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300 text-sm">
                        Optional 3D Modeling
                      </span>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        Optional
                      </Badge>
                    </div>
                    <p className="text-neutral-400 text-xs mt-2">
                      Asks if user has model, offers modeling add-ons
                    </p>
                  </div>
                  <div className="p-4 border border-neutral-700 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">
                      Premium Plan
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-300 text-sm">
                        Includes Complex 3D Modeling
                      </span>
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        Included
                      </Badge>
                    </div>
                    <p className="text-neutral-400 text-xs mt-2">
                      Skips 3D model questions, goes straight to render upsell
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Order Form Flow</CardTitle>
                <p className="text-neutral-400 text-sm">
                  Configure the steps in your order form
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.orderForm.formSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-neutral-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#C6FF3A]/20 rounded-full flex items-center justify-center text-[#C6FF3A] font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={step.title}
                          onChange={(e) => {
                            const newSteps = [...content.orderForm.formSteps];
                            newSteps[index].title = e.target.value;
                            handleContentChange(
                              "orderForm",
                              "formSteps",
                              newSteps
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white font-medium"
                          placeholder="Step title"
                        />
                        <Input
                          value={step.description}
                          onChange={(e) => {
                            const newSteps = [...content.orderForm.formSteps];
                            newSteps[index].description = e.target.value;
                            handleContentChange(
                              "orderForm",
                              "formSteps",
                              newSteps
                            );
                          }}
                          className="bg-[#0f0f0f] border-neutral-700 text-white text-sm"
                          placeholder="Step description"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newSteps = [...content.orderForm.formSteps];
                          newSteps[index].enabled = !newSteps[index].enabled;
                          handleContentChange(
                            "orderForm",
                            "formSteps",
                            newSteps
                          );
                        }}
                        className={`${
                          step.enabled
                            ? "text-green-400 hover:text-green-300"
                            : "text-neutral-500 hover:text-neutral-400"
                        }`}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-neutral-400 hover:text-neutral-300"
                      >
                        <Move className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Form Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-neutral-400 text-sm">
                    Active steps in order:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {content.orderForm.formSteps
                      .filter((step) => step.enabled)
                      .map((step, index) => (
                        <Badge
                          key={index}
                          className="bg-[#C6FF3A]/20 text-[#C6FF3A] border-[#C6FF3A]/30"
                        >
                          {index + 1}. {step.title}
                        </Badge>
                      ))}
                  </div>
                  <Button
                    onClick={() => window.open("/checkout?plan=pro", "_blank")}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Test Order Form
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderAnalyticsPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
          <p className="text-neutral-400">
            Monitor your website performance and user engagement
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {analyticsData.map((item, index) => (
            <Card key={index} className="bg-[#1a1a1a] border-neutral-800">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-neutral-400 text-sm">{item.metric}</p>
                  <p className="text-2xl font-bold text-white">{item.value}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${
                        item.trend === "up" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {item.change}
                    </span>
                    <TrendingUp
                      className={`h-4 w-4 ${
                        item.trend === "up"
                          ? "text-green-400"
                          : "text-red-400 rotate-180"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-[#1a1a1a] border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Traffic Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-neutral-400">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Analytics chart would be displayed here</p>
                <p className="text-sm">
                  Integration with Google Analytics or similar service
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { page: "Homepage", views: "5,432", change: "+12.3%" },
                { page: "About Us", views: "2,871", change: "+8.7%" },
                { page: "Pricing", views: "2,103", change: "+15.2%" },
                {
                  page: "3D Product Rendering",
                  views: "1,654",
                  change: "+9.5%",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#0f0f0f]"
                >
                  <div>
                    <p className="text-white font-medium">{item.page}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-300">{item.views} views</span>
                    <span className="text-green-400 font-semibold">
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderSettingsPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Settings</h2>
          <p className="text-neutral-400">
            Manage your admin account and system preferences
          </p>
        </div>

        {saveMessage && (
          <Alert
            className={`${
              saveMessage.includes("Error")
                ? "bg-red-500/10 border-red-500/30 text-red-300"
                : "bg-green-500/10 border-green-500/30 text-green-300"
            }`}
          >
            {saveMessage.includes("Error") ? (
              <AlertCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{saveMessage}</AlertDescription>
          </Alert>
        )}

        <Card className="bg-[#1a1a1a] border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Admin Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-neutral-200">Admin Email</Label>
              <Input
                type="email"
                value={content.settings.adminEmail}
                onChange={(e) =>
                  handleContentChange("settings", "adminEmail", e.target.value)
                }
                className="bg-[#0f0f0f] border-neutral-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-neutral-200">Admin Password</Label>
              <Input
                type="password"
                value={content.settings.adminPassword}
                onChange={(e) =>
                  handleContentChange(
                    "settings",
                    "adminPassword",
                    e.target.value
                  )
                }
                className="bg-[#0f0f0f] border-neutral-700 text-white"
              />
            </div>
            <Alert className="bg-orange-500/10 border-orange-500/30 text-orange-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Changing these credentials will require you to log in again with
                the new details.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="bg-[#1a1a1a] border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">System Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-neutral-400 text-sm">
                  Receive updates about content changes
                </p>
              </div>
              <Button
                variant="outline"
                className="border-neutral-700 text-neutral-300 bg-transparent"
              >
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Auto-save</p>
                <p className="text-neutral-400 text-sm">
                  Automatically save changes every 5 minutes
                </p>
              </div>
              <Button
                variant="outline"
                className="border-neutral-700 text-neutral-300 bg-transparent"
              >
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Reset Dashboard</p>
                <p className="text-neutral-400 text-sm">
                  Clear all saved data and restore defaults
                </p>
              </div>
              <Button
                variant="destructive"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  if (
                    confirm(
                      "Are you sure you want to reset all dashboard data? This cannot be undone."
                    )
                  ) {
                    localStorage.removeItem("skitbit-content");
                    localStorage.removeItem("skitbit-activity");
                    setContent(defaultContent);
                    setOriginalContent(defaultContent);
                    setActivityItems(initialActivity);
                    setSaveMessage("Dashboard reset successfully!");
                  }
                }}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            className="bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </div>
    );
  };

  const renderHelpPage = () => {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Help & Support</h2>
          <p className="text-neutral-400">
            Get assistance with using the admin dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Quick Start Guide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C6FF3A] rounded-full flex items-center justify-center text-black text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="text-white font-medium">Edit Content</p>
                  <p className="text-neutral-400 text-sm">
                    Go to Content section to update your website text
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C6FF3A] rounded-full flex items-center justify-center text-black text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="text-white font-medium">Update Pricing</p>
                  <p className="text-neutral-400 text-sm">
                    Manage your pricing plans and video examples
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C6FF3A] rounded-full flex items-center justify-center text-black text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="text-white font-medium">Save Changes</p>
                  <p className="text-neutral-400 text-sm">
                    Always save your changes before leaving
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Contact Support</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-white font-medium">Email Support</p>
                <p className="text-neutral-400 text-sm">admin@theskitbit.com</p>
              </div>
              <div>
                <p className="text-white font-medium">Response Time</p>
                <p className="text-neutral-400 text-sm">
                  Usually within 24 hours
                </p>
              </div>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => {
                  alert(
                    "Support request sent! Our team will contact you shortly."
                  );
                }}
              >
                Send Support Request
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-[#1a1a1a] border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-white font-medium mb-2">
                How do I update the homepage content?
              </p>
              <p className="text-neutral-400 text-sm">
                Navigate to Content → Hero tab, make your changes, and click
                Save Changes.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">
                Can I preview changes before saving?
              </p>
              <p className="text-neutral-400 text-sm">
                Yes, click the Preview button to open your website in a new tab.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">
                How do I add new videos to pricing plans?
              </p>
              <p className="text-neutral-400 text-sm">
                Go to Pricing section, select a plan, and add YouTube video IDs
                in the Video Examples field.
              </p>
            </div>
            <div>
              <p className="text-white font-medium mb-2">
                Is my data saved securely?
              </p>
              <p className="text-neutral-400 text-sm">
                All data is stored locally in your browser. For production use,
                we recommend implementing server-side storage.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-neutral-800"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C6FF3A] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">PS</span>
              </div>
              <span className="text-xl font-semibold hidden sm:block">
                Perspective Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {saveMessage && (
              <div className="text-sm text-[#C6FF3A] bg-[#C6FF3A]/10 px-3 py-1 rounded-lg">
                {saveMessage}
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-neutral-800"
                >
                  <User className="h-4 w-4 mr-2" />
                  {adminUser?.name || "Admin"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-neutral-900 border-neutral-700"
              >
                <DropdownMenuLabel className="text-white">
                  {adminUser?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-neutral-700" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-white hover:bg-neutral-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar - Collapsed on mobile, fixed on desktop */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-neutral-900/50 backdrop-blur-sm border-r border-neutral-800 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C6FF3A] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">PS</span>
              </div>
              <span className="text-xl font-semibold">Perspective Studio</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-neutral-800"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setSelectedPage(item.id);
                      if (sidebarOpen) setSidebarOpen(false); // Close sidebar on mobile when item is clicked
                    }}
                    className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      selectedPage === item.id
                        ? "bg-neutral-800 text-white"
                        : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-neutral-800">
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 pt-16">
          {" "}
          {/* Adjust pt-16 to account for fixed header */}
          <div className="p-4 lg:p-6" ref={contentRef}>
            {renderMainContent()}
          </div>
        </main>
      </div>

      {/* Portfolio Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md bg-neutral-900 border-neutral-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Portfolio Item</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Update the details of your portfolio item.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title" className="text-neutral-200">
                Title
              </Label>
              <Input
                id="edit-title"
                value={editForm.title}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, title: e.target.value }))
                }
                className="bg-neutral-800 border-neutral-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-description" className="text-neutral-200">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="bg-neutral-800 border-neutral-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="edit-category" className="text-neutral-200">
                Category
              </Label>
              <Select
                value={editForm.category}
                onValueChange={(value) =>
                  setEditForm((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="bg-neutral-800 border-neutral-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-600">
                  {portfolioCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-white hover:bg-neutral-700"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-sort-order" className="text-neutral-200">
                Sort Order
              </Label>
              <Input
                id="edit-sort-order"
                type="number"
                value={editForm.sort_order}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    sort_order: parseInt(e.target.value) || 0,
                  }))
                }
                className="bg-neutral-800 border-neutral-600 text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="edit-featured"
                checked={editForm.is_featured}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    is_featured: e.target.checked,
                  }))
                }
                className="bg-neutral-800 border-neutral-600"
              />
              <Label htmlFor="edit-featured" className="text-neutral-200">
                Featured Item
              </Label>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePortfolioEdit}
              className="bg-[#C6FF3A] text-black hover:bg-[#C6FF3A]/90"
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
