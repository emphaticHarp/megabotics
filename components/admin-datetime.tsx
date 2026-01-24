'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, X } from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export function AdminDateTime() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>(() => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, '0');
    return `${hoursStr}:${minutes} ${ampm}`;
  });

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentDate(now);
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const hoursStr = String(hours).padStart(2, '0');
      setTime(`${hoursStr}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const dateString = (() => {
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  })();

  return (
    <div className="relative">
      {/* Date/Time Display Button - Side by Side */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
        title="Click to open calendar"
      >
        {/* Date Column */}
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div className="text-left">
            <p className="text-xs text-gray-600 font-medium">Date</p>
            <p className="text-sm font-bold text-gray-900">{dateString}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-300"></div>

        {/* Time Column */}
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-600" />
          <div className="text-left">
            <p className="text-xs text-gray-600 font-medium">Time</p>
            <p className="text-sm font-bold text-gray-900">{time}</p>
          </div>
        </div>
      </button>

      {/* Calendar Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl z-50 border border-gray-200 p-4 w-96">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Select Date & Time</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Calendar */}
          <div className="mb-4">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border shadow-sm"
              captionLayout="dropdown"
            />
          </div>

          {/* Info Section - 2 Columns */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Selected Date Info */}
            {selectedDate && (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-600 font-medium mb-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Selected Date
                </p>
                <p className="text-xs font-bold text-blue-900">
                  {(() => {
                    const day = String(selectedDate.getDate()).padStart(2, '0');
                    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                    const year = selectedDate.getFullYear();
                    return `${day}/${month}/${year}`;
                  })()}
                </p>
              </div>
            )}

            {/* Current Time Info */}
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
              <p className="text-xs text-cyan-600 font-medium mb-1 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Current Time
              </p>
              <p className="text-xs font-bold text-cyan-900">{time}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setSelectedDate(new Date());
                setIsOpen(false);
              }}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
