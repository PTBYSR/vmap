import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function PrivacyPolicyPage() {
    return (
        <main>
            <PageHeader
                title="Privacy Policy"
                subtitle="Data protection and information security protocols."
            />
            <section className="section">
                <div className="container">
                    <div className={styles.legalContent}>
                        <p className={styles.effectiveDate}>
                            <strong>Effective Date:</strong> January 1, 2024
                        </p>

                        <h2>1. Scope and Application</h2>
                        <p>
                            This Privacy Policy governs the collection, processing, and retention of information
                            by Vanguard Maritime Asset Protection (&quot;VMAP&quot;, &quot;we&quot;, &quot;us&quot;) in connection with
                            operational services provided to pre-approved institutional and corporate clients
                            (&quot;Client&quot;, &quot;you&quot;). This policy applies to all data collected through our secure
                            client portal, operational communications, and service delivery infrastructure.
                        </p>

                        <h2>2. Information Collection</h2>
                        <p>
                            We collect and process the following categories of information in the course of
                            providing maritime security and logistics services:
                        </p>
                        <ul>
                            <li>
                                <strong>Authentication Data:</strong> Authorization codes, consignment identifiers,
                                multi-factor authentication credentials, and access logs
                            </li>
                            <li>
                                <strong>Operational Data:</strong> Asset location data, chain-of-custody records,
                                custody transfer documentation, and transit status information
                            </li>
                            <li>
                                <strong>Client Information:</strong> Corporate entity details, authorized liaison
                                contacts, compliance screening results, and contractual documentation
                            </li>
                            <li>
                                <strong>Technical Data:</strong> IP addresses, device identifiers, session logs,
                                and portal access timestamps
                            </li>
                        </ul>

                        <h2>3. Data Processing and Use</h2>
                        <p>Information collected is processed exclusively for the following purposes:</p>
                        <ul>
                            <li>Execution and documentation of contracted maritime security services</li>
                            <li>Maintenance of chain-of-custody integrity and audit trail requirements</li>
                            <li>Compliance with international maritime regulations and customs protocols</li>
                            <li>Security monitoring and unauthorized access prevention</li>
                            <li>Operational coordination and real-time status communication</li>
                        </ul>
                        <p>
                            We do not engage in marketing activities, third-party data sales, or behavioral
                            profiling. All data processing is conducted under strict need-to-know protocols.
                        </p>

                        <h2>4. Data Security Measures</h2>
                        <p>
                            VMAP implements institutional-grade security controls to protect client information:
                        </p>
                        <ul>
                            <li>End-to-end encryption for all data transmission and storage</li>
                            <li>Multi-factor authentication and role-based access controls</li>
                            <li>Continuous monitoring and intrusion detection systems</li>
                            <li>Segregated data environments with air-gapped backup infrastructure</li>
                            <li>Regular security audits and penetration testing</li>
                        </ul>

                        <h2>5. Data Retention and Deletion</h2>
                        <p>
                            Operational data is retained in accordance with international maritime documentation
                            requirements and applicable regulatory frameworks. Standard retention periods:
                        </p>
                        <ul>
                            <li>Chain-of-custody records: 7 years from service completion</li>
                            <li>Access logs and authentication data: 3 years from last access</li>
                            <li>Compliance screening results: Duration of client relationship plus 5 years</li>
                            <li>Operational communications: 2 years from transmission date</li>
                        </ul>
                        <p>
                            Upon expiration of retention requirements, data is securely destroyed using
                            cryptographic erasure and certified destruction protocols.
                        </p>

                        <h2>6. Third-Party Disclosure</h2>
                        <p>
                            Client information is disclosed to third parties only under the following
                            circumstances:
                        </p>
                        <ul>
                            <li>As required by valid legal process or regulatory authority</li>
                            <li>To vetted operational partners under strict confidentiality agreements</li>
                            <li>For customs facilitation and jurisdictional compliance purposes</li>
                            <li>With explicit written authorization from the Client</li>
                        </ul>
                        <p>
                            We do not disclose client identities, cargo manifests, or operational details to
                            unauthorized parties under any circumstances.
                        </p>

                        <h2>7. Client Rights and Access</h2>
                        <p>Authorized clients maintain the following rights regarding their data:</p>
                        <ul>
                            <li>Access to operational records and chain-of-custody documentation</li>
                            <li>Correction of inaccurate client profile information</li>
                            <li>Request for data processing activity reports</li>
                            <li>Notification of security incidents affecting client data</li>
                        </ul>
                        <p>
                            Requests must be submitted through secure channels and verified through established
                            authentication protocols.
                        </p>

                        <h2>8. International Data Transfers</h2>
                        <p>
                            Due to the global nature of maritime operations, client data may be processed in
                            multiple jurisdictions including Singapore, Hong Kong, United Kingdom, and United
                            Arab Emirates. All cross-border data transfers are conducted under appropriate
                            safeguards including:
                        </p>
                        <ul>
                            <li>Standard contractual clauses approved by relevant data protection authorities</li>
                            <li>Encryption during transit and at rest</li>
                            <li>Jurisdictional risk assessments and data localization where required</li>
                        </ul>

                        <h2>9. Cookies and Tracking Technologies</h2>
                        <p>
                            Our secure client portal uses essential session cookies for authentication and
                            security purposes only. We do not deploy advertising cookies, analytics trackers, or
                            third-party tracking technologies.
                        </p>

                        <h2>10. Policy Updates</h2>
                        <p>
                            This Privacy Policy may be updated to reflect changes in regulatory requirements or
                            operational practices. Material changes will be communicated to active clients
                            through secure channels. Continued use of services following policy updates
                            constitutes acceptance of revised terms.
                        </p>

                        <h2>11. Contact Information</h2>
                        <p>
                            Questions regarding this Privacy Policy or data protection practices should be
                            directed to:
                        </p>
                        <p className={styles.contactInfo}>
                            <strong>Data Protection Office</strong>
                            <br />
                            Vanguard Maritime Asset Protection
                            <br />
                            Email: privacy@vanguardmap.secure
                            <br />
                            Secure Portal: Client Liaison Desk
                        </p>

                        <p className={styles.disclaimer}>
                            This Privacy Policy is provided for informational purposes and does not constitute
                            legal advice. Clients should consult with legal counsel regarding specific data
                            protection obligations.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
