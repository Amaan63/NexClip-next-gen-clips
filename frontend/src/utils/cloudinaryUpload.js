// src/utils/uploadToCloudinary.js
import axios from "axios";

export const uploadToCloudinary = async (file, folder = "") => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary config missing in .env");
  }

  let resourceType = "auto";
  if (file.type.startsWith("image/")) {
    resourceType = "image";
  } else if (file.type.startsWith("video/")) {
    resourceType = "video";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  if (folder) {
    formData.append("folder", folder); // 👈 put file inside folder
  }

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return {
      url: res.data.secure_url,
      publicId: res.data.public_id,
    };
  } catch (err) {
    throw new Error(
      err.response?.data?.error?.message || "Cloudinary upload failed"
    );
  }
};
