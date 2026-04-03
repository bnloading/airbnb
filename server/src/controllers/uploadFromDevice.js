const fs = require("fs");
const path = require("path");

const parentDirectory = path.resolve(__dirname, "../../");
const PATH_TO_UPLOADS =
  path.join(parentDirectory, "assets", "uploads") + path.sep;

// Ensure uploads directory exists
if (!fs.existsSync(PATH_TO_UPLOADS)) {
  fs.mkdirSync(PATH_TO_UPLOADS, { recursive: true });
}

const uploadPhotoFromDevice = async (req, res, next) => {
  try {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path: filePath, originalname } = req.files[i];
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      const newPath = filePath + "." + extension;
      fs.renameSync(filePath, newPath);
      // Extract just the filename from the full path
      uploadedFiles.push(path.basename(newPath));
    }
    res.json(uploadedFiles);
  } catch (error) {
    next(error);
  }
};

module.exports = uploadPhotoFromDevice;
