import React, { useState } from 'react';
import { Phone, MapPin, ArrowLeft, Star, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const AutoRickshaw = () => {
  const [selectedArea, setSelectedArea] = useState('all');

  const autoDrivers = [
    {
      id: '1',
      name: 'Ravi Kumar',
      phone: '+919876543210',
      rating: 4.8,
      experience: '8 years',
      location: 'Kanjirappally',
      availability: 'available',
      vehicleNumber: 'KL-05-AB-1234',
      specialties: ['Campus Pickup', 'Station Drops']
    },
    {
      id: '2',
      name: 'Suresh Babu',
      phone: '+919876543211',
      rating: 4.6,
      experience: '5 years',
      location: 'Koovapally',
      availability: 'available',
      vehicleNumber: 'KL-05-CD-5678',
      specialties: ['Night Service', 'Emergency Rides']
    },
    {
      id: '3',
      name: 'Manoj P',
      phone: '+919876543212',
      rating: 4.9,
      experience: '12 years',
      location: 'Erattupetta',
      availability: 'busy',
      vehicleNumber: 'KL-05-EF-9012',
      specialties: ['Long Distance', 'Airport Drops']
    },
    {
      id: '4',
      name: 'Anil Jose',
      phone: '+919876543213',
      rating: 4.7,
      experience: '6 years',
      location: 'Kanjirappally',
      availability: 'available',
      vehicleNumber: 'KL-05-GH-3456',
      specialties: ['Campus Tours', 'Local Trips']
    },
    {
      id: '5',
      name: 'Rajesh M',
      phone: '+919876543214',
      rating: 4.5,
      experience: '10 years',
      location: 'Pala',
      availability: 'offline',
      vehicleNumber: 'KL-05-IJ-7890',
      specialties: ['Medical Emergency', 'Senior Citizen Friendly']
    },
    {
      id: '6',
      name: 'Vinod Kumar',
      phone: '+919876543215',
      rating: 4.8,
      experience: '7 years',
      location: 'Kottayam',
      availability: 'available',
      vehicleNumber: 'KL-05-KL-2468',
      specialties: ['Student Discounts', 'Group Rides']
    }
  ];

  const areas = ['all', 'Kanjirappally', 'Koovapally', 'Erattupetta', 'Pala', 'Kottayam'];

  const filteredDrivers = selectedArea === 'all' 
    ? autoDrivers 
    : autoDrivers.filter(driver => driver.location === selectedArea);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available': return 'Available Now';
      case 'busy': return 'Currently Busy';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back to Home</span>
              </Link>
            </div>
            <div className="text-right">
              <p className="text-sm text-emerald-600 font-medium">24/7 Service Available</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-emerald-600 p-3 rounded-full">
              <Phone className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Auto-Rickshaw Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with verified auto-rickshaw drivers near AJCE Campus
          </p>
        </div>

        {/* Area Filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Area</h3>
          <div className="flex flex-wrap gap-2">
            {areas.map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedArea === area
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {area === 'all' ? 'All Areas' : area}
              </button>
            ))}
          </div>
        </div>

        {/* Driver Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDrivers.map((driver) => (
            <div
              key={driver.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="p-6">
                {/* Driver Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-emerald-100 p-2 rounded-full">
                      <User className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                      <p className="text-sm text-gray-600">{driver.vehicleNumber}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getAvailabilityColor(driver.availability)}`}>
                    {getAvailabilityText(driver.availability)}
                  </div>
                </div>

                {/* Driver Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{driver.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-900">{driver.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{driver.experience} experience</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {driver.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Call Button */}
                <a
                  href={`tel:${driver.phone}`}
                  className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-colors ${
                    driver.availability === 'available'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : driver.availability === 'busy'
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                  onClick={driver.availability === 'offline' ? (e) => e.preventDefault() : undefined}
                >
                  <Phone className="h-4 w-4" />
                  <span>
                    {driver.availability === 'available' ? 'Call Now' : 
                     driver.availability === 'busy' ? 'Call (Busy)' : 'Unavailable'}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredDrivers.length === 0 && (
          <div className="text-center py-12">
            <Phone className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drivers found</h3>
            <p className="text-gray-600">Try selecting a different area or check back later.</p>
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Important Information</h3>
          <div className="space-y-2 text-blue-700">
            <p className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              All drivers are verified and registered with local authorities
            </p>
            <p className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Rates are as per government-approved meter charges
            </p>
            <p className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              For complaints or feedback, contact IEDC AJCE support
            </p>
            <p className="flex items-start">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Emergency services available 24/7
            </p>
          </div>
        </div>

        {/* Emergency Contact
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mt-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Contact</h3>
          <p className="text-red-700 mb-3">
            For urgent assistance or safety concerns:
          </p>
          <a
            href="tel:+919876543200"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Phone className="h-4 w-4 mr-2" />
            Emergency Helpline
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default AutoRickshaw;