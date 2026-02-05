'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image
            src="/images/hero.png"
            alt="Maritime security operations"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className={styles.heroContent}>
          <div className="container">
            <h1 className={styles.heroTitle}>Vanguard Maritime Asset Protection</h1>
            <p className={styles.heroTagline}>Securing Global Interests in Volatile Environments.</p>
            <p className={styles.heroSubtext}>
              Security-first maritime logistics and custodial oversight for strategic assets,
              sensitive documentation, and high-risk operational environments.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Validation Strip */}
      <section className={styles.industryStrip}>
        <div className="container">
          <div className={styles.industries}>
            <div className={styles.industryItem}>Offshore Oil & Gas</div>
            <div className={styles.industryItem}>Offshore Renewable Energy (Wind)</div>
            <div className={styles.industryItem}>Infrastructure & Critical Assets</div>
            <div className={styles.industryItem}>Private Capital & Family Offices</div>
          </div>
        </div>
      </section>

      {/* Operational Overview */}
      <section className="section">
        <div className="container">
          <h2>Operational Overview</h2>
          <p className={styles.sectionIntro}>
            Vanguard Maritime Asset Protection operates at the intersection of maritime security,
            institutional logistics, and jurisdictional risk management. Our mandate is the
            protection and controlled movement of high-consequence assets through complex,
            contested, and compliance-sensitive environments.
          </p>

          <div className={styles.overviewGrid}>
            <div className={styles.overviewCard}>
              <div className={styles.overviewImageWrapper}>
                <Image
                  src="/images/control-room.png"
                  alt="24/7 monitoring and operational control"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <h3>Continuous Monitoring & Control</h3>
              <p>
                Real-time operational oversight through secure command infrastructure. All
                movements are tracked, logged, and monitored under strict access protocols.
                Chain-of-custody documentation maintained throughout transit lifecycle.
              </p>
            </div>

            <div className={styles.overviewCard}>
              <div className={styles.overviewImageWrapper}>
                <Image
                  src="/images/stormy-seas.png"
                  alt="Operations in challenging maritime environments"
                  width={600}
                  height={400}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <h3>High-Risk Environment Expertise</h3>
              <p>
                Proven operational capability in severe weather zones, geopolitically contested
                waters, and jurisdictionally complex transit corridors. Risk mitigation through
                route optimization, threat assessment, and contingency planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="separator"></div>

      {/* Operational Posture */}
      <section className="section-sm">
        <div className="container">
          <h2>Operational Posture</h2>
          <p className={styles.sectionIntro}>
            Our operational framework is built on institutional-grade security protocols,
            regulatory compliance, and absolute discretion. Every engagement is executed
            under documented procedures with full auditability.
          </p>
          <div className={styles.postureGrid}>
            <div className={styles.postureItem}>
              <div className={styles.postureIcon}>◆</div>
              <div>
                <h4>Discreet, Compliance-Led Execution</h4>
                <p>
                  All operations conducted under strict confidentiality protocols with full
                  regulatory adherence. No public disclosure of client identities, cargo
                  manifests, or routing details.
                </p>
              </div>
            </div>
            <div className={styles.postureItem}>
              <div className={styles.postureIcon}>◆</div>
              <div>
                <h4>Chain-of-Custody Integrity by Design</h4>
                <p>
                  Documented transfer-of-control at every handoff point. Tamper-evident
                  containment, biometric access logs, and cryptographic seal verification
                  throughout transit.
                </p>
              </div>
            </div>
            <div className={styles.postureItem}>
              <div className={styles.postureIcon}>◆</div>
              <div>
                <h4>Access-Controlled Operational Transparency</h4>
                <p>
                  Authorized stakeholders receive real-time status updates through secure
                  channels. Role-based visibility ensures appropriate information access
                  without compromising operational security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="separator"></div>

      {/* Capabilities Preview */}
      <section className="section-sm">
        <div className="container">
          <h2>Core Capabilities</h2>
          <p className={styles.sectionIntro}>
            Specialized services designed for institutional clients requiring secure handling
            of irreplaceable assets, sensitive documentation, and high-value physical capital.
          </p>
          <div className={styles.capabilitiesPreview}>
            <div className={styles.capabilityPreviewCard}>
              <div className={styles.capabilityNumber}>01</div>
              <h3>Tactical Extraction</h3>
              <p>
                Recovery and relocation of high-value assets from restricted, contested, or
                unstable maritime environments. Designed for complex routing, jurisdictional
                sensitivity, and time-critical execution.
              </p>
              <Link href="/capabilities" className={styles.capabilityLink}>
                View Details →
              </Link>
            </div>

            <div className={styles.capabilityPreviewCard}>
              <div className={styles.capabilityNumber}>02</div>
              <h3>Custodial Escort</h3>
              <p>
                Custodial oversight and protective escort for high-value physical capital during
                maritime and intermodal transit. Focus: risk reduction, continuity, and
                documented transfer-of-control.
              </p>
              <Link href="/capabilities" className={styles.capabilityLink}>
                View Details →
              </Link>
            </div>

            <div className={styles.capabilityPreviewCard}>
              <div className={styles.capabilityNumber}>03</div>
              <h3>Diplomatic Freight</h3>
              <p>
                Secure handling of irreplaceable legal instruments, original deeds, contracts,
                and sensitive documentation requiring strict chain-of-custody. Optimized for
                discretion, integrity, and controlled access.
              </p>
              <Link href="/capabilities" className={styles.capabilityLink}>
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="separator"></div>

      {/* Global Reach */}
      <section className="section-sm">
        <div className="container">
          <div className={styles.globalReach}>
            <div className={styles.globalReachContent}>
              <h2>Global Operational Network</h2>
              <p>
                Regional operational hubs in Singapore, Hong Kong, London, and Dubai provide
                routing continuity, jurisdictional coordination, and 24/7 operational support
                across critical maritime corridors.
              </p>
              <p>
                Our network enables seamless intermodal transitions, customs facilitation, and
                compliance management across multiple regulatory frameworks. All hubs maintain
                secure communication infrastructure and vetted local liaison capabilities.
              </p>
              <Link href="/presence" className="btn btn-secondary">
                View Global Presence
              </Link>
            </div>
            <div className={styles.globalReachStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>4</div>
                <div className={styles.statLabel}>Regional Hubs</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Operations Center</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Compliance Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="separator"></div>

      {/* Secure Client Portal */}
      <section className="section">
        <div className="container">
          <div className={styles.portalSection}>
            <h2>Secure Client Portal</h2>
            <p className={styles.portalDescription}>
              Operational data is not available via public tracking systems. Authorized clients
              access consignment details, chain-of-custody documentation, and real-time status
              updates through our secure, monitored authentication portal.
            </p>
            <div className={styles.portalCTA}>
              <Link href="/portal" className="btn btn-primary">
                Secure Client Login
              </Link>
              <p className={styles.portalNote}>
                All access attempts are logged and monitored. Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
