"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileVideo,
  Import,
  Link,
  Plus,
  ArrowLeft,
} from "lucide-react";
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper";

interface BlobFile {
  url: string;
  pathname: string;
  filename: string;
  size: number;
  uploadedAt: string;
  type: "image" | "video";
  title?: string;
  description?: string;
  category?: string;
  selected?: boolean;
}

interface UrlFile {
  url: string;
  filename: string;
  type: "image" | "video";
  title?: string;
  description?: string;
  category?: string;
  selected?: boolean;
  source: "url";
}

const categories = [
  "Studio Photography",
  "Product Photography",
  "Commercial Video",
  "Event Photography",
  "Portrait Photography",
  "Brand Photography",
  "Creative Content",
];

function ImportBlobFilesContent() {
  const [blobFiles, setBlobFiles] = useState<BlobFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [importing, setImporting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<(BlobFile | UrlFile)[]>(
    []
  );
  const [urlInput, setUrlInput] = useState("");
  const [urlFiles, setUrlFiles] = useState<UrlFile[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("[v0] Import-blob page loaded, loading files...");
    setTimeout(() => {
      loadBlobFiles();
    }, 500);
  }, []);

  const loadBlobFiles = async () => {
    try {
      console.log("[v0] Fetching blob files...");
      const response = await fetch("/api/portfolio/import-blob", {
        credentials: "include",
      });
      console.log("[v0] Blob files response status:", response.status);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          console.log("[v0] Authentication failed, redirecting to login");
          window.location.href = "/admin/login";
          return;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log("[v0] Blob files data:", data);
      setBlobFiles(data.files || []);
    } catch (error) {
      console.error("[v0] Failed to load blob files:", error);
    } finally {
      setLoading(false);
    }
  };

  const convertGooglePhotosUrl = (url: string): string => {
    // Extract the photo ID from Google Photos URL
    const photoIdMatch = url.match(/photo\/([^?]+)/);
    if (photoIdMatch) {
      const photoId = photoIdMatch[1];
      // Convert to direct image URL (this is a simplified approach)
      return `https://lh3.googleusercontent.com/d/${photoId}=s2048`;
    }
    return url;
  };

  const addUrlFile = () => {
    if (!urlInput.trim()) return;

    const urls = urlInput.split("\n").filter((url) => url.trim());
    const newUrlFiles: UrlFile[] = urls.map((url, index) => {
      const cleanUrl = url.trim();
      const convertedUrl = cleanUrl.includes("photos.google.com")
        ? convertGooglePhotosUrl(cleanUrl)
        : cleanUrl;

      return {
        url: convertedUrl,
        filename: `url-image-${Date.now()}-${index}`,
        type: "image" as const,
        source: "url" as const,
      };
    });

    setUrlFiles([...urlFiles, ...newUrlFiles]);
    setUrlInput("");
  };

  const toggleFileSelection = (file: BlobFile | UrlFile) => {
    const isSelected = selectedFiles.some((f) => f.url === file.url);
    if (isSelected) {
      setSelectedFiles(selectedFiles.filter((f) => f.url !== file.url));
    } else {
      setSelectedFiles([...selectedFiles, { ...file, selected: true }]);
    }
  };

  const updateFileMetadata = (url: string, field: string, value: string) => {
    setSelectedFiles(
      selectedFiles.map((file) =>
        file.url === url ? { ...file, [field]: value } : file
      )
    );
  };

  const importSelectedFiles = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select files to import");
      return;
    }

    // Validate required fields
    const invalidFiles = selectedFiles.filter(
      (file) => !file.title || !file.category
    );
    if (invalidFiles.length > 0) {
      alert("Please add title and category for all selected files");
      return;
    }

    setImporting(true);
    try {
      const response = await fetch("/api/portfolio/import-blob", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ files: selectedFiles }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Successfully imported ${data.imported} files to portfolio!`);
        setSelectedFiles([]);
        setUrlFiles([]);
        loadBlobFiles(); // Refresh to remove imported files
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Import error:", error);
      alert("Import failed. Please try again.");
    } finally {
      setImporting(false);
    }
  };

  const allFiles = [...blobFiles, ...urlFiles];

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-gray-300 mt-4">Loading files...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <a href="/admin">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-neutral-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </a>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#C6FF3A] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">PS</span>
              </div>
              <span className="text-xl font-semibold">Blob Import Manager</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">{blobFiles.length} blob files</Badge>
            <Badge variant="outline">{urlFiles.length} URL files</Badge>
            <Badge variant="default">{selectedFiles.length} selected</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Link className="h-5 w-5" />
              Add Images from URLs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-gray-300">Image URLs (one per line)</Label>
              <Textarea
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste Google Photos URLs or direct image URLs here...
Example:
https://photos.google.com/share/...
https://example.com/image.jpg"
                className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
              />
            </div>
            <Button
              onClick={addUrlFile}
              disabled={!urlInput.trim()}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add URLs
            </Button>
          </CardContent>
        </Card>

        {allFiles.length === 0 ? (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="text-center py-12">
              <Download className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                No files available
              </h3>
              <p className="text-gray-500">
                Upload files to Blob storage or add image URLs above
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Import Actions */}
            {selectedFiles.length > 0 && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Import className="h-5 w-5" />
                    Import Selected Files ({selectedFiles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={importSelectedFiles}
                    disabled={importing}
                    className="w-full"
                  >
                    {importing
                      ? "Importing..."
                      : `Import ${selectedFiles.length} Files`}
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Selected Files Configuration */}
            {selectedFiles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">
                  Configure Selected Files
                </h2>
                {selectedFiles.map((file) => (
                  <Card
                    key={file.url}
                    className="bg-gray-900/50 border-gray-800"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                          {file.type === "image" ? (
                            <img
                              src={file.url || "/placeholder.svg"}
                              alt={file.filename}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            <FileVideo className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-gray-300">Title *</Label>
                            <Input
                              value={file.title || ""}
                              onChange={(e) =>
                                updateFileMetadata(
                                  file.url,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="Enter title"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-gray-300">Category *</Label>
                            <Select
                              value={file.category || ""}
                              onValueChange={(value) =>
                                updateFileMetadata(file.url, "category", value)
                              }
                            >
                              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((cat) => (
                                  <SelectItem key={cat} value={cat}>
                                    {cat}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-gray-300">Description</Label>
                            <Textarea
                              value={file.description || ""}
                              onChange={(e) =>
                                updateFileMetadata(
                                  file.url,
                                  "description",
                                  e.target.value
                                )
                              }
                              placeholder="Optional description"
                              className="bg-gray-800 border-gray-700 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Available Files Grid */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">
                Available Files
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFiles.map((file) => {
                  const isSelected = selectedFiles.some(
                    (f) => f.url === file.url
                  );
                  const isUrlFile = "source" in file && file.source === "url";
                  return (
                    <Card
                      key={file.url}
                      className={`bg-gray-900/50 border-gray-800 cursor-pointer transition-colors ${
                        isSelected ? "ring-2 ring-blue-500" : ""
                      }`}
                    >
                      <div className="aspect-video bg-gray-800 relative">
                        {file.type === "image" ? (
                          <img
                            src={file.url || "/placeholder.svg"}
                            alt={file.filename}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileVideo className="h-12 w-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleFileSelection(file)}
                            className="bg-white"
                          />
                        </div>
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge
                            variant={
                              file.type === "image" ? "default" : "secondary"
                            }
                          >
                            {file.type}
                          </Badge>
                          {isUrlFile && <Badge variant="outline">URL</Badge>}
                        </div>
                      </div>
                      <CardContent
                        className="p-4"
                        onClick={() => toggleFileSelection(file)}
                      >
                        <h3 className="font-medium text-white mb-1 truncate">
                          {file.filename}
                        </h3>
                        {isUrlFile ? (
                          <p className="text-sm text-gray-400 mb-2">From URL</p>
                        ) : (
                          <>
                            <p className="text-sm text-gray-400 mb-2">
                              {((file as BlobFile).size / 1024 / 1024).toFixed(
                                1
                              )}{" "}
                              MB
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(
                                (file as BlobFile).uploadedAt
                              ).toLocaleDateString()}
                            </p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function ImportBlobFiles() {
  return (
    <AdminAuthWrapper>
      <ImportBlobFilesContent />
    </AdminAuthWrapper>
  );
}
