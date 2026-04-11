"use client";
import UploadImage from "@/components/UploadImage";

export default function UploadPage() {
  const handleUploaded = (_url: string) => {
    // callback za UploadImage komponentu
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Slika</h1>
      <UploadImage onUploaded={handleUploaded} />
    </div>
  );
}
