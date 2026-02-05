import styles from './CapabilityCard.module.css';

interface CapabilityCardProps {
    title: string;
    description: string;
    details: string;
}

export default function CapabilityCard({ title, description, details }: CapabilityCardProps) {
    return (
        <div className={styles.card}>
            <h3>{title}</h3>
            <p className={styles.description}>{description}</p>
            <p className={styles.details}>{details}</p>
        </div>
    );
}
