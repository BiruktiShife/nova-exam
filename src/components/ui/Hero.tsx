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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* FALLBACK GRADIENT BACKGROUND - This will always work */}
      <div className={`absolute inset-0 bg-gradient-to-br ${backgroundImages[currentImageIndex].color}`}>
        {/* Try to load image as background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImages[currentImageIndex].src})` }}
        ></div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Title Badge */}
          {/* Enhanced Title Badge with Icon */}


{/* Enhanced Main Heading with Gradient Effects */}
<div className="mb-8">
  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-none tracking-tight">
    <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
      Unlock Your
    </span>
    <span className="block bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mt-2 md:mt-4 drop-shadow-2xl">
      Dream Score
    </span>
  </h1>
  
  {/* Sub-heading */}
  <div className="flex items-center justify-center gap-3 mt-4">
    <div className="w-4 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
    <p className="text-blue-200 font-semibold text-lg md:text-xl uppercase tracking-widest">
      Guaranteed Success • Proven Results
    </p>
    <div className="w-4 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
  </div>
</div>

{/* Enhanced Description with Features */}
<div className="mb-12 max-w-4xl mx-auto">
  <p className="text-2xl md:text-3xl lg:text-4xl text-white/95 font-light mb-6 leading-relaxed text-center bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
    {backgroundImages[currentImageIndex].description}
  </p>
  
  {/* Achievement Highlights */}
  
</div>



{/* Trust Indicators */}
<div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl max-w-2xl mx-auto mb-12">
  <div className="text-center">
    <p className="text-white/80 text-lg font-medium mb-4 flex items-center justify-center gap-2">
      <span className="text-2xl">🏆</span>
      Trusted by 10,000+ Successful Students Worldwide
      <span className="text-2xl">🌍</span>
    </p>
    <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
        Verified Results
      </span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
        Expert Tutors
      </span>
      <span className="flex items-center gap-2">
        <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
        Money-Back Guarantee
      </span>
    </div>
  </div>
</div>
          {/* Image Navigation Dots */}
          <div className="flex justify-center gap-3">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
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