import styles from './PageHeader.module.css';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
    return (
        <div className={styles.header}>
            <div className="container">
                <h1>{title}</h1>
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
        </div>
    );
}
