import React, { useState } from 'react';
import { Activity } from '../types';
import { MapPin, Utensils, Car, Camera, Leaf } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const [imgError, setImgError] = useState(false);

  // Use Pollinations AI for dynamic, relevant images based on the keyword provided by Gemini
  const imageUrl = activity.imageKeyword 
    ? `https://image.pollinations.ai/prompt/${encodeURIComponent(activity.imageKeyword + " photorealistic high quality travel photography natural light")}` 
    : `https://picsum.photos/800/600?random=${Math.random()}`;

  const getIcon = () => {
    switch (activity.type) {
      case 'food': return <Utensils className="w-5 h-5 text-tuscan-red" />;
      case 'transport': return <Car className="w-5 h-5 text-blue-600" />;
      case 'nature': return <Leaf className="w-5 h-5 text-olive-green" />;
      case 'sightseeing': default: return <Camera className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border-l-4 border-olive-green hover:shadow-md transition-shadow">
      <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden rounded-lg relative bg-gray-100 shrink-0">
        {!imgError ? (
          <img 
            src={imageUrl} 
            alt={activity.title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Camera className="w-10 h-10" />
          </div>
        )}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-gray-800">
          {activity.time}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-2">
          {getIcon()}
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{activity.type}</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{activity.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-3">{activity.description}</p>
        {activity.location && (
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-auto">
            <MapPin className="w-3 h-3" />
            <span>{activity.location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;