const Place = require("../../models/Place");
const Booking = require("../../models/Booking");

const places = async (req, res, next) => {
  try {
    const { q, region, checkIn, checkOut, category, rooms } = req.query;

    let query = {};

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: "i" } },
        { address: { $regex: q, $options: "i" } },
      ];
    }

    if (region) {
      query.address = { $regex: region, $options: "i" };
    }

    if (category) {
      if (category === "apartments") {
        query.category = { $in: ["rent", "sale"] };
      } else {
        query.category = category;
      }
    }

    if (rooms) {
      query.rooms = Number(rooms);
    }

    let places = await Place.find(query).exec();

    if (checkIn && checkOut) {
      // Filter places that are available for the dates
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const availablePlaces = [];
      for (const place of places) {
        const bookings = await Booking.find({
          place: place._id,
          $or: [
            { checkIn: { $lt: checkOutDate, $gte: checkInDate } },
            { checkOut: { $gt: checkInDate, $lte: checkOutDate } },
            {
              checkIn: { $lte: checkInDate },
              checkOut: { $gte: checkOutDate },
            },
          ],
        });

        if (bookings.length === 0) {
          availablePlaces.push(place);
        }
      }
      places = availablePlaces;
    }

    res.json(places);
  } catch (error) {
    next(error);
  }
};

module.exports = places;
