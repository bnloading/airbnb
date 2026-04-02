const Booking = require("../../models/Booking");

async function getPlaceBookings(req, res) {
  const { id } = req.params;
  const bookings = await Booking.find({ place: id }, "checkIn checkOut");
  res.json(bookings);
}

module.exports = getPlaceBookings;
