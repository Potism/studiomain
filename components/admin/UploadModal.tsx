"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  X,
  Check,
  AlertCircle,
  FileImage,
  FileVideo,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { generateVideoThumbnail, isVideoFile } from "@/lib/video-thumbnail";

interface FileStatus {
  name: string;
  file: File;
  title: string;
  description: string;
  category: string;
  status:
    | "pending"
    | "generating-thumbnail"
    | "uploading"
    | "success"
    | "error";
  error?: string;
  progress: number;
  thumbnail?: File;
  isVideo?: boolean;
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

interface UploadModalProps {
  onUploadComplete?: () => void;
  trigger?: React.ReactNode;
}

export default function UploadModal({
  onUploadComplete,
  trigger,
}: UploadModalProps) {
  const [open, setOpen] = useState(false);
  const [fileStatuses, setFileStatuses] = useState<FileStatus[]>([]);
  const [defaultCategory, setDefaultCategory] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const addFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);

    // Create initial file statuses
    const newStatuses: FileStatus[] = fileArray.map((file) => ({
      name: file.name,
      file,
      title: file.name.replace(/\.[^.]+$/, ""),
      description: "",
      category: defaultCategory,
      status: "pending",
      progress: 0,
      isVideo: isVideoFile(file),
    }));

    setFileStatuses((prev) => [...prev, ...newStatuses]);

    // Generate thumbnails for video files
    for (const fileStatus of newStatuses) {
      if (fileStatus.isVideo) {
        try {
          updateFileStatus(fileStatus.name, {
            status: "generating-thumbnail",
            progress: 20,
          });

          const thumbnail = await generateVideoThumbnail(fileStatus.file, 1);

          updateFileStatus(fileStatus.name, {
            status: "pending",
            progress: 0,
            thumbnail,
          });
        } catch (error) {
          console.error(
            `Failed to generate thumbnail for ${fileStatus.name}:`,
            error
          );
          updateFileStatus(fileStatus.name, {
            status: "pending",
            progress: 0,
            error: "Failed to generate thumbnail",
          });
        }
      }
    }
  };

  const onSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      addFiles(files);
      event.target.value = "";
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      addFiles(files);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const updateFileStatus = (name: string, updates: Partial<FileStatus>) => {
    setFileStatuses((prev) =>
      prev.map((file) => (file.name === name ? { ...file, ...updates } : file))
    );
  };

  const removeFile = (name: string) => {
    setFileStatuses((prev) => prev.filter((file) => file.name !== name));
  };

  const uploadFile = async (fileStatus: FileStatus): Promise<boolean> => {
    try {
      updateFileStatus(fileStatus.name, { status: "uploading", progress: 0 });

      const formData = new FormData();
      formData.append("file", fileStatus.file);
      formData.append("title", fileStatus.title);
      formData.append("description", fileStatus.description);
      formData.append("category", fileStatus.category);

      // Add thumbnail for video files
      if (fileStatus.isVideo && fileStatus.thumbnail) {
        formData.append("thumbnail", fileStatus.thumbnail);
      }

      const response = await fetch("/api/portfolio/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      updateFileStatus(fileStatus.name, {
        status: "success",
        progress: 100,
      });
      return true;
    } catch (error) {
      console.error(`Upload failed for ${fileStatus.name}:`, error);
      updateFileStatus(fileStatus.name, {
        status: "error",
        error: (error as Error).message,
        progress: 0,
      });
      return false;
    }
  };

  const uploadAllFiles = async () => {
    const pendingFiles = fileStatuses.filter((f) => f.status === "pending");
    if (pendingFiles.length === 0) return;

    // Validate files
    for (const file of pendingFiles) {
      if (!file.title.trim() || !file.category.trim()) {
        alert("All files need a title and category");
        return;
      }
    }

    setIsUploading(true);

    try {
      const results = await Promise.allSettled(
        pendingFiles.map((file) => uploadFile(file))
      );

      const successful = results.filter(
        (r) => r.status === "fulfilled" && r.value
      ).length;

      if (successful > 0) {
        onUploadComplete?.();

        // Remove successful uploads after a delay
        setTimeout(() => {
          setFileStatuses((prev) => prev.filter((f) => f.status !== "success"));
        }, 2000);
      }

      // If all successful, close modal
      if (successful === pendingFiles.length) {
        setTimeout(() => {
          setOpen(false);
          setFileStatuses([]);
        }, 2500);
      }
    } finally {
      setIsUploading(false);
    }
  };

  const getFileIcon = (file: File) => {
    return file.type.startsWith("image/") ? FileImage : FileVideo;
  };

  const getStatusIcon = (status: FileStatus["status"]) => {
    switch (status) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "uploading":
        return (
          <div className="h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        );
      default:
        return null;
    }
  };

  const pendingCount = fileStatuses.filter(
    (f) => f.status === "pending"
  ).length;

  const defaultTrigger = (
    <Button className="bg-blue-600 hover:bg-blue-700">
      <Upload className="h-4 w-4 mr-2" />
      Upload Items
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Portfolio Items
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Drag and drop files or click to select. Add titles and categories
            before uploading.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Default Category & File Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Default Category</Label>
              <Select
                value={defaultCategory}
                onValueChange={setDefaultCategory}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Set default for new files" />
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
              <Label htmlFor="file" className="text-gray-300">
                Select Files
              </Label>
              <Input
                id="file"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={onSelectFiles}
                disabled={isUploading}
                className="bg-gray-800 border-gray-700 text-white file:bg-gray-700 file:text-white"
              />
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              isDragOver
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-700 hover:border-gray-600"
            }`}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-300 mb-1">Drag & drop files here</p>
            <p className="text-gray-500 text-sm">
              Supports images and videos up to 100MB each
            </p>
          </div>

          {/* File Queue */}
          {fileStatuses.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-medium flex items-center gap-2">
                  File Queue
                  <Badge variant="outline">{fileStatuses.length}</Badge>
                </h3>
                <div className="flex gap-2">
                  {pendingCount > 0 && (
                    <Button
                      onClick={uploadAllFiles}
                      disabled={isUploading}
                      className="bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload {pendingCount}
                        </>
                      )}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setFileStatuses([])}
                    disabled={isUploading}
                    size="sm"
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {fileStatuses.map((fileStatus) => {
                  const Icon = getFileIcon(fileStatus.file);
                  return (
                    <div
                      key={fileStatus.name}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-6 w-6 text-gray-400 mt-1 flex-shrink-0" />

                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-white text-sm font-medium">
                                {fileStatus.name}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {(fileStatus.file.size / 1024 / 1024).toFixed(
                                  1
                                )}{" "}
                                MB
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon(fileStatus.status)}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(fileStatus.name)}
                                disabled={fileStatus.status === "uploading"}
                                className="h-6 w-6 p-0"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>

                          {fileStatus.status === "uploading" && (
                            <Progress
                              value={fileStatus.progress}
                              className="w-full h-1"
                            />
                          )}

                          {fileStatus.status === "error" &&
                            fileStatus.error && (
                              <p className="text-red-400 text-xs">
                                Error: {fileStatus.error}
                              </p>
                            )}

                          {fileStatus.status === "pending" && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <div>
                                <Input
                                  value={fileStatus.title}
                                  onChange={(e) =>
                                    updateFileStatus(fileStatus.name, {
                                      title: e.target.value,
                                    })
                                  }
                                  className="bg-gray-700 border-gray-600 text-white text-xs h-8"
                                  placeholder="Title *"
                                />
                              </div>
                              <div>
                                <Select
                                  value={fileStatus.category}
                                  onValueChange={(v) =>
                                    updateFileStatus(fileStatus.name, {
                                      category: v,
                                    })
                                  }
                                >
                                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white text-xs h-8">
                                    <SelectValue placeholder="Category *" />
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
                                <Input
                                  value={fileStatus.description}
                                  onChange={(e) =>
                                    updateFileStatus(fileStatus.name, {
                                      description: e.target.value,
                                    })
                                  }
                                  className="bg-gray-700 border-gray-600 text-white text-xs h-8"
                                  placeholder="Description"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
