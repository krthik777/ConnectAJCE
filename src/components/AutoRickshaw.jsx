import React, { useState } from 'react';
import { Phone, MapPin, ArrowLeft, ChevronDown,ChevronUp, User, Info, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const AutoRickshaw = () => {
  const [selectedArea, setSelectedArea] = useState('all');
  const [expandedDriver, setExpandedDriver] = useState(null);

  const autoDrivers = [
    {
      id: '1',
      name: 'Ravi Kumar',
      phone: '+919876543210',
      location: 'Kanjirappally',
      vehicleNumber: 'KL-05-AB-1234',
      specialties: ['Campus Pickup', 'Station Drops']
    },
    {
      id: '2',
      name: 'Suresh Babu',
      phone: '+919876543211',
      location: 'Koovapally',
      vehicleNumber: 'KL-05-CD-5678',
      specialties: ['Night Service', 'Emergency Rides']
    },
    {
      id: '3',
      name: 'Manoj P',
      phone: '+919876543212',
      location: 'Erattupetta',
      vehicleNumber: 'KL-05-EF-9012',
      specialties: ['Long Distance', 'Airport Drops']
    },
    {
      id: '4',
      name: 'Anil Jose',
      phone: '+919876543213',
      location: 'Kanjirappally',
      vehicleNumber: 'KL-05-GH-3456',
      specialties: ['Campus Tours', 'Local Trips']
    },
    {
      id: '5',
      name: 'Rajesh M',
      phone: '+919876543214',
      location: 'Pala',
      vehicleNumber: 'KL-05-IJ-7890',
      specialties: ['Medical Emergency', 'Senior Citizen Friendly']
    },
    {
      id: '6',
      name: 'Vinod Kumar',
      phone: '+919876543215',
      location: 'Kottayam',
      vehicleNumber: 'KL-05-KL-2468',
      specialties: ['Student Discounts', 'Group Rides']
    }
  ];

  const areas = ['all', 'Kanjirappally', 'Koovapally', 'Erattupetta', 'Pala', 'Kottayam'];

  const filteredDrivers = selectedArea === 'all' 
    ? autoDrivers 
    : autoDrivers.filter(driver => driver.location === selectedArea);

  const toggleDriverExpand = (id) => {
    if (expandedDriver === id) {
      setExpandedDriver(null);
    } else {
      setExpandedDriver(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 font-sans text-gray-800">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-emerald-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-blue-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header with Glass Morphism */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center text-emerald-700 hover:text-emerald-800 group"
            >
              <ArrowLeft className="h-5 w-5 mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-100/50 px-3 py-1.5 rounded-full">
              <Phone className="h-4 w-4" />
              <span>Auto Service</span>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-5">
              <div className="bg-emerald-600 p-4 rounded-full shadow-lg">
                <Phone className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Auto-Rickshaw Service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with trusted auto drivers near AJCE Campus
            </p>
          </motion.div>

          {/* Area Filter */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-emerald-600" />
              Filter by Area
            </h3>
            <div className="flex flex-wrap gap-2">
              {areas.map((area) => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedArea === area
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {area === 'all' ? 'All Areas' : area}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Driver Cards */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredDrivers.map((driver) => (
              <motion.div
                key={driver.id}
                whileHover={{ y: -5 }}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-200/50 transition-all duration-300 ${
                  expandedDriver === driver.id 
                    ? "ring-2 ring-emerald-500 shadow-xl" 
                    : "hover:shadow-xl hover:border-emerald-300"
                }`}
              >
                <div 
                  className="p-6 cursor-pointer" 
                  onClick={() => toggleDriverExpand(driver.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{driver.name}</h3>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{driver.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-1.5 rounded-full">
                      {expandedDriver === driver.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {expandedDriver === driver.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200/50 px-6 py-4 bg-emerald-50/30"
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Vehicle Number</h4>
                        <p className="text-gray-600">{driver.vehicleNumber}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Phone</h4>
                        <p className="text-gray-600">{driver.phone}</p>
                      </div>
                    </div>

                    {driver.specialties && driver.specialties.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-700 mb-2">Services</h4>
                        <div className="flex flex-wrap gap-2">
                          {driver.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <a
                      href={`tel:${driver.phone}`}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Call Now</span>
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {filteredDrivers.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow border border-white/50"
            >
              <div className="flex justify-center mb-4">
                <Phone className="h-16 w-16 text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No drivers available</h3>
              <p className="text-gray-600 mb-6">Try selecting a different area or check back later.</p>
              <button
                onClick={() => setSelectedArea('all')}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Show All Drivers
              </button>
            </motion.div>
          )}

          {/* Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-blue-50/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-100"
          >
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="h-6 w-6 text-emerald-600 mt-0.5" />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Auto Service</h3>
                <p className="text-gray-700">
                  All drivers are registered and verified by AJCE administration for your safety.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="bg-white/80 p-4 rounded-xl border border-white/50">
                <h4 className="font-semibold text-emerald-700 mb-2">Standard Fares</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Minimum charge: ₹30 for first 1.5km</li>
                  <li>• ₹15 per additional kilometer</li>
                  <li>• Night charges (10PM-6AM): +20%</li>
                  <li>• Waiting charge: ₹3 per minute after 5min</li>
                </ul>
              </div>
              
              <div className="bg-white/80 p-4 rounded-xl border border-white/50">
                <h4 className="font-semibold text-emerald-700 mb-2">Safety Tips</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Always verify driver name and vehicle number</li>
                  <li>• Share ride details with friends/family</li>
                  <li>• Use official campus auto stand for pickup</li>
                  <li>• Report issues to campus security immediately</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-16 py-8 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Auto Service Support</h4>
                <p className="text-gray-600 max-w-lg">
                  For assistance with auto services, contact the AJCE transport office at Gate 2
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src="https://www.ajce.in/300x300png.png" 
                    alt="AJCE Logo" 
                    className="h-12 w-12" 
                  />
                  <img 
                    src="https://iedcajce.in/images/FAVCON.png" 
                    alt="IEDC Logo" 
                    className="h-12 w-12" 
                  />
                </div>
                <p className="text-sm text-gray-500">
                  An Official IEDC Amal Jyothi Initiative
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AutoRickshaw;