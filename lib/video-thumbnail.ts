/**
 * Video thumbnail generation utilities
 * Generates thumbnail images from video files for gallery display
 */

/**
 * Generates a thumbnail image from a video file
 * @param videoFile - The video file to generate thumbnail from
 * @param seekTime - Time in seconds to capture the frame (default: 1 second)
 * @returns Promise<File> - The generated thumbnail as a File object
 */
export async function generateVideoThumbnail(
  videoFile: File,
  seekTime: number = 1
): Promise<File> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Could not get canvas context"));
      return;
    }

    video.preload = "metadata";
    video.muted = true;

    video.onloadedmetadata = () => {
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Seek to the desired time (or 5th second if video is long enough)
      const targetTime = Math.min(seekTime, video.duration - 0.1);
      video.currentTime = targetTime;
    };

    video.onseeked = () => {
      try {
        // Draw the current frame to canvas
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Failed to generate thumbnail blob"));
              return;
            }

            // Create File object from blob
            const thumbnailFile = new File(
              [blob],
              `thumbnail-${videoFile.name.replace(/\.[^/.]+$/, "")}.jpg`,
              { type: "image/jpeg" }
            );

            resolve(thumbnailFile);
          },
          "image/jpeg",
          0.8
        );
      } catch (error) {
        reject(error);
      } finally {
        // Clean up
        URL.revokeObjectURL(video.src);
      }
    };

    video.onerror = () => {
      reject(new Error("Error loading video for thumbnail generation"));
    };

    // Load the video
    video.src = URL.createObjectURL(videoFile);
  });
}

/**
 * Checks if a file is a video file
 * @param file - File to check
 * @returns boolean - True if file is a video
 */
export function isVideoFile(file: File): boolean {
  return file.type.startsWith("video/");
}

/**
 * Generates thumbnail on the server side using a different approach
 * This is a placeholder for server-side thumbnail generation
 * In a real implementation, you might use ffmpeg or similar
 */
export async function generateThumbnailServerSide(
  videoBuffer: Buffer,
  outputPath: string
): Promise<string> {
  // This would require server-side video processing
  // For now, we'll use client-side generation
  throw new Error(
    "Server-side thumbnail generation not implemented. Use client-side generation."
  );
}

