import PageHeader from '@/components/PageHeader';
import ComplianceBadge from '@/components/ComplianceBadge';
import styles from './page.module.css';

export default function SecurityPage() {
    const certifications = [
        { title: 'Supply Chain Security', code: 'ISO 28000' },
        { title: 'International Ship & Port Facility Security', code: 'ISPS Code Compliance' },
        { title: 'Baltic and International Maritime Council', code: 'BIMCO Affiliation' },
    ];

    return (
        <main>
            <PageHeader
                title="Security, Compliance & Governance"
                subtitle="Institutional-grade security frameworks and regulatory compliance."
            />
            <section className="section">
                <div className="container">
                    <h2>Certifications & Standards</h2>
                    <div className={styles.badgeGrid}>
                        {certifications.map((cert, index) => (
                            <ComplianceBadge key={index} title={cert.title} code={cert.code} />
                        ))}
                    </div>

                    <div className="separator"></div>

                    <h2>Compliance Framework</h2>
                    <p style={{ maxWidth: '800px', marginBottom: 'var(--spacing-lg)' }}>
                        Operations are conducted under customs bond facilitation protocols, sanctions screening
                        procedures, and AML compliance frameworks aligned with international maritime
                        regulations.
                    </p>

                    <div className="separator"></div>

                    <h2>Access & Monitoring</h2>
                    <div className={styles.monitoringBox}>
                        <p>All portal access attempts are logged and monitored.</p>
                        <p>Operational visibility is role-based and authorization-gated.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
