import PageHeader from '@/components/PageHeader';
import SpecList from '@/components/SpecList';
import Image from 'next/image';
import styles from './page.module.css';

export default function TechnicalPage() {
    const specifications = [
        'Encrypted GPS telemetry',
        'Electromagnetic seal integrity',
        'Tamper-evident pressurized housing',
        'Redundant environmental monitoring',
        'Chain-of-custody audit trail',
    ];

    return (
        <main>
            <PageHeader
                title="Technical Assets"
                subtitle="Purpose-built security infrastructure for high-value cargo protection."
            />
            <section className="section">
                <div className="container">
                    <h2>S-14 Secure Transit Container</h2>
                    <div className={styles.technicalGrid}>
                        <div className={styles.diagram}>
                            <Image
                                src="/images/s14-diagram.png"
                                alt="S-14 Secure Transit Container Technical Diagram"
                                width={600}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <div className={styles.specs}>
                            <h3>Technical Specifications</h3>
                            <SpecList items={specifications} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
