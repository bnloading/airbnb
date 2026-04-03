const Place = require("../../models/Place");
const jwt = require("jsonwebtoken");

const userPlaces = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ error: "Authorization token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.id;
    const isAdmin = decodedToken.isAdmin;

    if (!userId) {
      return res.status(401).json({ error: "User ID not found in token." });
    }

    // Admin sees all places, regular user sees only their own
    const places = isAdmin
      ? await Place.find({})
      : await Place.find({ owner: userId });
    res.json(places);
  } catch (error) {
    next(error);
  }
};

module.exports = userPlaces;
