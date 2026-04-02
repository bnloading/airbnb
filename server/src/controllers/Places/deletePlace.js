const Place = require("../../models/Place");
const fs = require("fs");
const path = require("path");

const deletePlace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Authorization token not found.");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const isAdmin = decodedToken.isAdmin;

    if (!isAdmin) {
      const err = new Error("Only admin users can delete places.");
      err.statusCode = 403;
      throw err;
    }

    const place = await Place.findById(id);

    if (!place) {
      throw new Error("Place is not found.");
    }

    const delPlace = await Place.findByIdAndDelete(id);

    place.photos.forEach((filename) => {
      const filePath = path.join(
        __dirname,
        "../../../assets/uploads",
        filename,
      );
      fs.unlinkSync(filePath);
    });
    res.json(delPlace);
  } catch (error) {
    next(error);
  }
};

module.exports = deletePlace;
