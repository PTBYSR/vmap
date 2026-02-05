'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { setSession } from '@/lib/storage';
import styles from './page.module.css';

export default function TwoFactorPage() {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Check if user came from login page
        const tempClientId = sessionStorage.getItem('temp_client_id');
        if (!tempClientId) {
            router.push('/portal');
        }
    }, [router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Call API to verify OTP
            const response = await fetch('/api/portal/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp }),
            });

            const data = await response.json();

            if (data.success) {
                // Get client ID from session storage
                const clientId = sessionStorage.getItem('temp_client_id');

                if (clientId) {
                    // Set authenticated session
                    setSession({
                        isAuthed: true,
                        clientId,
                        lastAccess: new Date().toISOString(),
                    });

                    // Clear temp storage
                    sessionStorage.removeItem('temp_client_id');

                    // Redirect to dashboard
                    router.push('/portal/dashboard');
                }
            } else {
                setError('Verification failed.');
            }
        } catch (_err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <PageHeader title="Verification Required" />
            <section className="section">
                <div className="container">
                    <div className={styles.verificationContainer}>
                        <p className={styles.instruction}>Enter the 6-digit verification code to continue.</p>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className="form-group">
                                <label htmlFor="otp" className="form-label">
                                    Verification Code
                                </label>
                                <input
                                    type="text"
                                    id="otp"
                                    className="form-input form-input-code"
                                    placeholder="123456"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    maxLength={6}
                                    required
                                    style={{ fontSize: '1.5rem', textAlign: 'center', letterSpacing: '0.5em' }}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
