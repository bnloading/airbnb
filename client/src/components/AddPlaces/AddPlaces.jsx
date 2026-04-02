import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import * as api from "../../api/requester";
import { UserContext } from "../../context/userContext";
import AccountNav from "../Account/AccountNav";
import UploadPhotos from "./UploadPhotos";
import Perks from "./Perks";

function AddPlaces() {
  const { user, ready } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [uploadPhotos, setUploadPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [price, setPrice] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [category, setCategory] = useState("hotel");
  const [rooms, setRooms] = useState("");
  const [area, setArea] = useState("");
  const [rentPeriod, setRentPeriod] = useState("");

  const kazakhstanCities = [
    "Алматы, Қазақстан",
    "Астана, Қазақстан",
    "Шымкент, Қазақстан",
    "Қарағанды, Қазақстан",
    "Ақтөбе, Қазақстан",
    "Атырау, Қазақстан",
    "Павлодар, Қазақстан",
    "Өскемен, Қазақстан",
    "Тараз, Қазақстан",
    "Қостанай, Қазақстан",
    "Петропавл, Қазақстан",
    "Ақтау, Қазақстан",
    "Түркістан, Қазақстан",
    "Теміртау, Қазақстан",
    "Қызылорда, Қазақстан",
    "Балқаш, Қазақстан",
    "Рудный, Қазақстан",
    "Жезқазған, Қазақстан",
    "Сәтбаев, Қазақстан",
    "Арқалық, Қазақстан",
  ];

  const navigate = useNavigate();
  const { id } = useParams();

  async function getPlaceDetails() {
    const response = await api.getPlace(id);
    const data = await response.json();
    setTitle(data.title);
    setAddress(data.address);
    setUploadPhotos(data.photos);
    setDescription(data.description);
    setPerks(data.perks);
    setExtraInfo(data.extraInfo);
    setCheckIn(data.checkIn);
    setCheckout(data.checkOut);
    setMaxGuests(data.maxGuests);
    setPrice(data.price);
    setCategory(data.category || "hotel");
    setRooms(data.rooms || "");
    setArea(data.area || "");
    setRentPeriod(data.rentPeriod || "");
  }

  useEffect(() => {
    if (!id) {
      return;
    }

    getPlaceDetails();
  }, [id]);

  useEffect(() => {
    const areInputsEmpty =
      !title &&
      !address &&
      !uploadPhotos.length &&
      !description &&
      !perks &&
      !extraInfo &&
      !checkIn &&
      !checkOut &&
      !maxGuests &&
      !price &&
      !rooms &&
      !area;

    setIsEmpty(areInputsEmpty);
  }, [
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
    rooms,
    area,
  ]);

  const data = {
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
  };

  async function addPlace(ev) {
    ev.preventDefault();

    try {
      if (id) {
        const response = await api.updatePlace(id, { ...data });
        navigate("/");
        return response;
      } else {
        const response = await api.createPlace({ ...data });
        navigate("/");
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function removePlace(ev) {
    ev.preventDefault();

    try {
      await api.deletePlace(id);
      navigate("/account/places");
    } catch (error) {
      console.log(error);
    }
  }

  const inputHeader = (text) => (
    <h2 className="text-2xl font-semibold mt-8">{text}</h2>
  );

  const inputDescription = (description) => (
    <p className="text-sm text-gray-400">{description}</p>
  );

  const preInput = (header, description) => (
    <>
      {inputHeader(header)}
      {inputDescription(description)}
    </>
  );

  if (!ready) {
    return null;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <AccountNav />
      <div className="max-w-global mx-auto flex flex-col items-center justify-center mb-8">
        <form action="" method="POST" className="max-w-4xl w-full">
          {preInput(
            "Тақырып",
            "Сіздің орныңыздың тақырыбы. Қарапайым және қысқа болуы керек",
          )}
          <input
            type="text"
            placeholder="Тақырып, мысалы: Менің керемет орным..."
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          {preInput("Санат", "Жарнаманың түрін таңдаңыз")}
          <select
            className="w-full border my-2 py-2 px-3 rounded-xl"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option value="hotel">Қонақ үй</option>
            <option value="rent">Жалға беру</option>
            <option value="sale">Сатылым</option>
          </select>
          {(category === "rent" || category === "sale") && (
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <p className="text-sm text-gray-400">Бөлмелер саны</p>
                <input
                  type="number"
                  placeholder="2"
                  value={rooms}
                  onChange={(ev) => setRooms(ev.target.value)}
                />
              </div>
              <div>
                <p className="text-sm text-gray-400">Ауданы (м²)</p>
                <input
                  type="number"
                  placeholder="65"
                  value={area}
                  onChange={(ev) => setArea(ev.target.value)}
                />
              </div>
            </div>
          )}
          {category === "rent" && (
            <div className="mt-2">
              <p className="text-sm text-gray-400">Жалға беру мерзімі</p>
              <select
                className="w-full border my-2 py-2 px-3 rounded-xl"
                value={rentPeriod}
                onChange={(ev) => setRentPeriod(ev.target.value)}
              >
                <option value="daily">Күніне</option>
                <option value="monthly">Айына</option>
              </select>
            </div>
          )}
          {preInput("Мекенжай", "Қаланы таңдаңыз")}
          <select
            className="w-full border my-2 py-2 px-3 rounded-xl"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          >
            <option value="">Қаланы таңдаңыз...</option>
            {kazakhstanCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {preInput(
            "Сілтеме бойынша фото жүктеу",
            "Фото URL мекенжайын қойыңыз",
          )}
          <UploadPhotos
            uploadPhotos={uploadPhotos}
            setUploadPhotos={setUploadPhotos}
          />
          {preInput("Сипаттама", "Сіздің орныңызға сипаттама қосыңыз...")}
          <textarea
            className="h-32"
            type="text"
            placeholder="Сипаттама қосыңыз..."
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          {preInput(
            "Артықшылықтар",
            "Сіздің орныңызға тиесілі артықшылықтарды қосыңыз",
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
            <Perks perks={perks} setPerks={setPerks} />
          </div>
          {preInput(
            "Қосымша ақпарат",
            "Сіздің орныңызға қосымша ақпарат қосыңыз",
          )}
          <textarea
            className="h-28"
            type="text"
            placeholder="Қосымша ақпарат қосыңыз..."
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          {preInput("Кіру және шығу", "Мұнда даталарды қосыңыз")}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="mt-2">
              <p>Кіру</p>
              <input
                type="text"
                placeholder="13:00"
                className="border"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div className="mt-2">
              <p>Шығу</p>
              <input
                type="text"
                placeholder="10:00"
                className="border"
                value={checkOut}
                onChange={(ev) => setCheckout(ev.target.value)}
              />
            </div>
            <div className="mt-2">
              <p>Максимум қонақтар</p>
              <input
                type="text"
                placeholder="5"
                className="border"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
            <div className="mt-2">
              <p>Баға</p>
              <input
                type="text"
                placeholder={
                  category === "sale"
                    ? "15000000 ₸"
                    : category === "rent"
                      ? "150000 ₸"
                      : "25000 ₸"
                }
                className="border"
                value={price}
                onChange={(ev) => setPrice(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <button
              disabled={isEmpty}
              onClick={addPlace}
              className="max-w-md primary mt-10 mb-2"
            >
              Сақтау
            </button>
            {id ? (
              <button
                onClick={(ev) => removePlace(ev)}
                className="primary max-w-md primary"
              >
                Жою
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPlaces;
