'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './NavBar.module.css';

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Link href="/">Vanguard Maritime Asset Protection</Link>
                </div>

                {/* Desktop Navigation */}
                <div className={styles.links}>
                    <Link href="/capabilities">Capabilities</Link>
                    <Link href="/security">Security & Compliance</Link>
                    <Link href="/environments">Environments</Link>
                    <Link href="/technical">Technical Assets</Link>
                    <Link href="/ethics">Ethics</Link>
                    <Link href="/presence">Global Presence</Link>
                </div>

                <div className={styles.cta}>
                    <Link href="/portal" className="btn btn-primary">
                        Secure Client Login
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={styles.mobileMenuBtn}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/capabilities" onClick={() => setMobileMenuOpen(false)}>
                        Capabilities
                    </Link>
                    <Link href="/security" onClick={() => setMobileMenuOpen(false)}>
                        Security & Compliance
                    </Link>
                    <Link href="/environments" onClick={() => setMobileMenuOpen(false)}>
                        Environments
                    </Link>
                    <Link href="/technical" onClick={() => setMobileMenuOpen(false)}>
                        Technical Assets
                    </Link>
                    <Link href="/ethics" onClick={() => setMobileMenuOpen(false)}>
                        Ethics
                    </Link>
                    <Link href="/presence" onClick={() => setMobileMenuOpen(false)}>
                        Global Presence
                    </Link>
                    <Link href="/portal" onClick={() => setMobileMenuOpen(false)}>
                        Secure Client Login
                    </Link>
                </div>
            )}
        </nav>
    );
}
