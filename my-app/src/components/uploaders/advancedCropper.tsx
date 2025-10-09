
import React, { useRef, useState } from "react";
import { Cropper, type CropperRef, CircleStencil } from "react-advanced-cropper";
import 'react-advanced-cropper/dist/style.css';

interface CroppedImageUploaderProps {
    onImageCropped: (file: File) => void;
    round?: boolean;
}

const CroppedImageUploader: React.FC<CroppedImageUploaderProps> = ({ onImageCropped, round=false }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null); // full image
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null); // for preview
    const cropperRef = useRef<CropperRef>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageSrc(reader.result as string);
                setCroppedImageUrl(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        const canvas = cropperRef.current?.getCanvas();
        if (canvas) {
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], "cropped-image.jpg", { type: blob.type });
                    onImageCropped(file);
                    const previewUrl = URL.createObjectURL(blob);
                    setCroppedImageUrl(previewUrl);
                    setImageSrc(null);
                }
            }, 'image/jpeg');
        }
    };

    return (
        <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />

            {imageSrc && !croppedImageUrl && (
                <div>
                    <div className="mb-2">
                        <Cropper
                            ref={cropperRef}
                            src={imageSrc}
                            stencilComponent={round ? CircleStencil : undefined}
                            stencilProps={{ aspectRatio: 1 }}
                            className="rounded border"
                            style={{ height: 300, width: "100%" }}
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleCrop}
                        className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Crop & Use Image
                    </button>
                </div>
            )}

            {croppedImageUrl && (
                <div className="mt-4 flex justify-center">
                    <img
                        src={croppedImageUrl}
                        alt="Cropped preview"
                        className="w-32 h-32 rounded-full object-cover border-2 border-gray-300 shadow"
                    />
                </div>
            )}
        </div>
    );
};

export default CroppedImageUploader;
