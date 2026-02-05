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

export default function AdminPage() {
    const router = useRouter();
    const [consignmentId, setConsignmentId] = useState('VM-7712');
    const [consignment, setConsignmentState] = useState<ConsignmentData | null>(null);
    const [message, setMessage] = useState('');

    // Form states
    const [totalProgress, setTotalProgress] = useState(0);
    const [transportMedium, setTransportMedium] = useState<'Air' | 'Sea' | 'Land' | 'Pending'>('Pending');
    const [stageLocations, setStageLocations] = useState<string[]>(['', '', '', '']);
    const [loading, setLoading] = useState(false);

    const loadConsignment = async (id: string) => {
        setLoading(true);
        const data = await getConsignment(id);
        if (data) {
            setConsignmentState(data);
            setTotalProgress(data.progress.totalProgress || 0);
            setTransportMedium(data.transportMedium || 'Pending');
            setStageLocations(data.progress.stages.map((s) => s.location));
            setMessage(`Loaded consignment: ${id}`);
        } else {
            setMessage(`Consignment ${id} not found`);
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
        } catch (_error) {
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
        return consignment.progress.stages.map((stage, index) => ({
            ...stage,
            location: stageLocations[index],
            status: calculateStageStatus(index + 1, totalProgress)
        }));
    };

    const handleSave = async () => {
        if (!consignment) return;
        setLoading(true);

        const updatedConsignment: ConsignmentData = {
            ...consignment,
            progress: {
                totalProgress,
                currentStage: calculateCurrentStage(totalProgress),
                stages: consignment.progress.stages.map((stage, index) => ({
                    ...stage,
                    location: stageLocations[index],
                    status: calculateStageStatus(index + 1, totalProgress),
                })),
            },
            transportMedium,
            updatedAt: new Date().toISOString(),
        };

        const success = await setConsignment(updatedConsignment);
        if (success) {
            setConsignmentState(updatedConsignment);
            setMessage('Changes saved successfully');
        } else {
            setMessage('Failed to save changes');
        }
        setLoading(false);
    };

    const handleLocationChange = (index: number, value: string) => {
        const newLocations = [...stageLocations];
        newLocations[index] = value;
        setStageLocations(newLocations);
    };

    const handleLogout = () => {
        clearAdminSession();
        router.push('/admin/login');
    };

    return (
        <AdminProtectedRoute>
            <main className="min-h-screen bg-vmap-bg">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-vmap-red flex items-center justify-center rounded">
                                    <span className="text-white font-bold">V</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-vmap-text uppercase tracking-tight">
                                        Admin Console
                                    </h1>
                                    <p className="text-[10px] text-vmap-text-secondary uppercase tracking-widest font-semibold">
                                        Custodial Oversight System
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-xs font-bold border border-gray-300 rounded hover:bg-gray-50 transition-colors uppercase tracking-widest"
                            >
                                Secure Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Message */}
                    {message && (
                        <div className="mb-6 p-4 bg-gray-900 border-l-4 border-vmap-red text-white text-sm animate-in fade-in slide-in-from-top-4 duration-300">
                            <span className="font-bold mr-2 text-vmap-red">NOTICE:</span> {message}
                        </div>
                    )}

                    {/* TOP SECTION: Client Preview */}
                    {consignment && (
                        <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex justify-between items-center">
                                <h2 className="text-[10px] font-bold text-vmap-text-secondary uppercase tracking-widest">
                                    Live Client Dashboard Preview
                                </h2>
                                <span className="text-[10px] px-2 py-0.5 bg-vmap-orange/10 text-vmap-orange border border-vmap-orange/20 rounded font-bold uppercase">
                                    Preview Mode
                                </span>
                            </div>
                            <div className="p-6 bg-gray-50/30">
                                <SegmentedProgressBar
                                    stages={getPreviewStages() || []}
                                    totalProgress={totalProgress}
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* LEFT PANEL: Consignment Control */}
                        <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                            <h2 className="text-sm font-bold text-vmap-text mb-6 uppercase tracking-wider border-b border-gray-100 pb-2">
                                Data Retrieval
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-vmap-text-secondary mb-2 uppercase tracking-widest">
                                        Consignment Reference
                                    </label>
                                    <input
                                        type="text"
                                        value={consignmentId}
                                        onChange={(e) => setConsignmentId(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded font-mono text-sm focus:outline-none focus:border-vmap-red bg-gray-50"
                                        placeholder="VM-7712"
                                    />
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={handleLoad}
                                        disabled={loading}
                                        className="flex-1 px-4 py-3 bg-vmap-red text-white text-xs font-bold rounded hover:bg-red-800 transition-colors disabled:opacity-50 uppercase tracking-widest"
                                    >
                                        Pull Data
                                    </button>
                                    <button
                                        onClick={handleSeedDefault}
                                        disabled={loading}
                                        className="flex-1 px-4 py-3 border border-gray-300 text-xs font-bold rounded hover:bg-gray-50 transition-colors disabled:opacity-50 uppercase tracking-widest"
                                    >
                                        Factory Seed
                                    </button>
                                </div>
                            </div>

                            {consignment && (
                                <div className="mt-8 pt-6 border-t border-gray-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-[10px] font-bold text-vmap-text-secondary uppercase mb-1">Status</div>
                                            <div className="text-xs font-bold text-green-600 uppercase">Synchronized</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-vmap-text-secondary uppercase mb-1">Last Write</div>
                                            <div className="text-xs font-mono text-vmap-text">{new Date(consignment.updatedAt).toLocaleTimeString()}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RIGHT PANEL: Progress Calibration */}
                        <div className="bg-white border border-gray-200 rounded p-6 shadow-sm">
                            <h2 className="text-sm font-bold text-vmap-text mb-6 uppercase tracking-wider border-b border-gray-100 pb-2">
                                Journey Calibration
                            </h2>

                            {consignment ? (
                                <div className="space-y-8">
                                    {/* Transport Medium Selector */}
                                    <div>
                                        <label className="block text-[10px] font-bold text-vmap-text-secondary mb-3 uppercase tracking-widest">
                                            Transport Medium / Logistical Mode
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['Air', 'Sea', 'Land'].map((mode) => (
                                                <button
                                                    key={mode}
                                                    onClick={() => setTransportMedium(mode as 'Air' | 'Sea' | 'Land')}
                                                    className={`px-3 py-2 text-[10px] font-bold border rounded transition-all uppercase tracking-widest ${transportMedium === mode
                                                        ? 'bg-vmap-red border-vmap-red text-white shadow-sm'
                                                        : 'bg-white border-gray-200 text-vmap-text-secondary hover:border-vmap-red/30'
                                                        }`}
                                                >
                                                    {mode === 'Air' && '✈️ '}
                                                    {mode === 'Sea' && '🚢 '}
                                                    {mode === 'Land' && '🚛 '}
                                                    {mode}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Global Calibrator */}
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <label className="text-[10px] font-bold text-vmap-text-secondary uppercase tracking-widest">
                                                Global Progress: {totalProgress}%
                                            </label>
                                            <span className="text-[10px] font-bold px-2 py-1 bg-vmap-red text-white uppercase tracking-tighter rounded">
                                                Stage {calculateCurrentStage(totalProgress)} Active
                                            </span>
                                        </div>

                                        <div className="relative pt-2 pb-8">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={totalProgress}
                                                onChange={(e) => setTotalProgress(Number(e.target.value))}
                                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-vmap-red relative z-10"
                                            />
                                            {/* Unified Scale Ticks */}
                                            <div className="absolute top-1 left-0 w-full h-4 flex justify-between pointer-events-none">
                                                {[0, 25, 50, 75, 100].map((val) => (
                                                    <div key={val} className="flex flex-col items-center flex-1 first:flex-none first:w-0 last:flex-none last:w-0" style={{ width: val === 0 || val === 100 ? '0' : '25%' }}>
                                                        <div className={`w-0.5 h-3 ${totalProgress >= val ? 'bg-vmap-red' : 'bg-gray-200'}`} />
                                                        <span className="text-[9px] font-bold text-gray-400 mt-2">{val}%</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location Overrides */}
                                    <div className="space-y-4 pt-4 border-t border-gray-100">
                                        <h3 className="text-[10px] font-bold text-vmap-text-secondary uppercase tracking-widest mb-4">
                                            Jurisdictional Location Mapping
                                        </h3>
                                        {consignment.progress.stages.map((stage, index) => (
                                            <div key={stage.id} className="relative">
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-vmap-text-secondary border border-gray-200">
                                                    {stage.id}
                                                </div>
                                                <input
                                                    type="text"
                                                    value={stageLocations[index]}
                                                    onChange={(e) => handleLocationChange(index, e.target.value)}
                                                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded text-xs focus:outline-none focus:border-vmap-red bg-white font-medium"
                                                    placeholder={`Coordinates or Location for Stage ${stage.id}`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Commit Changes */}
                                    <button
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="w-full px-4 py-4 bg-vmap-red text-white text-xs font-bold rounded hover:bg-red-800 transition-all shadow-md active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.2em]"
                                    >
                                        {loading ? 'Committing Telemetry...' : 'Commit Tracking Updates'}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
                                    <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl">📡</span>
                                    </div>
                                    <p className="text-xs font-bold text-vmap-text-secondary uppercase tracking-widest max-w-[200px]">
                                        Offline | Connection Pending
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </AdminProtectedRoute>
    );
}
