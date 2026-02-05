import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function EnvironmentsPage() {
    const environments = [
        {
            title: 'North Sea — Severe Weather Operations',
            description: 'High-risk maritime operations in challenging weather conditions.',
        },
        {
            title: 'South China Sea — Infrastructure Security',
            description: 'Strategic asset protection in geopolitically sensitive regions.',
        },
        {
            title: 'Offshore Transit Corridors — High-Risk Zones',
            description: 'Secure transit through contested and volatile maritime areas.',
        },
    ];

    return (
        <main>
            <PageHeader
                title="Operational Environments"
                subtitle="Experience in the world's most challenging maritime environments."
            />
            <section className="section">
                <div className="container">
                    <div className={styles.environmentList}>
                        {environments.map((env, index) => (
                            <div key={index} className={styles.environmentItem}>
                                <h3>{env.title}</h3>
                                <p>{env.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className={styles.disclaimer}>
                        <p>We do not publish client manifests or operational specifics.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
