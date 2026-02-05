'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminAuth } from '@/lib/storage';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Hardcoded credentials for demo
        const ADMIN_EMAIL = 'admin@vmap.local';
        const ADMIN_PASSWORD = 'vmap-admin-2026';

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            setAdminAuth(true);
            router.push('/admin');
        } else {
            setError('Invalid credentials');
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-vmap-bg flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="bg-white border border-gray-200 rounded p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-vmap-text mb-2">
                            Admin Access
                        </h1>
                        <p className="text-sm text-vmap-text-secondary">
                            Vanguard Maritime Asset Protection
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-vmap-red rounded text-sm text-vmap-red">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-vmap-text mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-vmap-red transition-colors"
                                placeholder="admin@vmap.local"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-vmap-text mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-vmap-red transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-4 py-3 bg-vmap-red text-white font-medium rounded hover:bg-red-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Authenticating...' : 'Access Admin Console'}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <p className="text-xs text-vmap-text-secondary text-center">
                            Demo credentials: admin@vmap.local / vmap-admin-2026
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
