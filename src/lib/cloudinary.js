import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

const cld_name = process.env.CLOUDINARY_CLOUD_NAME;
const cld_key = process.env.CLOUDINARY_API_KEY;
const cld_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
    cloud_name: cld_name,
    api_key: cld_key,
    api_secret: cld_secret,
});

export default cloudinary;