import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});

export const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return console.log("file path is required");
    const response = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });
    console.log(response.url);
    fs.unlinkSync(localFilepath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(localFilepath);
    return null;
  }
};
