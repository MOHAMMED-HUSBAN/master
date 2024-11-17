import React from 'react';
import { motion } from 'framer-motion';
import { FaMedal } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Welcome() {
    const students = [
        { name: "علي محمد الجبوري", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/464715745_1057953536337849_3463993791486998049_n.jpg" },
        { name: "محمد علي العبيدي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/462914077_1048492460617290_1312137916601842284_n.jpg" },
        { name: "حسن سالم الزيدي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/459430795_1024102453056291_1100526059511407460_n.jpg" },
        { name: "خالد عمر السعدي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/455910015_1003724651760738_517112070223079531_n.jpg" },
        { name: "عصام أحمد الجندي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/449827429_974908397975697_4012494905887085494_n.jpg" },
        { name: "رامي ��لد الهاشمي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/450212731_974908354642368_5543417289759570534_n.jpg" },
        { name: "خالد إبراهيم الرفاعي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/373011286_767373552062517_5097777091908025735_n.jpg" },
        { name: "أحمد محمود", image: "path_to_new_image_1.jpg" },
        { name: "سامر حسين", image: "path_to_new_image_2.jpg" },
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        cssEase: "cubic-bezier(0.87, 0.03, 0.41, 0.9)",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-800 to-gray-900">
            {/* Spacing for header */}
            <div className="h-20"></div>

            {/* Hero Section */}
            <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border-y border-white/10 text-white py-12">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                            Welcome to Our Champions
                        </h1>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                            We welcome the newest additions to our sports family
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Slider Section */}
            <div className="py-12 px-4 bg-gradient-to-b from-white/5 to-gray-800/50">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Our New Champions
                        </h2>
                        <div className="w-12 h-1 bg-white/20 mx-auto" />
                    </motion.div>

                    <div className="slider-container">
                        <Slider {...settings}>
                            {students.map((student, index) => (
                                <div key={index} className="px-2">
                                    <div className="transform transition-all duration-300 hover:scale-105">
                                        <div className="bg-gradient-to-b from-white/10 to-gray-800/50 backdrop-blur-xl 
                                                    border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                                            <div className="relative aspect-[4/5]">
                                                <img
                                                    src={student.image}
                                                    alt={student.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent 
                                                            opacity-0 hover:opacity-100 transition-opacity duration-300">
                                                    <div className="absolute bottom-0 left-0 right-0 p-3 transform translate-y-6 
                                                                hover:translate-y-0 transition-transform duration-300">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <FaMedal className="text-white text-sm" />
                                                            <span className="text-white text-sm">New Member</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-3 text-center">
                                                <h3 className="text-sm font-semibold text-white">{student.name}</h3>
                                                <p className="text-xs text-gray-200 mt-1">New Member in Our Academy</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-b from-white/5 to-gray-800/50 backdrop-blur-xl border-y border-white/10 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <blockquote className="text-xl text-white italic mb-3">
                            "Welcome to Al-Sharq Taekwondo Academy family. Your journey to excellence starts here."
                        </blockquote>
                        <cite className="block text-sm text-gray-200">- Master Aref Alzawahreh</cite>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;