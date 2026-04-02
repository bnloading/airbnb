import React, { useState, useEffect } from "react";
import * as api from "../../api/requester";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import config from "../../config";

const URL_TO_UPLOADS = config.UPLOADS_URL;

function Home() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const location = useLocation();
  const navigate = useNavigate();

  async function getPlaces(query) {
    try {
      const response = await api.getPlaces(query);
      setPlaces(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    const region = params.get("region");
    const checkIn = params.get("checkIn");
    const checkOut = params.get("checkOut");
    const category = params.get("category");
    const rooms = params.get("rooms");

    if (category) {
      setActiveTab(category);
    } else {
      setActiveTab("all");
    }

    const searchParams = {
      q: query,
      region,
      checkIn,
      checkOut,
      category,
      rooms,
    };
    getPlaces(searchParams);
  }, [location.search]);

  function switchTab(tab) {
    setActiveTab(tab);
    const params = new URLSearchParams(location.search);
    if (tab === "all") {
      params.delete("category");
    } else {
      params.set("category", tab);
    }
    navigate(`/?${params.toString()}`);
  }

  function getPriceLabel(place) {
    if (place.category === "sale") return "бағасы";
    if (place.category === "rent") {
      return place.rentPeriod === "monthly" ? "айына" : "күніне";
    }
    return "түн";
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center mt-32">
        <ClipLoader className="mb-4" />
        <span>Жүктелуде...</span>
      </div>
    );
  }

  const tabStyle = (tab) => ({
    backgroundColor: activeTab === tab ? "#2563EB" : "transparent",
    color: activeTab === tab ? "white" : "#374151",
  });

  return (
    <div className="max-w-global h-screen mx-auto mt-8 mb-14">
      <div className="flex gap-2 mb-8 justify-center flex-wrap">
        <button
          className="px-5 py-2 rounded-full border font-medium text-sm transition"
          style={tabStyle("all")}
          onClick={() => switchTab("all")}
        >
          Барлығы
        </button>
        <button
          className="px-5 py-2 rounded-full border font-medium text-sm transition"
          style={tabStyle("hotel")}
          onClick={() => switchTab("hotel")}
        >
          Қонақ үйлер
        </button>
        <button
          className="px-5 py-2 rounded-full border font-medium text-sm transition"
          style={tabStyle("apartments")}
          onClick={() => switchTab("apartments")}
        >
          Үйлер / Пәтерлер
        </button>
      </div>
      <div className="grid gap-x-5 gap-y-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/places/" + place._id}
              key={place._id}
              className="rounded-2xl"
            >
              <img
                src={URL_TO_UPLOADS + place.photos[0]}
                className="rounded-2xl object-cover aspect-square"
                alt=""
              />
              <h2 className="text-lg font-semibold mt-2 truncate">
                {place.title}
              </h2>
              <p className="text-sm text-gray-400 truncate">{place.address}</p>
              {(place.rooms || place.area) && (
                <p className="text-sm text-gray-500">
                  {place.rooms ? `${place.rooms} бөлме` : ""}
                  {place.rooms && place.area ? " · " : ""}
                  {place.area ? `${place.area} м²` : ""}
                </p>
              )}
              <div className="flex items-baseline gap-1">
                <p className="font-semibold">
                  {place.price?.toLocaleString()} ₸
                </p>
                <p className="text-sm">{getPriceLabel(place)}</p>
              </div>
              {place.category && (
                <span
                  className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full"
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
              )}
            </Link>
          ))}
      </div>
      {places.length === 0 && (
        <div className="flex justify-center mt-12">
          <h2 className="text-xl text-gray-400">Нәтиже табылмады</h2>
        </div>
      )}
    </div>
  );
}

export default Home;
