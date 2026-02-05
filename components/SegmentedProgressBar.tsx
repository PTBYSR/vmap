import React from 'react';
import { Stage } from '@/lib/types';

interface SegmentedProgressBarProps {
    stages: Stage[];
    totalProgress: number;
}

export default function SegmentedProgressBar({
    stages,
    totalProgress,
}: SegmentedProgressBarProps) {
    const getSegmentFillPercent = (stageId: number): number => {
        const stageEnd = stageId * 25;
        const stageStart = (stageId - 1) * 25;

        if (totalProgress >= stageEnd) return 100;
        if (totalProgress <= stageStart) return 0;

        // Progress within this stage (0-25 range converted to 0-100)
        return ((totalProgress - stageStart) / 25) * 100;
    };

    const getSegmentClasses = (stage: Stage): string => {
        const baseClasses = 'relative flex flex-col gap-2';
        if (stage.status === 'PENDING') {
            return `${baseClasses} opacity-50`;
        }
        return baseClasses;
    };

    const getFillClasses = (stage: Stage): string => {
        let classes = 'h-full rounded-full transition-all duration-300 relative';

        if (stage.status === 'COMPLETED' || stage.status === 'ACTIVE') {
            classes += ' bg-green-500';
        } else if (stage.status === 'PAUSED') {
            classes += ' bg-orange-500';
        } else if (stage.status === 'PENDING') {
            classes += ' bg-gray-200';
        } else {
            classes += ' bg-green-500';
        }

        return classes;
    };

    const isCurrentStage = (stageId: number): boolean => {
        const stageEnd = stageId * 25;
        const stageStart = (stageId - 1) * 25;
        return totalProgress > stageStart && totalProgress <= stageEnd;
    };

    return (
        <div className="w-full my-8">
            <style jsx>{`
                @keyframes pulse-dot {
                    0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
                    70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
                    100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
                }
                .pulse-indicator {
                    animation: pulse-dot 2s infinite;
                }
            `}</style>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
                {stages.map((stage) => {
                    const fillPercent = getSegmentFillPercent(stage.id);
                    const active = isCurrentStage(stage.id);

                    return (
                        <div key={stage.id} className={getSegmentClasses(stage)}>
                            <div className="flex flex-col gap-0.5 min-h-[4rem]">
                                <span className="text-[10px] font-black text-vmap-red uppercase tracking-widest">
                                    {stage.name}
                                </span>
                                <span className="text-vmap-text font-bold text-sm leading-tight">
                                    {stage.location || 'Pending'}
                                </span>
                                <span className="text-[10px] font-semibold text-vmap-text-secondary uppercase tracking-tight">
                                    {stage.date || 'Pending'}
                                </span>
                            </div>

                            {/* Progress Track */}
                            <div className="h-2.5 bg-gray-100 rounded-full overflow-visible relative border border-gray-200 shadow-inner">
                                <div
                                    className={getFillClasses(stage)}
                                    style={{ width: `${fillPercent}%` }}
                                />
                                {/* Pulsing circular point positioned accurately on the track */}
                                {active && fillPercent > 0 && (
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300 ml-[-4px]"
                                        style={{ left: `${fillPercent}%` }}
                                    >
                                        <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-white shadow-sm pulse-indicator -translate-x-1/2" />
                                    </div>
                                )}
                            </div>

                            {/* Status Marker */}
                            <div className="flex justify-between items-center text-[10px] font-medium text-vmap-text-secondary mt-1">
                                <span className={
                                    stage.status === 'PAUSED' ? 'text-orange-500 font-bold' :
                                        stage.status === 'ACTIVE' ? 'text-green-600 font-bold' : ''
                                }>
                                    {stage.status}
                                </span>
                                {stage.status === 'COMPLETED' && <span className="text-green-600 font-bold">✓</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Global Progress Text */}
            <div className="mt-8 flex justify-end">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs">
                    <span className="text-vmap-text-secondary">Overall Transit Completion:</span>
                    <span className="font-bold text-green-600">{totalProgress}%</span>
                </div>
            </div>
        </div>
    );
}
