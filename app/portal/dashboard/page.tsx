'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import SegmentedProgressBar from '@/components/SegmentedProgressBar';
import { getSession, getConsignment, clearSession } from '@/lib/storage';
import { ConsignmentData } from '@/lib/types';

export default function DashboardPage() {
    const router = useRouter();
    const [consignment, setConsignment] = useState<ConsignmentData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const session = getSession();

            if (session.isAuthed) {
                // In production, we'd fetch based on the session's active consignment
                const data = await getConsignment('VM-7712');
                setConsignment(data);
            }
            setLoading(false);
        };

        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        clearSession();
        router.push('/portal');
    };

    if (loading) {
        return (
            <ProtectedRoute>
                <main className="min-h-screen bg-vmap-bg">
                    <div className="container mx-auto px-4 py-32 flex flex-col items-center">
                        <div className="animate-spin w-8 h-8 border-4 border-vmap-red border-t-transparent rounded-full mb-4"></div>
                        <div className="text-vmap-text-secondary font-medium uppercase tracking-widest text-xs">
                            Establishing Secure Link...
                        </div>
                    </div>
                </main>
            </ProtectedRoute>
        );
    }

    if (!consignment) {
        return (
            <ProtectedRoute>
                <main className="min-h-screen bg-vmap-bg">
                    <div className="container mx-auto px-4 py-32">
                        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded p-8 text-center">
                            <div className="text-gray-300 text-4xl mb-4">⚠️</div>
                            <h2 className="text-lg font-semibold text-vmap-text mb-2">No Active Consignment</h2>
                            <p className="text-sm text-vmap-text-secondary">
                                No operational data found for your authorization tier.
                                Please contact your assigned liaison desk for assistance.
                            </p>
                        </div>
                    </div>
                </main>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <main className="min-h-screen bg-vmap-bg">
                {/* Header */}
                <div className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-vmap-text uppercase tracking-tight">
                                    Operational Transit Dashboard
                                </h1>
                                <p className="text-xs text-vmap-text-secondary mt-1 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Secure Connection Active | Authorization: {consignment.consignmentId} | {consignment.transportMedium} Freight
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 text-xs font-semibold bg-white border border-gray-300 rounded text-vmap-text hover:bg-gray-50 transition-colors uppercase tracking-widest"
                            >
                                Secure Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Section */}
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                            {/* Dashboard Subheader */}
                            <div className="bg-gray-50 border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                                <div className="text-xs font-bold text-vmap-text-secondary uppercase tracking-widest">
                                    Real-Time Custodial Progress
                                </div>
                                <div className="text-[10px] text-vmap-text-secondary">
                                    Last Updated: {new Date(consignment.updatedAt).toLocaleString()}
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                                    <div>
                                        <h2 className="text-lg font-bold text-vmap-text mb-1">
                                            Consignment Progress
                                        </h2>
                                        <p className="text-sm text-vmap-text-secondary">
                                            Stage Location – Jurisdictional Tracking
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-vmap-red uppercase mb-1">
                                            Unique Identifier
                                        </div>
                                        <div className="text-lg font-mono font-bold text-vmap-text">
                                            {consignment.consignmentId}
                                        </div>
                                    </div>
                                </div>

                                <SegmentedProgressBar
                                    stages={consignment.progress.stages}
                                    totalProgress={consignment.progress.totalProgress || 0}
                                />
                            </div>

                            {/* Operational Notes Strip */}
                            <div className="bg-orange-50 border-t border-orange-100 px-8 py-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-vmap-orange text-lg">ℹ</span>
                                    <p className="text-xs text-orange-800 leading-relaxed">
                                        <strong>Operational Notice:</strong> Geographic coordinates and movement telemetry are
                                        obfuscated for security protocols. Status indicators reflect jurisdictional hand-off
                                        and custodial clearance. For granular coordination, use the direct liaison link.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Support Footer */}
                        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-vmap-text-secondary gap-4 px-4">
                            <div>
                                &copy; 2026 Vanguard Maritime Asset Protection | Information classified as RESTRICTED
                            </div>
                            <div className="flex gap-6">
                                <a href="#" className="hover:text-vmap-red transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-vmap-red transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-vmap-red transition-colors">Compliance Verification</a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </ProtectedRoute>
    );
}
