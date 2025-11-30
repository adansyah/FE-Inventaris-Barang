import React from 'react';
import { PRIMARY_COLOR } from '../constants';

const StatCard = ({ title, value, unit, icon, color, subText, isBig }) => {
    const primaryBg = `bg-${PRIMARY_COLOR}-700`;
    const subTextColor = isBig ? 'text-indigo-300' : 'text-gray-500';

    return (
        <div className={`p-6 rounded-lg shadow-xl ${isBig ? primaryBg + ' text-white' : 'bg-white text-gray-800'} transition duration-300 hover:shadow-2xl`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className={`text-sm font-medium ${isBig ? 'text-indigo-200' : 'text-gray-500'}`}>{title}</p>
                    <div className="flex items-end mt-2">
                        <h1 className={`text-4xl font-extrabold ${isBig ? 'text-white' : `text-${color}-600`}`}>{value}</h1>
                        {unit && <span className={`ml-2 text-xl font-bold ${isBig ? 'text-indigo-200' : 'text-gray-600'}`}>{unit}</span>}
                    </div>
                </div>
                <div className={`p-3 rounded-full ${isBig ? 'bg-indigo-600' : 'bg-gray-100 text-indigo-600'} transition-all duration-300`}>
                    {icon}
                </div>
            </div>
            
            <div className={`mt-4 pt-3 ${isBig ? 'border-t border-indigo-600' : 'border-t border-gray-100'}`}>
                {color === 'red' ? (
                    <div className="p-2 bg-red-50 text-red-700 rounded-lg text-xs flex items-center font-medium">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                        Butuh Penghapusan
                    </div>
                ) : (
                    <p className={`text-xs ${subTextColor} flex items-center font-medium`}>
                        {subText}
                    </p>
                )}
            </div>
        </div>
    );
};

export default StatCard;