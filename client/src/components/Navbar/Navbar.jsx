import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegUserCircle } from "react-icons/fa";
import { BiSearchAlt2 } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";

function Navbar() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("");
  const [listingType, setListingType] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navigate = useNavigate();

  const kazakhstanCities = [
    "Алматы",
    "Астана",
    "Шымкент",
    "Қарағанды",
    "Ақтөбе",
    "Атырау",
    "Павлодар",
    "Өскемен",
    "Тараз",
    "Қостанай",
    "Петропавл",
    "Ақтау",
    "Түркістан",
    "Теміртау",
    "Қызылорда",
    "Балқаш",
    "Рудный",
    "Жезқазған",
    "Сәтбаев",
    "Арқалық",
  ];

  // Apply filters to URL, preserving tab category unless listingType explicitly changed
  const applyFilters = (overrides = {}) => {
    const params = new URLSearchParams(window.location.search);

    const s = "search" in overrides ? overrides.search : search;
    const r = "region" in overrides ? overrides.region : region;
    const ci = "checkIn" in overrides ? overrides.checkIn : checkIn;
    const co = "checkOut" in overrides ? overrides.checkOut : checkOut;
    const rm = "rooms" in overrides ? overrides.rooms : rooms;

    s.trim() ? params.set("q", s.trim()) : params.delete("q");
    r ? params.set("region", r) : params.delete("region");
    ci ? params.set("checkIn", ci) : params.delete("checkIn");
    co ? params.set("checkOut", co) : params.delete("checkOut");
    rm ? params.set("rooms", rm) : params.delete("rooms");

    // Only touch category when listingType dropdown was explicitly changed
    if ("listingType" in overrides) {
      overrides.listingType
        ? params.set("category", overrides.listingType)
        : params.delete("category");
    }

    navigate(`/?${params.toString()}`);
  };

  const filterControls = (isMobile = false) => (
    <>
      <select
        className={`bg-transparent outline-none text-sm ${isMobile ? "border rounded-lg px-3 py-2 flex-1" : ""}`}
        value={region}
        onChange={(ev) => {
          setRegion(ev.target.value);
          applyFilters({ region: ev.target.value });
        }}
      >
        <option value="">Аймақ</option>
        {kazakhstanCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select
        className={`bg-transparent outline-none text-sm ${isMobile ? "border rounded-lg px-3 py-2 flex-1" : ""}`}
        value={listingType}
        onChange={(ev) => {
          setListingType(ev.target.value);
          applyFilters({ listingType: ev.target.value });
        }}
      >
        <option value="">Түрі</option>
        <option value="hotel">Қонақ үй</option>
        <option value="rent">Жалға алу</option>
        <option value="sale">Сатып алу</option>
      </select>
      <select
        className={`bg-transparent outline-none text-sm ${isMobile ? "border rounded-lg px-3 py-2 flex-1" : ""}`}
        value={rooms}
        onChange={(ev) => {
          setRooms(ev.target.value);
          applyFilters({ rooms: ev.target.value });
        }}
      >
        <option value="">Бөлме</option>
        <option value="1">1 бөлме</option>
        <option value="2">2 бөлме</option>
        <option value="3">3 бөлме</option>
        <option value="4">4 бөлме</option>
        <option value="5">5+ бөлме</option>
      </select>
      <input
        type="date"
        className={`bg-transparent outline-none text-sm ${isMobile ? "border rounded-lg px-3 py-2 flex-1" : ""}`}
        value={checkIn}
        onChange={(ev) => {
          setCheckIn(ev.target.value);
          applyFilters({ checkIn: ev.target.value });
        }}
      />
      <input
        type="date"
        className={`bg-transparent outline-none text-sm ${isMobile ? "border rounded-lg px-3 py-2 flex-1" : ""}`}
        value={checkOut}
        onChange={(ev) => {
          setCheckOut(ev.target.value);
          applyFilters({ checkOut: ev.target.value });
        }}
      />
      <input
        className={`bg-transparent outline-none text-sm ${isMobile ? "border rounded-lg px-3 py-2 flex-1" : "w-24"}`}
        placeholder="Іздестіру..."
        value={search}
        onChange={(ev) => setSearch(ev.target.value)}
        onKeyDown={(ev) => {
          if (ev.key === "Enter") {
            applyFilters({ search: search });
          }
        }}
      />
      <button
        onClick={() => applyFilters({ search: search })}
        className={`border rounded-3xl p-2 text-white ${isMobile ? "self-center" : ""}`}
        style={{ backgroundColor: "#2563EB" }}
        aria-label="Search"
      >
        <BiSearchAlt2 size={18} />
      </button>
    </>
  );

  return (
    <div>
      <div className="flex justify-between max-w-global mx-auto">
        <Link to={"/"} className="flex items-center gap-1">
          <h1 className="text-2xl font-bold" style={{ color: "#2563EB" }}>
            Qonaq
          </h1>
        </Link>
        {/* Desktop filters */}
        <div className="hidden md:flex items-center gap-2 border rounded-full px-4 py-1 shadow-md shadow-gray-200">
          {filterControls(false)}
        </div>
        {/* Mobile filter toggle + user menu */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden border rounded-3xl p-2"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            aria-label="Filters"
          >
            <IoFilterSharp size={22} />
          </button>
          <Link
            to={user ? "/account" : "/login"}
            aria-label="User"
            className="flex gap-3 border rounded-3xl py-2 px-5 shadow-md shadow-gray-100"
          >
            <RxHamburgerMenu size={24} />
            <FaRegUserCircle size={24} />
          </Link>
        </div>
      </div>
      {/* Mobile filters panel */}
      {mobileFiltersOpen && (
        <div className="md:hidden flex flex-wrap gap-2 mt-3 px-4 pb-3 border-b max-w-global mx-auto">
          {filterControls(true)}
        </div>
      )}
    </div>
  );
}

export default Navbar;
