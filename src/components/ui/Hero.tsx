'use client';
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [
    {
      src: "/duolingo.webp",
      title: "Duolingo English Test",
      description: "Achieve your best score with comprehensive preparation",
      color: "from-blue-600 to-purple-700"
    },
    {
      src: "/ieltss.jpg",
      title: "IELTS Preparation", 
      description: "Master all four skills with expert guidance",
      color: "from-red-600 to-orange-600"
    },
    {
      src: "/toefll.jpg",
      title: "TOEFL iBT",
      description: "Excel in your academic English proficiency test",
      color: "from-green-600 to-teal-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Images */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10 w-full">
        <div className="max-w-4xl mx-auto w-full px-2 sm:px-4">
          
          {/* Enhanced Main Heading - Same text size */}
          <div className="mb-2 sm:mb-8">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-1 sm:mb-4 leading-tight">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
                Unlock Your
              </span>
              <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mt-1 sm:mt-2">
                Dream Score
              </span>
            </h1>
            
            {/* Sub-heading - Same text size */}
            <div className="flex items-center justify-center gap-1 sm:gap-3 mt-1 sm:mt-4">
              <div className="w-2 sm:w-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <p className="text-blue-200 font-semibold text-xs sm:text-lg uppercase tracking-wide sm:tracking-widest whitespace-nowrap px-1">
                Success • Results
              </p>
              <div className="w-2 sm:w-4 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
          </div>

          {/* Enhanced Description - Same text size */}
          <div className="mb-2 sm:mb-12 max-w-3xl mx-auto">
            <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-light mb-1 sm:mb-6 leading-relaxed text-center bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              {backgroundImages[currentImageIndex].description}
            </p>
          </div>

          {/* Trust Indicators - Same text size */}
          <div className="bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-3xl p-2 sm:p-8 border border-white/10 shadow-xl max-w-md mx-auto mb-2 sm:mb-12">
            <div className="text-center">
              <p className="text-white/80 text-xs sm:text-lg font-medium mb-1 sm:mb-4 flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
                <span className="text-base sm:text-2xl">🏆</span>
                Trusted by 10,000+ Students
                <span className="text-base sm:text-2xl">🌍</span>
              </p>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-6 text-white/70 text-xs sm:text-sm">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  Verified Results
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                  Expert Tutors
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></span>
                  Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* Image Navigation Dots */}
          <div className="flex justify-center gap-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}