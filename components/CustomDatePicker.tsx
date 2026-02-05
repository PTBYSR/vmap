'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CustomDatePickerProps {
    value: string;
    onChange: (date: string) => void;
    minDate?: string; // ISO string or YYYY-MM-DD
    flaggedDates?: Record<string, number>; // Date string -> Stage number
    label?: string;
}

export default function CustomDatePicker({
    value,
    onChange,
    minDate,
    flaggedDates = {},
    label
}: CustomDatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const handlePrevMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const isDateDisabled = (date: Date) => {
        if (!minDate || minDate === 'Pending') return false;
        const d = new Date(minDate);
        d.setHours(0, 0, 0, 0);
        return date < d;
    };

    const getFlaggedStage = (dateStr: string) => {
        return flaggedDates[dateStr];
    };

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const renderDays = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const days = [];
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);

        // Blank days
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`blank-${i}`} className="p-2"></div>);
        }

        // Month days
        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(year, month, d);
            const dateStr = formatDate(date);
            const isDisabled = isDateDisabled(date);
            const flaggedStageId = getFlaggedStage(dateStr);
            const isSelected = value === dateStr;

            days.push(
                <button
                    key={d}
                    disabled={isDisabled}
                    onClick={() => {
                        onChange(dateStr);
                        setIsOpen(false);
                    }}
                    className={`h-9 w-9 text-[10px] font-bold rounded-lg transition-all relative flex items-center justify-center ${isDisabled ? 'text-gray-200 cursor-not-allowed' :
                            isSelected ? 'bg-vmap-red text-white shadow-lg shadow-red-200' :
                                'hover:bg-gray-100 text-vmap-text'
                        }`}
                >
                    {d}
                    {flaggedStageId !== undefined && !isSelected && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gray-100 text-vmap-text-secondary border border-gray-200 rounded-full flex items-center justify-center text-[7px] font-black shadow-sm" title={`Selected in Stage ${flaggedStageId}`}>
                            {flaggedStageId}
                        </span>
                    )}
                </button>
            );
        }
        return days;
    };

    const isDateFlagged = (dateStr: string) => {
        return flaggedDates[dateStr] !== undefined;
    };

    return (
        <div className="relative" ref={containerRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-2 py-1.5 border border-gray-200 rounded text-[11px] focus:outline-none focus:border-vmap-red bg-white font-medium cursor-pointer flex justify-between items-center"
            >
                <span>{value || 'Select Date'}</span>
                <span className="text-[10px]">📅</span>
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200"
                        onClick={() => setIsOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-[300px] bg-white border border-gray-200 shadow-2xl rounded-xl p-5 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-4">
                            <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-full text-vmap-text-secondary text-sm">←</button>
                            <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-vmap-text">
                                {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                            </span>
                            <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-full text-vmap-text-secondary text-sm">→</button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                <div key={d} className="text-[9px] font-bold text-gray-400">{d}</div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1 place-items-center">
                            {renderDays()}
                        </div>

                        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-[7px] font-bold text-vmap-text-secondary">#</div>
                                <span className="text-[9px] font-bold text-vmap-text-secondary uppercase">Other Stage</span>
                            </div>
                            <button
                                onClick={() => { onChange('Pending'); setIsOpen(false); }}
                                className="text-[9px] font-bold text-vmap-red uppercase hover:underline"
                            >
                                Reset to Pending
                            </button>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="mt-4 w-full py-2 bg-gray-50 hover:bg-gray-100 text-vmap-text-secondary text-[10px] font-bold uppercase tracking-widest rounded transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
