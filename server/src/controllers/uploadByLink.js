const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");
const parentDirectory = path.resolve(__dirname, "../../");
const PATH_TO_UPLOADS = path.join(parentDirectory, "/assets/uploads/");

// Ensure uploads directory exists
if (!fs.existsSync(PATH_TO_UPLOADS)) {
  fs.mkdirSync(PATH_TO_UPLOADS, { recursive: true });
}

const uploadByLink = async (req, res, next) => {
  try {
    const { link } = req.body;

    if (!link) {
      throw new Error("Invalid URL format");
    }

    let newName = "photo" + Date.now() + ".jpg";

    await imageDownloader.image({
      url: link,
      dest: PATH_TO_UPLOADS + newName,
    });
    res.json(newName);
  } catch (error) {
    console.log("Error downloading image", error);
    next(error);
  }
};

module.exports = uploadByLink;
