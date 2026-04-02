import React, { useState } from "react";
import BookingWidget from "./BookingWidget";

function PlacePageDetails({ place }) {
  return (
    <div className="flex flex-col gap-6  md:flex-row md:gap-16 mt-8">
      <div className="w-full md:w-[55%]">
        <div className="border-t-2 mb-6" />
        <div className="flex items-center gap-2 mb-4">
          <span
            className="inline-block text-sm px-3 py-1 rounded-full font-medium"
            style={{
              backgroundColor:
                place.category === "hotel"
                  ? "#DBEAFE"
                  : place.category === "rent"
                    ? "#D1FAE5"
                    : "#FEF3C7",
              color:
                place.category === "hotel"
                  ? "#1E40AF"
                  : place.category === "rent"
                    ? "#065F46"
                    : "#92400E",
            }}
          >
            {place.category === "hotel"
              ? "Қонақ үй"
              : place.category === "rent"
                ? "Жалға"
                : "Сатылым"}
          </span>
          {place.rooms && (
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
              {place.rooms} бөлме
            </span>
          )}
          {place.area && (
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
              {place.area} м²
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-2">Сипаттама</h2>
        <p>{place.description}</p>
        {place.category !== "sale" && place.category !== "rent" && (
          <div className="mt-6">
            <p>Кіру: {place.checkIn}</p>
            <p>Шығу: {place.checkOut}</p>
            <p>Максимум қонақтар: {place.maxGuests}</p>
          </div>
        )}
        <div className="border-t-2 mt-6" />
        <h2 className="mt-8 text-xl font-semibold">Орын не ұсынады</h2>
        <div className="grid grid-cols-2 mt-2 gap-1">
          {place.perks.map((perk) => (
            <p key={perk}>{perk}</p>
          ))}
        </div>
        <div className="border-t-2 mt-6 mb-6" />
        <h2 className="text-xl font-semibold">Қосымша ақпарат</h2>
        <p className="mt-2">{place.extraInfo}</p>
        <div className="border-t-2 mt-6 mb-6" />
      </div>
      <div className="border rounded-2xl shadow-lg shadow-gray-300 w-full md:w-[45%] md:h-[30%] px-6 mb-8">
        {place.category === "hotel" ? (
          <BookingWidget place={place} />
        ) : (
          <div className="py-8 text-center">
            <h2 className="text-2xl font-bold">
              {place.price?.toLocaleString()} ₸
            </h2>
            <p className="text-gray-500 mt-1">
              {place.category === "sale"
                ? "Сату бағасы"
                : place.rentPeriod === "monthly"
                  ? "Айына"
                  : "Күніне"}
            </p>
            {place.rooms && (
              <p className="mt-2 text-gray-600">
                {place.rooms} бөлме · {place.area} м²
              </p>
            )}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-gray-700">
                {place.category === "sale"
                  ? "Сатып алу үшін бізбен байланысыңыз:"
                  : "Жалға алу үшін бізбен байланысыңыз:"}
              </p>
              <p className="font-semibold mt-1">+7 (777) 123-45-67</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlacePageDetails;
