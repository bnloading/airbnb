const Place = require("../../models/Place");
const jwt = require("jsonwebtoken");

const updatePlace = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const { id } = req.params;
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

    const place = await Place.findById(id);

    if (!place) {
      throw new Error("Place is not found.");
    }

    if (!isAdmin && userId !== place.owner.toString()) {
      const err = new Error("You are not authorized to edit this place.");
      err.statusCode = 403;
      throw err;
    }

    place.set({
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

    await place.save();
    res.json(place);
  } catch (error) {
    next(error);
  }
};

module.exports = updatePlace;
