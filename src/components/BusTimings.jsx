// components/BusTimings.jsx

import React, { useState, useEffect, useMemo } from "react";
import {
  Bus,
  Clock,
  MapPin,
  ArrowLeft,
  Search,
  ArrowRight,
  Tag,
  Hourglass,
  Filter,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BusTimings = () => {
  const [busRoutes, setBusRoutes] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [fromLocation, setFromLocation] = useState("all");
  const [toLocation, setToLocation] = useState("all");
  const [selectedTime, setSelectedTime] = useState("all");

  // Fetch & normalize
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.jsonbin.io/v3/b/68781e50c7f29633ab29f43a/latest",
          {
            headers: {
              "X-Master-Key":
                "$2a$10$eyU92iI4Y9sDxFbxhxmdRecULv6HiZygpurEbxuXHWDjrbh4u9Afq",
            },
          }
        );
        const { record } = await res.json();
        const data = record.data ?? record;

        const normalized = data.map((r) => ({
          ...r,
          timings:
            typeof r.timings === "string"
              ? r.timings.split(/[,;]\s*/).map((t) => t.trim())
              : Array.isArray(r.timings)
              ? r.timings
              : [],
        }));

        setBusRoutes(normalized);
      } catch (err) {
        console.error("Error fetching bus data:", err);
      }
    })();
  }, []);

  // Live clock
  useEffect(() => {
    const id = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeTo24Hour = (timeStr) => {
    const [hm, mod] = timeStr.split(" ");
    let [h, m] = hm.split(":").map((n) => parseInt(n, 10));
    if (mod === "PM" && h !== 12) h += 12;
    if (mod === "AM" && h === 12) h = 0;
    return h + m / 60;
  };

  // Dropdown options
  const fromDropdownOptions = useMemo(() => {
    if (toLocation === "all")
      return ["all", ...new Set(busRoutes.map((r) => r.from))];
    if (toLocation === "AJCE Campus")
      return [
        "all",
        ...new Set(
          busRoutes.filter((r) => r.to === "AJCE Campus").map((r) => r.from)
        ),
      ];
    return ["all", "AJCE Campus"];
  }, [toLocation, busRoutes]);

  const toDropdownOptions = useMemo(() => {
    if (fromLocation === "all")
      return ["all", ...new Set(busRoutes.map((r) => r.to))];
    if (fromLocation === "AJCE Campus")
      return [
        "all",
        ...new Set(
          busRoutes.filter((r) => r.from === "AJCE Campus").map((r) => r.to)
        ),
      ];
    return ["all", "AJCE Campus"];
  }, [fromLocation, busRoutes]);

  useEffect(() => {
    if (!toDropdownOptions.includes(toLocation)) setToLocation("all");
  }, [fromLocation, toDropdownOptions, toLocation]);
  useEffect(() => {
    if (!fromDropdownOptions.includes(fromLocation)) setFromLocation("all");
  }, [toLocation, fromDropdownOptions, fromLocation]);

  // Filter logic
  const filteredRoutes = useMemo(
    () =>
      busRoutes.filter((route) => {
        const fromMatch = fromLocation === "all" || route.from === fromLocation;
        const toMatch = toLocation === "all" || route.to === toLocation;
        const timeMatch =
          selectedTime === "all" ||
          route.timings.some((t) => {
            const hr = timeTo24Hour(t);
            if (selectedTime === "morning") return hr >= 6 && hr < 9;
            if (selectedTime === "forenoon") return hr >= 9 && hr < 12;
            if (selectedTime === "afternoon") return hr >= 12 && hr < 16;
            if (selectedTime === "evening") return hr >= 16 && hr < 19;
            return false;
          });
        const searchMatch =
          !searchTerm ||
          route.bus.toLowerCase().includes(searchTerm.toLowerCase());
        return fromMatch && toMatch && timeMatch && searchMatch;
      }),
    [busRoutes, searchTerm, fromLocation, toLocation, selectedTime]
  );

  const resetFilters = () => {
    setFromLocation("all");
    setToLocation("all");
    setSelectedTime("all");
    setSearchTerm("");
  };

  // Motion variants
  const containerVariants = {
    // hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    // hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center text-blue-700 hover:text-blue-800"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 text-blue-700" />
            <span>
              Live Time:&nbsp;
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
              })}
            </span>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Bus Timings & Routes
          </h3>
          <p className="text-lg text-gray-600">
            Find the next bus for your journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-5 rounded-xl shadow-md border border-gray-200 mb-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* From */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <select
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {fromDropdownOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "Any Location" : loc}
                  </option>
                ))}
              </select>
            </div>
            {/* To */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <select
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {toDropdownOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "all" ? "Any Location" : loc}
                  </option>
                ))}
              </select>
            </div>
            {/* Time */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Day</option>
                <option value="morning">Morning (6-9 AM)</option>
                <option value="forenoon">Forenoon (9-12 PM)</option>
                <option value="afternoon">Afternoon (12-4 PM)</option>
                <option value="evening">Evening (4-7 PM)</option>
              </select>
            </div>
            {/* Search */}
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bus Name
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., ROYAL RIDE"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* Reset */}
            <div className="md:col-span-1">
              <button
                onClick={resetFilters}
                className="w-full p-2.5 bg-gray-200 rounded-lg hover:bg-gray-300 flex justify-center"
              >
                <RefreshCw />
              </button>
            </div>
          </div>
        </motion.div>

        {filteredRoutes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            className="text-center py-16"
          >
            <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Routes Match Your Filters
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters to find available buses.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            // initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredRoutes.map((route) => (
              <motion.div
                key={route.id}
                variants={itemVariants}
                className="bg-white text-gray-900 rounded-xl shadow-md hover:shadow-xl transition border overflow-hidden"
              >
                <div className="p-6">
                  {/* From → To & Bus */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <span className="font-bold text-xl text-gray-800">
                        {route.from}
                      </span>
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                      <span className="font-bold text-xl text-gray-800">
                        {route.to}
                      </span>
                    </div>
                    <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full text-sm font-medium">
                      <Bus className="h-4 w-4 text-blue-700" />
                      <span className="ml-1">{route.bus}</span>
                    </div>
                  </div>
                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-700">
                          Departure Times
                        </p>
                        <p className="text-gray-600">
                          {route.timings.join(", ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Hourglass className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-700">Duration</p>
                        <p className="text-gray-600">{route.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Tag className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-700">Fare</p>
                        <p className="text-gray-600">{route.fare}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default BusTimings;
