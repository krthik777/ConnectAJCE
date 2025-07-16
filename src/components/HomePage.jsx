import React, { useRef, Suspense } from "react";
import { Bus, Phone, MapPin, Mail, ArrowRight, Linkedin, TrendingUp, Users, Code, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

// Main HomePage Component
const HomePage = () => {
    const busLocations = ["Kanjirappally", "Koovapally", "Erattupetta", "Kottayam", "Pala"];

    // Refs for scroll-triggered animations
    const featuresRef = useRef(null);
    const featuresInView = useInView(featuresRef, { once: true, amount: 0.2 });

    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

    const creatorRef = useRef(null);
    const creatorInView = useInView(creatorRef, { once: true, amount: 0.3 });

    // Animation variants for staggering children
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
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
            }
        },
    };


    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {/* Background Aurora Effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[40rem] h-[40rem] bg-blue-500/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <motion.header
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm"
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <img src="https://www.ajce.in/300x300png.png" alt="AJCE Logo" className="w-12 h-12" />
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Connect <span className="text-blue-700">AJCE</span></h1>
                              {/*  <p className="text-sm text-gray-500">Your Campus Travel Guide</p> */}
                            </div>
                        </Link>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-blue-700">An IEDC Initiative</p>
                               {/* <p className="text-xs text-gray-400">By Students, For You</p> */}
                            </div>
                            <img src="https://iedcajce.in/images/FAVCON.png" alt="IEDC Logo" className="w-12 h-12" />
                        </div>
                    </div>
                </motion.header>

                {/* Hero Section with Background Image */}
                <section
                    className="relative bg-cover bg-center bg-no-repeat py-32 sm:py-40"
                    style={{ backgroundImage: `url(https://www.ajce.in/assets/css/images/bg.jpg)` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
                    <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        >
                            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
                                Guiding Your Journey to Amal Jyothi
                            </h2>
                            <p className="mt-4 text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-md">
                                Developed by students to provide clear, reliable transportation info and guidance for anyone visiting our campus.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
                        >
                            <Link
                                to="/bus-timings"
                                className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 transform hover:scale-105"
                            >
                                <Bus className="w-5 h-5" />
                                <span>View Bus Timings</span>
                                <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </Link>
                            <Link
                                to="/auto-rickshaw"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-blue-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                                <span>Find an Auto-Rickshaw</span>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section ref={featuresRef} className="py-20 sm:py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center mb-16"
                        >
                            <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">A Professional Transit Solution</h3>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                We provide reliable and efficient services to ensure your commute is safe and punctual.
                            </p>
                        </motion.div>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={featuresInView ? "visible" : "hidden"}
                            className="grid md:grid-cols-2 gap-8"
                        >
                            {/* Bus Card */}
                            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg border border-gray-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 text-blue-700 p-3 rounded-lg mr-4">
                                        <Bus className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900">Live Bus Timetables</h4>
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Access up-to-the-minute bus schedules for all major routes connecting to the campus, ensuring you're always on time.
                                </p>
                                <Link to="/bus-timings" className="font-semibold text-blue-700 hover:text-blue-800 transition-colors duration-300 flex items-center gap-2">
                                    Check Schedules <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>

                            {/* Auto Card */}
                            <motion.div variants={itemVariants} className="bg-gray-50 rounded-lg border border-gray-200 p-8 hover:shadow-xl hover:border-blue-300 transition-all duration-300">
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 text-blue-700 p-3 rounded-lg mr-4">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900">Verified Auto Service</h4>
                                </div>
                                <p className="text-gray-600 mb-5">
                                    Connect directly with a network of trusted and verified auto-rickshaw drivers for safe and reliable travel around the area.
                                </p>
                                <Link to="/auto-rickshaw" className="font-semibold text-blue-700 hover:text-blue-800 transition-colors duration-300 flex items-center gap-2">
                                    Call a Driver <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Stats Section */}
                <section ref={statsRef} className="py-20 bg-gray-100 border-y border-gray-200">
                    <div className="max-w-5xl mx-auto px-4">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={statsInView ? "visible" : "hidden"}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                        >
                            {[
                                { icon: <TrendingUp />, value: "5+", label: "Bus Routes" },
                                { icon: <Users />, value: "15+", label: "Verified Drivers" },
                                { icon: <Building />, value: "1", label: "Official Campus Service" },
                                { icon: <Code />, value: "100%", label: "Student Developed" }
                            ].map((stat, index) => (
                                <motion.div key={index} variants={itemVariants} className="bg-white p-6 rounded-lg border border-gray-200">
                                    <div className="text-3xl sm:text-4xl font-bold text-blue-700">{stat.value}</div>
                                    <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Meet the Creator Section */}
                <section ref={creatorRef} className="py-20 bg-white">
                    <div className="max-w-3xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ y: 40, opacity: 0 }}
                            animate={creatorInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <h3 className="text-3xl font-bold text-gray-900 mb-3">Meet the Creator</h3>
                            <div className="flex flex-col items-center gap-4 mb-6">
                                <img
                                    src="data:image/jpeg;base64,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"
                                    alt="Karthik Vinod"
                                    className="w-24 h-24 rounded-full border-4 border-blue-100 shadow-md"
                                />
                                <div>
                                    <p className="text-lg font-semibold text-gray-800">Karthik Vinod</p>
                                    <p className="text-gray-500 text-sm">Student Developer, AJCE</p>
                                </div>
                                <a
                                    href="https://www.linkedin.com/in/karthik-vinod-7a7025278"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                                >
                                    <Linkedin className="w-5 h-5" />
                                    LinkedIn
                                </a>
                            </div>
                            <p className="text-gray-700">
                                This platform was developed as an official IEDC initiative by a student of Amal Jyothi College of Engineering.
                            </p>
                        </motion.div>
                    </div>
                </section>
                <footer className="bg-gray-50 border-t border-gray-200">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center space-y-4">
                        <div className="flex justify-center items-center gap-6">
                           <img src="https://www.ajce.in/300x300png.png" alt="AJCE Logo" className="w-16 h-16" />
                           <img src="https://iedcajce.in/images/FAVCON.png" alt="IEDC Logo" className="w-16 h-16" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Connect <span className="text-blue-700">AJCE</span></h4>
                        <p className="text-gray-500">An Official IEDC Amal Jyothi Initiative</p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                            <a href="mailto:iedc@ajce.in" className="flex items-center gap-2 hover:text-blue-700 transition-colors duration-300">
                                <Mail className="w-4 h-4" />
                                iedc@ajce.in
                            </a>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                Amal Jyothi College of Engineering, Kanjirappally
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 pt-6">
                            Copyright © {new Date().getFullYear()} Connect AJCE. All Rights Reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
