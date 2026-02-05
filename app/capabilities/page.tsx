import PageHeader from '@/components/PageHeader';
import CapabilityCard from '@/components/CapabilityCard';
import styles from './page.module.css';

export default function CapabilitiesPage() {
    const capabilities = [
        {
            title: 'Tactical Extraction',
            description:
                'Recovery and relocation of high-value assets from restricted, contested, or unstable maritime environments.',
            details:
                'Designed for complex routing, jurisdictional sensitivity, and time-critical execution. Operational parameters include threat assessment, route optimization through contested waters, customs facilitation under emergency protocols, and secure handoff coordination. All extractions conducted under documented chain-of-custody with real-time monitoring and encrypted communication channels. Suitable for assets requiring immediate relocation from politically unstable regions, natural disaster zones, or jurisdictions with deteriorating security conditions.',
        },
        {
            title: 'Custodial Escort',
            description:
                'Custodial oversight and protective escort for high-value physical capital during maritime and intermodal transit.',
            details:
                'Focus: risk reduction, continuity, and documented transfer-of-control. Services include dedicated security personnel, tamper-evident containment systems, biometric access controls, and continuous GPS tracking with geofencing alerts. All custody transfers documented with cryptographic verification and witnessed handoffs. Intermodal coordination across vessel, air, and ground transport with seamless jurisdictional transitions. Compliance with international maritime security standards (ISPS Code) and customs bond protocols.',
        },
        {
            title: 'Diplomatic Freight',
            description:
                'Secure handling of irreplaceable legal instruments, original deeds, contracts, and sensitive documentation requiring strict chain-of-custody.',
            details:
                'Optimized for discretion, integrity, and controlled access. Specialized handling protocols include climate-controlled transport, electromagnetic shielding, tamper-evident packaging with forensic seals, and multi-signature custody verification. All documentation movements logged with timestamp authentication and digital audit trails. Suitable for original legal instruments, title deeds, corporate documentation, and sensitive contracts requiring absolute integrity verification. No photocopying, scanning, or digital reproduction during transit.',
        },
    ];

    return (
        <main>
            <PageHeader
                title="Operational Capabilities"
                subtitle="Specialized maritime security and logistics services for high-risk environments."
            />
            <section className="section">
                <div className="container">
                    <div className={styles.grid}>
                        {capabilities.map((capability, index) => (
                            <CapabilityCard
                                key={index}
                                title={capability.title}
                                description={capability.description}
                                details={capability.details}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
