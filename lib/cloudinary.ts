export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "tanxmis"
  );

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dqfjggcju";

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error("Upload failed");
  }

  return res.json();
}

// Reusable progress-tracking upload function using native XMLHttpRequest
export function uploadImageWithProgress(
  file: File,
  onProgress: (progress: number) => void
): Promise<{ secure_url: string; public_id?: string }> {
  return new Promise((resolve, reject) => {
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dqfjggcju";
    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "tanxmis";

    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    );

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            secure_url: response.secure_url,
            public_id: response.public_id,
          });
        } catch (e) {
          fallbackUpload(file, onProgress).then(resolve).catch(reject);
        }
      } else {
        fallbackUpload(file, onProgress).then(resolve).catch(reject);
      }
    };

    xhr.onerror = () => {
      fallbackUpload(file, onProgress).then(resolve).catch(reject);
    };

    xhr.send(formData);
  });
}

async function fallbackUpload(
  file: File,
  onProgress: (progress: number) => void
): Promise<{ secure_url: string; public_id?: string }> {
  try {
    onProgress(40);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (!res.ok || !data.url) {
      throw new Error(data.error || "Failed to upload image.");
    }
    onProgress(100);
    return { secure_url: data.url, public_id: data.public_id };
  } catch (err: any) {
    throw new Error(err.message || "Upload failed");
  }
}
