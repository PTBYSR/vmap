import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.legal}>
                    <Link href="/privacy">Privacy Policy</Link>
                    <span className={styles.separator}>|</span>
                    <Link href="/terms">Terms of Service</Link>
                </div>
                <div className={styles.copyright}>
                    © 2026 Vanguard Maritime Asset Protection. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
