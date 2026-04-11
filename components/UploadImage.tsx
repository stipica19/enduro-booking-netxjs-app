"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

type UploadImageProps = {
  onUploaded: (url: string) => void;
};

export default function UploadImage({ onUploaded }: UploadImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleUpload = async (result: any) => {
    const uploadedUrl = result?.info?.secure_url;
    const publicId = result?.info?.public_id;

    if (!uploadedUrl || !publicId) {
      setStatus("❌ Upload nije uspio, nedostaju podaci.");
      return;
    }

    setImageUrl(uploadedUrl);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: uploadedUrl, public_id: publicId }),
      });

      if (res.ok) {
        setStatus("✅ Slika spremljena u bazu.");
      } else {
        setStatus("❌ Greška pri spremanju u bazu.");
      }
    } catch {
      setStatus("❌ Server error.");
    }
  };

  return (
    <div className="p-4 border rounded-md text-center">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <button
            onClick={() => open?.()}
            className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
            type="button"
          >
            Upload sliku 📷
          </button>
        )}
      </CldUploadWidget>

      {status && <p className="mt-4 text-sm text-center">{status}</p>}
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="mt-4 rounded w-full max-w-xs mx-auto"
        />
      )}
    </div>
  );
}
