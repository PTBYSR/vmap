import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function PresencePage() {
    const hubs = ['Singapore', 'Hong Kong', 'London', 'Dubai'];

    return (
        <main>
            <PageHeader
                title="Regional Operational Hubs"
                subtitle="Global presence for routing continuity and jurisdictional coordination."
            />
            <section className="section">
                <div className="container">
                    <div className={styles.hubGrid}>
                        {hubs.map((hub, index) => (
                            <div key={index} className={styles.hubCard}>
                                <div className={styles.hubIcon}>◉</div>
                                <h3>{hub}</h3>
                            </div>
                        ))}
                    </div>

                    <p className={styles.note}>
                        Regional hubs support routing continuity and jurisdictional coordination.
                    </p>
                </div>
            </section>
        </main>
    );
}
