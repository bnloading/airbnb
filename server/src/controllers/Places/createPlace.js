const Place = require("../../models/Place");
const jwt = require("jsonwebtoken");

const createPlace = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const {
      title,
      address,
      uploadPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      category,
      rooms,
      area,
      rentPeriod,
    } = req.body;

    if (!token) {
      throw new Error("Authorization token not found.");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const isAdmin = decodedToken.isAdmin;

    if (!userId) {
      throw new Error("User ID not found in token.");
    }

    if (!isAdmin) {
      const err = new Error("Only admin users can create new places.");
      err.statusCode = 403;
      throw err;
    }

    const newPlace = await Place.create({
      owner: userId,
      title,
      address,
      photos: uploadPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      category,
      rooms,
      area,
      rentPeriod,
    });

    res.json(newPlace);
  } catch (error) {
    next(error);
  }
};

module.exports = createPlace;
