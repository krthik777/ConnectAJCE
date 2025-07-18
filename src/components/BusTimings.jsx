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
  ChevronDown,
  ChevronUp,
  Loader2
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
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch & normalize
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.jsonbin.io/v3/b/68781e50c7f29633ab29f43a/latest`,
          {
            headers: {
              "X-Master-Key": '$2a$10$eyU92iI4Y9sDxFbxhxmdRecULv6HiZygpurEbxuXHWDjrbh4u9Afq',
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

  const toggleCardExpand = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  // Motion variants
  const containerVariants = {
    visible: { 
      transition: { 
        staggerChildren: 0.08,
        when: "beforeChildren"
      } 
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 font-sans text-gray-800">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header with Glass Morphism */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center text-blue-700 hover:text-blue-800 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-100/50 px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4 text-blue-700" />
              <span>
                {currentTime.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
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
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Bus Timings & Routes
            </h3>
            <p className="text-lg text-gray-600">
              Find the next bus for your journey to campus
            </p>
          </motion.div>

          {/* Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-white/50 mb-10"
          >
            <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                <h4 className="font-semibold text-gray-800">Filter Buses</h4>
              </div>
              {showFilters ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end transition-all duration-300">
                {/* From */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    From
                  </label>
                  <div className="relative">
                    <select
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {fromDropdownOptions.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc === "all" ? "Any Location" : loc}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                {/* To */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    To
                  </label>
                  <div className="relative">
                    <select
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      {toDropdownOptions.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc === "all" ? "Any Location" : loc}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                {/* Time */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time of Day
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                    >
                      <option value="all">All Day</option>
                      <option value="morning">Morning (6-9 AM)</option>
                      <option value="forenoon">Forenoon (9-12 PM)</option>
                      <option value="afternoon">Afternoon (12-4 PM)</option>
                      <option value="evening">Evening (4-7 PM)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                {/* Search */}
                <div className="md:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Search by Bus Name
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="e.g., ROYAL RIDE"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                {/* Reset */}
                <div className="md:col-span-1">
                  <button
                    onClick={resetFilters}
                    className="w-full h-full flex items-center justify-center p-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                    title="Reset all filters"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20"
            >
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">Loading Bus Schedules</h3>
              <p className="text-gray-600 mt-2">Fetching the latest bus timings...</p>
            </motion.div>
          )}

          {/* No Results */}
          {!isLoading && filteredRoutes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow border border-white/50"
            >
              <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Bus Routes Match Your Filters
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to find available buses.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </button>
            </motion.div>
          )}

          {/* Results Grid */}
          {!isLoading && filteredRoutes.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredRoutes.map((route) => (
                <motion.div
                  key={route.id}
                  variants={itemVariants}
                  className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-300 ${
                    expandedCard === route.id 
                      ? "ring-2 ring-blue-500 shadow-xl" 
                      : "hover:shadow-xl hover:border-blue-300"
                  }`}
                >
                  <div 
                    className="p-5 cursor-pointer" 
                    onClick={() => toggleCardExpand(route.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-5 w-5 text-blue-600" />
                          <span className="font-bold text-gray-800">
                            {route.from}
                          </span>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <span className="font-bold text-gray-800">
                            {route.to}
                          </span>
                        </div>
                        <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full text-sm font-medium w-fit">
                          <Bus className="h-4 w-4 text-blue-700 mr-1" />
                          <span>{route.bus}</span>
                        </div>
                      </div>
                      <div className="bg-gray-100 p-1.5 rounded-full">
                        {expandedCard === route.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {route.timings.length} Departures
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{route.fare}</span>
                      </div>
                    </div>
                  </div>

                  {expandedCard === route.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-200/50 px-5 py-4 bg-blue-50/30"
                    >
                      <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        Departure Times
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {route.timings.map((time, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm"
                          >
                            {time}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                            <Hourglass className="h-4 w-4 text-blue-600" />
                            Duration
                          </h4>
                          <p className="text-gray-600">{route.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-700 mb-1 flex items-center gap-2">
                            <Tag className="h-4 w-4 text-blue-600" />
                            Fare
                          </h4>
                          <p className="text-gray-600">{route.fare}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-gray-200/50">
                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                          Set Reminder
                          <Clock className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Info Section */}
          {!isLoading && filteredRoutes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100"
            >
              <h4 className="font-bold text-lg text-blue-800 mb-3 flex items-center gap-2">
                <Info className="h-5 w-5" />
                Bus Schedule Information
              </h4>
              <p className="text-gray-700">
                Bus timings are subject to change based on traffic conditions and other factors. 
                Please arrive at the stop at least 10 minutes before the scheduled departure time. 
                For real-time updates, contact the bus operator directly.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>AJCE Campus - Main campus bus stop</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Direct routes with no transfers</span>
                </div>
              </div>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-6 mb-4">
              <img src="https://www.ajce.in/300x300png.png" alt="AJCE Logo" className="w-10 h-10" />
              <img src="https://iedcajce.in/images/FAVCON.png" alt="IEDC Logo" className="w-10 h-10" />
            </div>
            <p className="text-gray-600">
              An Official IEDC Amal Jyothi Initiative • Bus data is updated weekly
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Need help? Contact us at <a href="mailto:iedc@ajce.in" className="text-blue-600 hover:underline">iedc@ajce.in</a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Helper component for the info icon
const Info = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default BusTimings;