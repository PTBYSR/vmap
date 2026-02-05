import styles from './SpecList.module.css';

interface SpecListProps {
    items: string[];
}

export default function SpecList({ items }: SpecListProps) {
    return (
        <ul className={styles.list}>
            {items.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    );
}
