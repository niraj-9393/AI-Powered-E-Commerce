import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";

// define return type
const uploadOnCloudinar = async (
  filePath: string
): Promise<string | null> => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });

  try {
    if (!filePath) return null;

    const uploadResult: UploadApiResponse =
      await cloudinary.uploader.upload(filePath);

    fs.unlinkSync(filePath); 

    return uploadResult.secure_url;
  } catch (error) {
    fs.unlinkSync(filePath); 
    console.log(error);
    return null;
  }
};

export default uploadOnCloudinar;