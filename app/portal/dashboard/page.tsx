'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import PageHeader from '@/components/PageHeader';
import { getSession, getClientById, clearSession } from '@/lib/storage';
import { Client } from '@/lib/types';
import styles from './page.module.css';

export default function DashboardPage() {
    const router = useRouter();
    const [client, setClient] = useState<Client | null>(null);
    const [lastAccess, setLastAccess] = useState<string>('');

    useEffect(() => {
        const session = getSession();

        if (session.isAuthed && session.clientId) {
            const clientData = getClientById(session.clientId);
            setClient(clientData);
            setLastAccess(session.lastAccess || 'N/A');
        }
    }, []);

    const handleLogout = () => {
        clearSession();
        router.push('/portal');
    };

    return (
        <ProtectedRoute>
            <main>
                <PageHeader title="Client Profile" />
                <section className="section">
                    <div className="container">
                        <div className={styles.dashboardContainer}>
                            <div className="access-indicator">Access Logged</div>

                            {client && (
                                <div className={styles.profileGrid}>
                                    <div className={styles.profileCard}>
                                        <div className={styles.cardLabel}>Client Name</div>
                                        <div className={styles.cardValue}>{client.clientName}</div>
                                    </div>

                                    <div className={styles.profileCard}>
                                        <div className={styles.cardLabel}>Organization Type</div>
                                        <div className={styles.cardValue}>{client.partnerType}</div>
                                    </div>

                                    <div className={styles.profileCard}>
                                        <div className={styles.cardLabel}>Assigned Liaison</div>
                                        <div className={styles.cardValue}>{client.assignedLiaison.name}</div>
                                        <div className={styles.cardSubvalue}>{client.assignedLiaison.channel}</div>
                                    </div>

                                    <div className={styles.profileCard}>
                                        <div className={styles.cardLabel}>Authorization Tier</div>
                                        <div className={styles.cardValue}>{client.authorizationTier}</div>
                                    </div>

                                    <div className={styles.profileCard}>
                                        <div className={styles.cardLabel}>Last Access</div>
                                        <div className={styles.cardValue}>
                                            {lastAccess !== 'N/A'
                                                ? new Date(lastAccess).toLocaleString()
                                                : 'N/A'}
                                        </div>
                                    </div>

                                    <div className={styles.profileCard}>
                                        <div className={styles.cardLabel}>Compliance Status</div>
                                        <div className={styles.cardValue}>Sanctions Screening: Cleared (Mock)</div>
                                    </div>
                                </div>
                            )}

                            <div className={styles.logoutSection}>
                                <button onClick={handleLogout} className="btn btn-secondary">
                                    Secure Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </ProtectedRoute>
    );
}
