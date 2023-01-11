// Using multer MemoryStorage to store files in memory as Buffer to get request body of multipart/formdata
import multer from "multer";
var upload = multer({ storage: multer.memoryStorage() });
export default upload;
