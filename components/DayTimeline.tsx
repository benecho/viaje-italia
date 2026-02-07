import React from 'react';
import { DayPlan } from '../types';
import ActivityCard from './ActivityCard';
import { Calendar } from 'lucide-react';

interface DayTimelineProps {
  day: DayPlan;
  index: number;
}

const DayTimeline: React.FC<DayTimelineProps> = ({ day, index }) => {
  return (
    <div className="mb-16 relative">
      {/* Date Header */}
      <div className="sticky top-20 z-10 flex items-center gap-4 mb-8 bg-warm-cream/95 backdrop-blur-md py-4 border-b border-stone-gray/50">
        <div className="flex flex-col items-center justify-center bg-tuscan-red text-white w-16 h-16 rounded-lg shadow-lg shrink-0">
          <span className="text-xs font-bold uppercase">{day.dayOfWeek.slice(0, 3)}</span>
          <span className="text-2xl font-serif font-bold">{day.date.split(' ')[0]}</span>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-gray-900">{day.location}</h2>
          <p className="text-gray-600 text-sm flex items-center gap-2">
             <Calendar className="w-4 h-4" /> {day.summary}
          </p>
        </div>
      </div>

      {/* Timeline Line */}
      <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-gray-200 hidden md:block" />

      {/* Activities */}
      <div className="space-y-6 md:pl-20">
        {day.activities.map((activity, actIndex) => (
          <div key={actIndex} className="relative">
            {/* Timeline Dot */}
            <div className="absolute -left-[3.25rem] top-1/2 -translate-y-1/2 w-4 h-4 bg-olive-green rounded-full border-4 border-white shadow hidden md:block z-10" />
            <ActivityCard activity={activity} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayTimeline;