import React, { useEffect, useState, useContext } from "react";
import {
  differenceInCalendarDays,
  format,
  eachDayOfInterval,
  parseISO,
} from "date-fns";
import { useNavigate } from "react-router-dom";
import * as api from "../../api/requester";
import { UserContext } from "../../context/UserContext";

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [allInputsEmpty, setAllInputsEmpty] = useState(true);
  const [bookedDates, setBookedDates] = useState([]);
  const [dateConflict, setDateConflict] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (place._id) {
      api.getPlaceBookings(place._id).then((bookings) => {
        const dates = [];
        bookings.forEach((b) => {
          const days = eachDayOfInterval({
            start: parseISO(b.checkIn),
            end: parseISO(b.checkOut),
          });
          days.forEach((d) => dates.push(format(d, "yyyy-MM-dd")));
        });
        setBookedDates([...new Set(dates)]);
      });
    }
  }, [place._id]);

  let numberOfNights = 0;

  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn),
    );
  }

  useEffect(() => {
    if (checkIn && checkOut && numberOfNights > 0) {
      const selectedDays = eachDayOfInterval({
        start: parseISO(checkIn),
        end: parseISO(checkOut),
      }).map((d) => format(d, "yyyy-MM-dd"));
      const conflict = selectedDays.some((d) => bookedDates.includes(d));
      setDateConflict(conflict);
    } else {
      setDateConflict(false);
    }
  }, [checkIn, checkOut, bookedDates]);

  let totalSum = numberOfNights * place.price;
  const displaySum = numberOfNights > 0 && `${totalSum} ₸`;

  const data = {
    checkIn,
    checkOut,
    guests,
    name,
    phone,
    price: numberOfNights * place.price,
  };

  async function bookingPlace() {
    try {
      const response = await api.bookPlace(place._id, data);
      if (response && response._id) {
        alert("Брондау сәтті жасалды!");
        navigate("/account/bookings");
      } else {
        alert("Қате: Брондау жасалмады. Қайталап көріңіз.");
      }
    } catch (error) {
      alert("Қате: Брондау жасалмады. Қайталап көріңіз.");
    }
  }

  useEffect(() => {
    const areInputsEmpty = !checkIn && !checkOut && !guests && !name && !phone;

    setAllInputsEmpty(areInputsEmpty);
  }, [checkIn, checkOut, guests, name, phone]);

  return (
    <>
      <div className="flex items-center mt-8 gap-1">
        <h2 className="text-lg font-semibold">
          {place.price?.toLocaleString()} ₸
        </h2>
        <p>
          {place.category === "rent" && place.rentPeriod === "monthly"
            ? "айына"
            : place.category === "rent"
              ? "күніне"
              : "түнге"}
        </p>
      </div>

      {bookedDates.length > 0 && (
        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-300 rounded-xl">
          <p className="text-sm font-semibold text-yellow-800 mb-1">
            Бос емес күндер:
          </p>
          <div className="flex flex-wrap gap-1">
            {[...new Set(bookedDates)].sort().map((d) => (
              <span
                key={d}
                className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {dateConflict && (
        <div className="mt-2 p-2 bg-red-50 border border-red-300 rounded-xl">
          <p className="text-sm text-red-700 font-semibold">
            ⚠ Таңдалған күндер бос емес. Басқа күндерді таңдаңыз.
          </p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row mt-4">
        <div className="flex flex-col w-full gap-1">
          <p className="text-sm">Кіру</p>
          <input
            className="border w-full h-12 px-2 rounded-2xl"
            type="date"
            value={checkIn}
            onChange={(ev) => setCheckIn(ev.target.value)}
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <p className="text-sm">Шығу</p>
          <input
            className="border w-full h-12 px-2 rounded-2xl"
            type="date"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
          />
        </div>
      </div>
      <div className="mt-2">
        <p className="text-sm">Қонақтар</p>
        <input
          placeholder="1 қонақ"
          type="number"
          value={guests}
          onChange={(ev) => setGuests(ev.target.value)}
        />
      </div>
      {numberOfNights > 0 && (
        <div className="mb-8">
          <p className="text-sm">Сіздің атыңыз</p>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <p className="text-sm">Сіздің телефон нөміріңіз</p>
          <input
            type="number"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
      )}
      {user ? (
        <>
          <button
            disabled={allInputsEmpty || dateConflict}
            onClick={bookingPlace}
            className="primary mt-2"
          >
            Брондау {displaySum}
          </button>
          <p className="text-sm text-gray-500 text-center mt-2 mb-8">
            Сізге әлі ешқандай төлем жасалмайды.
          </p>
        </>
      ) : (
        <div className="flex justify-center p-6">
          <h1 className="text-center text-lg font-semibold">
            Бұл орынды брондау үшін сіз кіруіңіз керек.
          </h1>
        </div>
      )}
    </>
  );
}

export default BookingWidget;
