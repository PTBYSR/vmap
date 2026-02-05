import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function EthicsPage() {
    const frameworks = [
        'Anti-Money Laundering (AML) Framework',
        'Sanctions & Jurisdictional Screening',
        'Client Due Diligence Protocols',
        'Incident reporting and auditability',
    ];

    return (
        <main>
            <PageHeader
                title="Ethics, Compliance & Risk Management"
                subtitle="Institutional governance and regulatory adherence."
            />
            <section className="section">
                <div className="container">
                    <h2>Compliance Frameworks</h2>
                    <ul className={styles.frameworkList}>
                        {frameworks.map((framework, index) => (
                            <li key={index}>{framework}</li>
                        ))}
                    </ul>

                    <div className={styles.disclaimer}>
                        <p>Services are offered to pre-approved corporate and institutional partners only.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
