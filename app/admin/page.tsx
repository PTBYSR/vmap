'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminProtectedRoute from '@/components/AdminProtectedRoute';
import SegmentedProgressBar from '@/components/SegmentedProgressBar';
import {
    getConsignment,
    setConsignment,
    clearAdminSession,
} from '@/lib/storage';
import { ConsignmentData, StageStatus, Stage } from '@/lib/types';
import CustomDatePicker from '@/components/CustomDatePicker';

export default function AdminPage() {
    const router = useRouter();
    const [consignmentId, setConsignmentId] = useState('VM-7712');
    const [consignment, setConsignmentState] = useState<ConsignmentData | null>(null);
    const [message, setMessage] = useState('');

    // Form states
    const [progressPercent, setProgressPercent] = useState(0);
    const [transportMedium, setTransportMedium] = useState<'Air' | 'Sea' | 'Land' | 'Pending'>('Pending');
    const [stages, setStages] = useState<Stage[]>([]);
    const [loading, setLoading] = useState(false);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

    const loadConsignment = async (id: string) => {
        setLoading(true);
        const data = await getConsignment(id);
        if (data) {
            setConsignmentState(data);
            setProgressPercent((data.progressPercent ?? data.progress.totalProgress) || 0);
            setTransportMedium(data.transportMedium || 'Pending');
            setStages(data.progress.stages);
            setMessage(`Loaded: ${id}`);
        } else {
            setMessage(`Not found: ${id}`);
        }
        setLoading(false);
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadConsignment('VM-7712');
    }, []);

    const handleLoad = async () => {
        await loadConsignment(consignmentId);
    };

    const handleSeedDefault = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/seed', { method: 'POST' });
            if (response.ok) {
                await loadConsignment('VM-7712');
                setConsignmentId('VM-7712');
                setMessage('Database re-seeded successfully');
            } else {
                setMessage('Failed to seed database');
            }
        } catch {
            setMessage('Error seeding database');
        }
        setLoading(false);
    };

    const calculateCurrentStage = (progress: number) => {
        if (progress >= 100) return 4;
        if (progress >= 75) return 4;
        if (progress >= 50) return 3;
        if (progress >= 25) return 2;
        return 1;
    };

    const calculateStageStatus = (stageId: number, progress: number): StageStatus => {
        const stageEnd = stageId * 25;
        const stageStart = (stageId - 1) * 25;
        if (progress >= stageEnd) return 'COMPLETED';
        if (progress > stageStart) return 'IN_PROGRESS';
        return 'LOCKED';
    };

    const getPreviewStages = (): Stage[] | undefined => {
        if (!consignment) return undefined;
        return stages.map((stage, index) => ({
            ...stage,
            status: calculateStageStatus(index + 1, progressPercent)
        }));
    };

    const handleSave = async () => {
        if (!consignment) return;
        setLoading(true);

        const updatedConsignment: ConsignmentData = {
            ...consignment,
            progressPercent,
            progress: {
                totalProgress: progressPercent,
                currentStage: calculateCurrentStage(progressPercent),
                stages: stages.map((stage, index) => ({
                    ...stage,
                    status: calculateStageStatus(index + 1, progressPercent),
                })),
            },
            transportMedium,
            updatedAt: new Date().toISOString(),
        };

        const success = await setConsignment(updatedConsignment);
        if (success) {
            setConsignmentState(updatedConsignment);
            setMessage('Saved successfully');
            setTimeout(() => setMessage(''), 3000); // Auto-dismiss
        } else {
            setMessage('Error: Could not save');
            setTimeout(() => setMessage(''), 5000); // Error stays longer
        }
        setLoading(false);
    };

    const handleStageChange = (index: number, field: keyof Stage, value: string) => {
        const newStages = [...stages];
        newStages[index] = { ...newStages[index], [field]: value };
        setStages(newStages);
    };

    const handleLogout = () => {
        clearAdminSession();
        router.push('/admin/login');
    };

    const [activeTab, setActiveTab] = useState<'find' | 'calibrate' | 'preview'>('find');

    return (
        <AdminProtectedRoute>
            <main className="min-h-screen bg-vmap-bg font-sans">
                {/* Header */}
                <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-vmap-red flex items-center justify-center rounded shadow-sm">
                                    <span className="text-white font-bold text-sm">V</span>
                                </div>
                                <h1 className="text-sm font-black text-vmap-text uppercase tracking-widest">
                                    Admin
                                </h1>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-vmap-text-secondary hover:text-vmap-red transition-colors"
                                title="Logout"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 0 01-3-3V7a3 0 013-3h4a3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6 max-w-4xl">
                    {/* Floating Toast */}
                    {message && (
                        <div className="fixed bottom-6 right-6 z-[200] animate-in slide-in-from-right-5 fade-in duration-300">
                            <div className={`px-4 py-2.5 rounded-lg shadow-xl border flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest ${message.includes('Error') ? 'bg-red-50 border-red-100 text-vmap-red' : 'bg-green-50 border-green-100 text-green-700'
                                }`}>
                                <span>{message}</span>
                                <button
                                    onClick={() => setMessage('')}
                                    className="ml-auto p-1 hover:bg-black/5 rounded transition-colors text-[10px]"
                                    title="Close"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex gap-1 bg-gray-100/50 p-1 rounded-lg mb-8">
                        {[
                            { id: 'find', label: 'Find', icon: '🔍' },
                            { id: 'calibrate', label: 'Calibrate', icon: '⚙️' },
                            { id: 'preview', label: 'Preview', icon: '👁️' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'find' | 'calibrate' | 'preview')}
                                className={`flex-1 py-2 px-1 rounded-md text-[9px] font-black uppercase tracking-[0.1em] transition-all flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 ${activeTab === tab.id
                                    ? 'bg-white text-vmap-red shadow-sm'
                                    : 'text-vmap-text-secondary hover:text-vmap-text'
                                    }`}
                            >
                                <span className="text-xs sm:text-sm">{tab.icon}</span>
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Panels */}
                    <div className="animate-in fade-in zoom-in-95 duration-300">
                        {/* Tab: Find */}
                        {activeTab === 'find' && (
                            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm max-w-md mx-auto">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[9px] font-black text-vmap-text-secondary mb-3 uppercase tracking-[0.2em]">
                                            Tracking Number
                                        </label>
                                        <input
                                            type="text"
                                            value={consignmentId}
                                            onChange={(e) => setConsignmentId(e.target.value)}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg font-mono text-sm focus:outline-none focus:ring-1 focus:ring-vmap-red/20 focus:border-vmap-red transition-all"
                                            placeholder="VM-XXXX"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleLoad}
                                            disabled={loading}
                                            className="w-full py-4 bg-vmap-red text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-lg hover:shadow-lg hover:shadow-red-100 active:scale-[0.98] transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'Searching...' : 'Load Parcel'}
                                        </button>
                                        <button
                                            onClick={handleSeedDefault}
                                            disabled={loading}
                                            className="w-full py-3 text-[9px] font-bold text-vmap-text-secondary uppercase tracking-widest hover:text-vmap-text transition-colors"
                                        >
                                            Reset Demo Database
                                        </button>
                                    </div>

                                    {consignment && (
                                        <div className="pt-6 border-t border-gray-50 flex justify-between items-center text-[9px] font-bold text-vmap-text-secondary uppercase tracking-tight">
                                            <span>Active: {consignment.consignmentId}</span>
                                            <span>Sync: {new Date(consignment.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Tab: Calibrate */}
                        {activeTab === 'calibrate' && (
                            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                                {consignment ? (
                                    <div className="space-y-10">
                                        {/* Transport & Progress Side-by-Side */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div>
                                                <label className="block text-[9px] font-black text-vmap-text-secondary mb-4 uppercase tracking-[0.2em]">
                                                    Logistical Mode
                                                </label>
                                                <div className="flex gap-2">
                                                    {['Air', 'Sea', 'Land'].map((mode) => (
                                                        <button
                                                            key={mode}
                                                            onClick={() => setTransportMedium(mode as 'Air' | 'Sea' | 'Land')}
                                                            className={`flex-1 py-3 text-[9px] font-black border rounded-lg transition-all uppercase tracking-widest ${transportMedium === mode
                                                                ? 'bg-vmap-red border-vmap-red text-white shadow-md'
                                                                : 'bg-white border-gray-100 text-vmap-text-secondary hover:border-vmap-red/20'
                                                                }`}
                                                        >
                                                            {mode}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <label className="text-[9px] font-black text-vmap-text-secondary uppercase tracking-[0.2em]">
                                                        Journey: {progressPercent}%
                                                    </label>
                                                    <span className="text-[9px] font-black text-vmap-red uppercase">
                                                        Stage {calculateCurrentStage(progressPercent)}
                                                    </span>
                                                </div>
                                                <div className="relative mt-14 mb-16 h-2 flex items-center">
                                                    {/* Background Track */}
                                                    <div className="absolute left-0 right-0 h-1.5 bg-gray-100 rounded-full"></div>

                                                    {/* Progress Fill */}
                                                    <div
                                                        className="absolute left-0 h-1.5 bg-vmap-red rounded-full transition-all duration-300 pointer-events-none"
                                                        style={{ width: `${progressPercent}%` }}
                                                    ></div>

                                                    {/* The Slider Input (Invisible track, visible thumb) */}
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="100"
                                                        value={progressPercent}
                                                        onChange={(e) => setProgressPercent(Number(e.target.value))}
                                                        className="absolute inset-x-0 w-full h-6 bg-transparent appearance-none cursor-pointer z-20 accent-vmap-red [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent"
                                                    />

                                                    {/* Snap Points & Labels */}
                                                    {[0, 25, 50, 75, 100].map((val) => (
                                                        <div
                                                            key={val}
                                                            className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-10"
                                                            style={{ left: `${val}%` }}
                                                        >
                                                            {/* Snap Circle */}
                                                            <button
                                                                type="button"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setProgressPercent(val);
                                                                }}
                                                                className={`w-3.5 h-3.5 rounded-full border bg-white flex items-center justify-center transition-all pointer-events-auto -translate-y-7 ${progressPercent === val
                                                                    ? 'border-vmap-red scale-110 shadow-sm'
                                                                    : 'border-gray-200 hover:border-vmap-red/40'
                                                                    }`}
                                                            >
                                                                {progressPercent === val && (
                                                                    <div className="w-1.5 h-1.5 bg-vmap-red rounded-full" />
                                                                )}
                                                            </button>

                                                            {/* Label */}
                                                            <span className={`absolute top-full mt-4 text-[9px] font-black tracking-tighter transition-colors ${progressPercent === val ? 'text-vmap-red' : 'text-gray-300'
                                                                }`}>
                                                                {val}%
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stage Table */}
                                        <div className="pt-6 border-t border-gray-50">
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="border-b border-gray-50">
                                                            <th className="pb-3 text-[9px] font-black text-vmap-text-secondary uppercase tracking-widest">Stage</th>
                                                            <th className="pb-3 text-[9px] font-black text-vmap-text-secondary uppercase tracking-widest">Location</th>
                                                            <th className="pb-3 text-[9px] font-black text-vmap-text-secondary uppercase tracking-widest">Timeline</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-50">
                                                        {stages.map((stage, index) => {
                                                            const previousStageDate = index > 0 ? stages[index - 1].date : undefined;
                                                            const flaggedDates: Record<string, number> = {};
                                                            stages.forEach((s, i) => {
                                                                if (i !== index && s.date && s.date !== 'Pending') {
                                                                    flaggedDates[s.date] = s.id;
                                                                }
                                                            });

                                                            return (
                                                                <tr key={stage.id}>
                                                                    <td className="py-2 pr-4">
                                                                        <input
                                                                            type="text"
                                                                            value={stage.name}
                                                                            onChange={(e) => handleStageChange(index, 'name', e.target.value)}
                                                                            className="w-full bg-transparent border-none p-0 text-[10px] font-black text-vmap-red uppercase tracking-widest focus:outline-none"
                                                                        />
                                                                    </td>
                                                                    <td className="py-2 pr-4">
                                                                        <input
                                                                            type="text"
                                                                            value={stage.location}
                                                                            onChange={(e) => handleStageChange(index, 'location', e.target.value)}
                                                                            className="w-full bg-white border border-gray-100 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-vmap-red/30"
                                                                        />
                                                                    </td>
                                                                    <td className="py-2">
                                                                        <CustomDatePicker
                                                                            value={stage.date}
                                                                            onChange={(date) => handleStageChange(index, 'date', date)}
                                                                            minDate={previousStageDate}
                                                                            flaggedDates={flaggedDates}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsSaveModalOpen(true)}
                                            disabled={loading}
                                            className="w-full py-4 bg-vmap-red text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-xl hover:shadow-xl hover:shadow-red-100 transition-all disabled:opacity-50"
                                        >
                                            {loading ? 'SAVING...' : 'SAVE CHANGES'}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="py-20 text-center text-vmap-text-secondary text-[10px] font-black uppercase tracking-widest opacity-30">
                                        No active parcel loaded
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Tab: Preview */}
                        {activeTab === 'preview' && (
                            <div className="space-y-6">
                                {consignment ? (
                                    <>
                                        <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
                                            <SegmentedProgressBar
                                                stages={getPreviewStages() || []}
                                                totalProgress={progressPercent}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[9px] font-black text-vmap-text-secondary uppercase tracking-[0.2em] mb-4">
                                                Live dashboard visualization for клиента
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-white border border-gray-100 rounded-xl p-20 text-center text-vmap-text-secondary text-[10px] font-black uppercase tracking-widest opacity-30 shadow-sm">
                                        Load a parcel to see preview
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Save Confirmation Modal */}
            {isSaveModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsSaveModalOpen(false)}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 fade-in-0 duration-200">
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 bg-red-50 text-vmap-red rounded-full flex items-center justify-center mx-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Save Changes?</h3>
                                <p className="text-xs text-secondary leading-relaxed">
                                    This will update the live tracking information for the client. This action cannot be undone.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={() => setIsSaveModalOpen(false)}
                                    className="flex-1 py-3 px-4 bg-gray-50 text-gray-700 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleSave();
                                        setIsSaveModalOpen(false);
                                    }}
                                    className="flex-1 py-3 px-4 bg-vmap-red text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:shadow-lg hover:shadow-red-50 transition-all"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AdminProtectedRoute>
    );
}
