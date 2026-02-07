import React, { useState, useEffect } from 'react';
import { SlideData } from '../types';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Clock, Utensils, Moon, Car, Camera, Plane } from 'lucide-react';

interface PresentationModeProps {
  slides: SlideData[];
}

const PresentationMode: React.FC<PresentationModeProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  const slide = slides[currentIndex];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'calendar': return <Calendar className="w-6 h-6" />;
      case 'plane': return <Plane className="w-6 h-6" />;
      case 'plane-return': return <Plane className="w-6 h-6 transform rotate-180" />;
      case 'heart': default: return <MapPin className="w-6 h-6" />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div key={slide.id} className="absolute inset-0 animate-fade-in duration-1000">
             <img 
               src={slide.bgImage} 
               alt="Background" 
               className="w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-tuscan-red transition-all duration-500 ease-out" 
          style={{ width: `${((currentIndex + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className={`transition-all duration-700 transform ${direction !== 0 ? 'animate-slide-up' : ''}`}>
          {slide.date && (
            <div className="inline-flex items-center gap-2 bg-olive-green/80 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
              <Calendar className="w-4 h-4" /> {slide.date}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-warm-cream leading-tight drop-shadow-lg">
            {slide.title}
          </h1>
          {slide.subtitle && (
            <p className="text-2xl md:text-3xl font-light text-gray-200 mb-8 max-w-3xl">
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Detail Cards based on Type */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* INTRO / SUMMARY HIGHLIGHTS */}
          {(slide.type === 'intro' || slide.type === 'summary') && slide.highlights && (
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slide.highlights.map((h, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="text-tuscan-red mb-3">{getIcon(h.icon)}</div>
                  <h3 className="text-xl font-bold mb-1">{h.title}</h3>
                  <p className="text-gray-300">{h.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* DAY DETAILS */}
          {(slide.type === 'day' || slide.type === 'transition') && slide.content && (
            <>
              <div className="md:col-span-7 space-y-6">
                <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border-l-4 border-yellow-500">
                  <div className="flex items-center gap-3 mb-2 text-yellow-400 font-bold uppercase text-xs tracking-wider">
                    <Clock className="w-4 h-4" /> Mañana
                  </div>
                  <p className="text-lg leading-relaxed">{slide.content.morning}</p>
                </div>

                {slide.content.afternoon && (
                    <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border-l-4 border-orange-500">
                    <div className="flex items-center gap-3 mb-2 text-orange-400 font-bold uppercase text-xs tracking-wider">
                        <Camera className="w-4 h-4" /> Tarde
                    </div>
                    <p className="text-lg leading-relaxed">{slide.content.afternoon}</p>
                    </div>
                )}
              </div>

              <div className="md:col-span-5 space-y-4">
                {slide.content.lunch && (
                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-tuscan-red font-bold">
                            <Utensils className="w-4 h-4" /> Comida
                        </div>
                        <p className="text-sm md:text-base">{slide.content.lunch}</p>
                    </div>
                )}
                 {slide.content.dinner && (
                    <div className="bg-white/10 backdrop-blur-md p-5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2 text-tuscan-red font-bold">
                            <Utensils className="w-4 h-4" /> Cena
                        </div>
                        <p className="text-sm md:text-base">{slide.content.dinner}</p>
                    </div>
                )}
                 {slide.content.stay && (
                    <div className="bg-deep-blue/60 backdrop-blur-md p-5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2 text-blue-300 font-bold">
                            <Moon className="w-4 h-4" /> Alojamiento
                        </div>
                        <p className="text-sm md:text-base">{slide.content.stay}</p>
                    </div>
                )}
                 {slide.content.tips && slide.content.tips.length > 0 && (
                     <div className="bg-olive-green/20 backdrop-blur-md p-4 rounded-lg mt-4 border border-olive-green/40">
                         <p className="text-xs text-olive-green/80 font-bold uppercase mb-2">Travel Tip</p>
                         <ul className="text-sm space-y-1 list-disc list-inside text-gray-200">
                             {slide.content.tips.map((t,i) => <li key={i}>{t}</li>)}
                         </ul>
                     </div>
                 )}
              </div>
            </>
          )}

        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4 z-50">
        <span className="text-white/50 font-mono text-sm">
            {currentIndex + 1} / {slides.length}
        </span>
        <div className="flex gap-2">
            <button 
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-4 rounded-full border border-white/20 backdrop-blur-sm transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white text-black hover:scale-110'}`}
            >
            <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
            className={`p-4 rounded-full bg-tuscan-red text-white shadow-lg transition-all ${currentIndex === slides.length - 1 ? 'opacity-50 cursor-not-allowed bg-gray-600' : 'hover:bg-red-600 hover:scale-110'}`}
            >
            <ChevronRight className="w-6 h-6" />
            </button>
        </div>
      </div>
      
      {/* Mobile Hint */}
      <div className="absolute bottom-4 left-0 right-0 text-center md:hidden text-white/30 text-xs animate-pulse">
        Desliza o usa botones para navegar
      </div>

    </div>
  );
};

export default PresentationMode;