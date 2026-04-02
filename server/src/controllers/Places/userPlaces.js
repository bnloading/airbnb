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

    if (!userId) {
      return res.status(401).json({ error: "User ID not found in token." });
    }

    const places = await Place.find({ owner: userId });
    res.json(places);
  } catch (error) {
    next(error);
  }
};

module.exports = userPlaces;
