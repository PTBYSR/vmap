import styles from './ComplianceBadge.module.css';

interface ComplianceBadgeProps {
    title: string;
    code: string;
}

export default function ComplianceBadge({ title, code }: ComplianceBadgeProps) {
    return (
        <div className={styles.badge}>
            <div className={styles.icon}>✓</div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.code}>{code}</div>
            </div>
        </div>
    );
}
