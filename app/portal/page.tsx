'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import { validateCredentials } from '@/lib/storage';
import styles from './page.module.css';

export default function PortalPage() {
    const router = useRouter();
    const [authorizationCode, setAuthorizationCode] = useState('');
    const [consignmentId, setConsignmentId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Client-side validation using MongoDB (now async)
            const result = await validateCredentials(authorizationCode, consignmentId);

            if (result.valid && result.clientId) {
                // Store temporary session data (not fully authenticated yet)
                sessionStorage.setItem('temp_client_id', result.clientId);

                // Redirect to 2FA
                router.push('/portal/2fa');
            } else {
                setError('Access denied. Verify credentials and retry.');
            }
        } catch (_err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <PageHeader
                title="Secure Client Portal"
                subtitle="Access to operational data requires valid authorization."
            />
            <section className="section">
                <div className="container">
                    <div className={styles.portalContainer}>
                        <div className={styles.accessNotice}>
                            <p>Access to operational data requires a valid Authorization Code and Consignment ID.</p>
                            <p>All access attempts are logged and monitored.</p>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className="form-group">
                                <label htmlFor="authCode" className="form-label">
                                    Authorization Code
                                </label>
                                <input
                                    type="text"
                                    id="authCode"
                                    className="form-input form-input-code"
                                    value={authorizationCode}
                                    onChange={(e) => setAuthorizationCode(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="consignmentId" className="form-label">
                                    Consignment ID
                                </label>
                                <input
                                    type="text"
                                    id="consignmentId"
                                    className="form-input form-input-code"
                                    value={consignmentId}
                                    onChange={(e) => setConsignmentId(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? 'Verifying...' : 'Continue to Verification'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
