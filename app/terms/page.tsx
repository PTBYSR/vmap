import PageHeader from '@/components/PageHeader';
import styles from './page.module.css';

export default function TermsOfServicePage() {
    return (
        <main>
            <PageHeader
                title="Terms of Service"
                subtitle="Service agreement and operational terms for authorized clients."
            />
            <section className="section">
                <div className="container">
                    <div className={styles.legalContent}>
                        <p className={styles.effectiveDate}>
                            <strong>Effective Date:</strong> January 1, 2024
                        </p>

                        <h2>1. Service Agreement</h2>
                        <p>
                            These Terms of Service ("Terms") constitute a binding agreement between Vanguard
                            Maritime Asset Protection ("VMAP", "we", "us") and pre-approved institutional or
                            corporate clients ("Client", "you") for the provision of maritime security,
                            logistics, and custodial services. Access to and use of VMAP services, including the
                            secure client portal, constitutes acceptance of these Terms.
                        </p>

                        <h2>2. Service Eligibility and Authorization</h2>
                        <p>
                            VMAP services are available exclusively to pre-approved corporate and institutional
                            partners who have completed our client due diligence process. Eligibility
                            requirements include:
                        </p>
                        <ul>
                            <li>Completion of Know Your Customer (KYC) verification procedures</li>
                            <li>Sanctions screening and jurisdictional compliance review</li>
                            <li>Execution of Master Service Agreement and confidentiality protocols</li>
                            <li>Provision of authorized liaison contacts and authentication credentials</li>
                        </ul>
                        <p>
                            VMAP reserves the right to refuse service to any entity that does not meet our
                            institutional standards or presents unacceptable risk profiles.
                        </p>

                        <h2>3. Scope of Services</h2>
                        <p>VMAP provides the following categories of maritime security and logistics services:</p>
                        <ul>
                            <li>
                                <strong>Tactical Extraction:</strong> Recovery and relocation of high-value assets
                                from restricted or contested maritime environments
                            </li>
                            <li>
                                <strong>Custodial Escort:</strong> Protective oversight and documented
                                transfer-of-control for high-value physical capital during transit
                            </li>
                            <li>
                                <strong>Diplomatic Freight:</strong> Secure handling of irreplaceable legal
                                instruments and sensitive documentation under strict chain-of-custody
                            </li>
                        </ul>
                        <p>
                            All services are provided on a case-by-case basis under individually negotiated
                            service orders. VMAP does not provide standing or continuous security services.
                        </p>

                        <h2>4. Client Obligations</h2>
                        <p>Clients agree to the following obligations:</p>
                        <ul>
                            <li>
                                Provide accurate and complete information regarding assets, documentation, and
                                operational requirements
                            </li>
                            <li>
                                Maintain confidentiality of authentication credentials and access control measures
                            </li>
                            <li>
                                Comply with all applicable export controls, sanctions regulations, and customs
                                requirements
                            </li>
                            <li>
                                Notify VMAP immediately of any changes to authorized personnel or contact
                                information
                            </li>
                            <li>
                                Refrain from public disclosure of VMAP services, operational details, or routing
                                information
                            </li>
                        </ul>

                        <h2>5. Operational Limitations and Disclaimers</h2>
                        <p>
                            VMAP services are subject to the following limitations and operational constraints:
                        </p>
                        <ul>
                            <li>
                                Services may be delayed or suspended due to force majeure events, including severe
                                weather, political instability, or regulatory restrictions
                            </li>
                            <li>
                                Route optimization and timing are subject to real-time threat assessments and
                                jurisdictional conditions
                            </li>
                            <li>
                                VMAP does not guarantee specific transit times or delivery schedules for
                                time-sensitive operations
                            </li>
                            <li>
                                Certain jurisdictions or cargo types may be excluded based on risk assessment or
                                regulatory compliance requirements
                            </li>
                        </ul>

                        <h2>6. Liability and Indemnification</h2>
                        <p>
                            VMAP's liability is limited to direct damages arising from gross negligence or willful
                            misconduct in the provision of contracted services. VMAP is not liable for:
                        </p>
                        <ul>
                            <li>Consequential, indirect, or punitive damages of any kind</li>
                            <li>
                                Losses arising from force majeure events, third-party actions, or regulatory
                                interventions
                            </li>
                            <li>Damages resulting from inaccurate or incomplete client-provided information</li>
                            <li>
                                Losses occurring outside the documented chain-of-custody or after service completion
                            </li>
                        </ul>
                        <p>
                            Clients agree to indemnify VMAP against claims arising from client violations of
                            export controls, sanctions regulations, or customs requirements.
                        </p>

                        <h2>7. Confidentiality and Non-Disclosure</h2>
                        <p>
                            Both parties agree to maintain strict confidentiality regarding all operational
                            information, including:
                        </p>
                        <ul>
                            <li>Client identities and corporate affiliations</li>
                            <li>Asset descriptions, cargo manifests, and consignment details</li>
                            <li>Routing information, transit schedules, and operational procedures</li>
                            <li>Security protocols, authentication methods, and access control measures</li>
                        </ul>
                        <p>
                            Confidentiality obligations survive termination of service agreements and continue
                            indefinitely unless disclosure is required by valid legal process.
                        </p>

                        <h2>8. Portal Access and Security</h2>
                        <p>
                            Access to the VMAP secure client portal is governed by the following security
                            requirements:
                        </p>
                        <ul>
                            <li>
                                Multi-factor authentication using authorization codes, consignment IDs, and
                                time-based OTP verification
                            </li>
                            <li>All access attempts are logged, monitored, and subject to security review</li>
                            <li>
                                Unauthorized access attempts may result in immediate service suspension and legal
                                action
                            </li>
                            <li>
                                Clients are responsible for maintaining the security of authentication credentials
                            </li>
                            <li>Portal sessions expire after periods of inactivity for security purposes</li>
                        </ul>

                        <h2>9. Compliance and Regulatory Adherence</h2>
                        <p>
                            All VMAP operations are conducted in compliance with international maritime
                            regulations, including:
                        </p>
                        <ul>
                            <li>International Ship and Port Facility Security (ISPS) Code</li>
                            <li>ISO 28000 Supply Chain Security Management standards</li>
                            <li>Customs bond facilitation protocols and AML frameworks</li>
                            <li>Export control regulations and sanctions screening requirements</li>
                        </ul>
                        <p>
                            Clients acknowledge that VMAP may refuse or suspend services if compliance
                            requirements cannot be satisfied.
                        </p>

                        <h2>10. Payment Terms</h2>
                        <p>
                            Service fees are established on a case-by-case basis under individual service orders.
                            Standard payment terms:
                        </p>
                        <ul>
                            <li>50% deposit required upon service order execution</li>
                            <li>Balance due upon service completion and custody transfer documentation</li>
                            <li>
                                Additional charges may apply for route modifications, extended custody periods, or
                                emergency services
                            </li>
                            <li>Late payments subject to interest charges and service suspension</li>
                        </ul>

                        <h2>11. Service Termination</h2>
                        <p>
                            VMAP reserves the right to terminate services immediately under the following
                            circumstances:
                        </p>
                        <ul>
                            <li>Client breach of confidentiality or non-disclosure obligations</li>
                            <li>Discovery of sanctions violations or regulatory non-compliance</li>
                            <li>Provision of false or misleading information during due diligence</li>
                            <li>Unauthorized disclosure of operational details or VMAP methodologies</li>
                            <li>Non-payment or material breach of service agreement terms</li>
                        </ul>

                        <h2>12. Dispute Resolution</h2>
                        <p>
                            Disputes arising from these Terms or service provision shall be resolved through
                            binding arbitration under the rules of the Singapore International Arbitration Centre
                            (SIAC). Arbitration proceedings shall be conducted in English and remain confidential.
                        </p>

                        <h2>13. Governing Law</h2>
                        <p>
                            These Terms are governed by the laws of Singapore, without regard to conflict of law
                            principles. Clients consent to the exclusive jurisdiction of Singapore courts for
                            enforcement of arbitration awards or injunctive relief.
                        </p>

                        <h2>14. Modifications to Terms</h2>
                        <p>
                            VMAP may modify these Terms to reflect changes in regulatory requirements or
                            operational practices. Material modifications will be communicated to active clients
                            through secure channels. Continued use of services following modification constitutes
                            acceptance of revised Terms.
                        </p>

                        <h2>15. Contact Information</h2>
                        <p>
                            Questions regarding these Terms of Service should be directed to:
                        </p>
                        <p className={styles.contactInfo}>
                            <strong>Legal and Compliance Office</strong>
                            <br />
                            Vanguard Maritime Asset Protection
                            <br />
                            Email: legal@vanguardmap.secure
                            <br />
                            Secure Portal: Client Liaison Desk
                        </p>

                        <p className={styles.disclaimer}>
                            These Terms of Service constitute the entire agreement between VMAP and Client
                            regarding service provision. No oral modifications or amendments are valid. This
                            document does not constitute legal advice, and clients should consult with legal
                            counsel regarding specific obligations.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
