import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Plungers",
  description:
    "Learn how Plungers collects, uses, shares, and protects your personal information.",
};

const EFFECTIVE_DATE = "[08 10, 2026]";
const LAST_UPDATED = "[08 10, 2026]";
const LEGAL_COMPANY_NAME = "[LEGAL COMPANY NAME]";
const BUSINESS_ADDRESS = "[BUSINESS ADDRESS]";
const COMPANY_COUNTRY = "[COUNTRY]";
const PRIVACY_EMAIL = "[PRIVACY EMAIL ADDRESS]";

const SECTIONS = [
  { id: "who-we-are", label: "1. Who We Are" },
  { id: "information-we-collect", label: "2. Information We Collect" },
  { id: "how-we-use-information", label: "3. How We Use Information" },
  { id: "reviews-content", label: "4. Reviews, Ratings & User Content" },
  { id: "how-we-share-information", label: "5. How We Share Information" },
  { id: "third-party-services", label: "6. Third-Party Services" },
  { id: "cookies", label: "7. Cookies & Similar Technologies" },
  { id: "data-retention", label: "8. Data Retention" },
  { id: "data-security", label: "9. Data Security" },
  { id: "international-transfers", label: "10. International Data Transfers" },
  { id: "your-privacy-rights", label: "11. Your Privacy Rights" },
  { id: "marketing", label: "12. Marketing Communications" },
  { id: "childrens-privacy", label: "13. Children's Privacy" },
  { id: "third-party-links", label: "14. Third-Party Websites & Links" },
  { id: "changes", label: "15. Changes to This Privacy Policy" },
  { id: "contact", label: "16. Contact Us" },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="scroll-mt-32 text-xl md:text-2xl font-extrabold text-[#062626] mt-12 mb-4 first:mt-0"
    >
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base md:text-lg font-bold text-[#062626] mt-6 mb-2">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[0.95rem] leading-relaxed text-[#062626]/75 mb-4">
      {children}
    </p>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul
      style={{ listStyleType: "disc", listStylePosition: "outside", paddingLeft: "1.75rem" }}
      className="marker:text-[#006f6b] space-y-2 text-[0.95rem] leading-relaxed text-[#062626]/75 mb-4"
    >
      {children}
    </ul>
  );
}

export default function PrivacyPage() {
  return (
    <main
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      className="min-h-screen bg-white"
    >
      {/* Header band */}
      <div
        className="section-pad"
        style={{
          backgroundColor: "#062626",
          paddingTop: "12rem",
          paddingBottom: "2.5rem",
          paddingLeft: "80px",
          paddingRight: "80px",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p
            style={{
              color: "#89e3d5",
              fontWeight: 700,
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "0.75rem",
            }}
          >
            Legal
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 900,
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              marginBottom: "1rem",
            }}
          >
            Privacy Policy
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
            Effective Date: {EFFECTIVE_DATE} &nbsp;•&nbsp; Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Body */}
      <div
        className="section-pad grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-12"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          paddingTop: "3.5rem",
          paddingBottom: "3.5rem",
          paddingLeft: "80px",
          paddingRight: "80px",
        }}
      >
        {/* Table of contents */}
        <nav className="hidden lg:block">
          <div className="sticky top-32">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#062626]/40 mb-3">
              On this page
            </p>
            <ul className="space-y-2 border-l border-[#e0eeee]">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block pl-4 -ml-px border-l border-transparent text-[0.8rem] text-[#062626]/55 hover:text-[#006f6b] hover:border-[#006f6b] transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <article>
          <P>
            Plungers (&ldquo;Plungers,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) respects your privacy and is committed to protecting
            the personal information you provide when using the Plungers website,
            platform, applications, and related services (collectively, the
            &ldquo;Platform&rdquo;).
          </P>
          <P>
            This Privacy Policy explains what information we collect, how we use
            it, how we share it, how we protect it, and the choices available to
            you when you use Plungers.
          </P>
          <P>
            By accessing or using the Platform, you acknowledge that you have read
            and understood this Privacy Policy.
          </P>

          <H2 id="who-we-are">1. Who We Are</H2>
          <P>
            Plungers is a marketplace platform designed to connect travelers with
            curated local experiences offered by businesses and experience
            providers.
          </P>
          <P>
            <strong>Data Controller / Platform Operator:</strong>
            <br />
            {LEGAL_COMPANY_NAME}
            <br />
            {BUSINESS_ADDRESS}
            <br />
            {COMPANY_COUNTRY}
          </P>
          <P>
            <strong>Privacy Contact:</strong> {PRIVACY_EMAIL}
          </P>
          <P>
            For questions regarding this Privacy Policy or the handling of your
            personal information, please contact us using the information above.
          </P>

          <H2 id="information-we-collect">2. Information We Collect</H2>
          <P>
            Depending on how you use Plungers, we may collect the following
            categories of information.
          </P>

          <H3>A. Information You Provide Directly</H3>
          <P>
            When you create an account, submit an application, contact us, book an
            experience, or otherwise use the Platform, we may collect information
            such as:
          </P>
          <UL>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Country, city, or general location</li>
            <li>Account credentials and authentication information</li>
            <li>Profile information</li>
            <li>Business or organization information</li>
            <li>Experience or activity information</li>
            <li>Information submitted through business applications</li>
            <li>Booking and transaction information</li>
            <li>Communications you send to us</li>
            <li>Reviews, ratings, comments, photographs, and other content you submit</li>
            <li>Information you provide when requesting customer support</li>
          </UL>

          <H3>B. Business and Experience Provider Information</H3>
          <P>
            If you register as a business or experience provider, we may collect
            additional information necessary to evaluate and operate your account,
            including:
          </P>
          <UL>
            <li>Business name</li>
            <li>Business contact information</li>
            <li>Business location</li>
            <li>Business description</li>
            <li>Experience descriptions</li>
            <li>Experience pricing and availability</li>
            <li>Business website or social media information</li>
            <li>Information concerning the individual responsible for the business account</li>
            <li>Information necessary to process payments or payouts</li>
            <li>Verification information where required</li>
          </UL>
          <P>
            Business accounts may be subject to additional verification before
            experiences are published or transactions are enabled.
          </P>

          <H3>C. Identity Verification Information</H3>
          <P>
            Where identity verification is required or enabled, Plungers may use
            third-party identity verification services, including Stripe
            Identity, to verify the identity of users or business representatives.
          </P>
          <P>
            Depending on the verification process, the third-party provider may
            collect information from identity documents and, where applicable,
            photographs or biometric comparison information used to determine
            whether the person completing the verification corresponds to the
            identity document.
          </P>
          <P>
            Plungers does not intentionally store copies of identity documents
            unless specifically required for a legitimate business, legal,
            security, or regulatory purpose. Where a third-party verification
            provider processes identity information on our behalf, that
            provider&rsquo;s own privacy terms may also apply.
          </P>
          <P>
            For Stripe Identity verification, information may be processed by
            Stripe as a service provider or processor on behalf of Plungers.
          </P>

          <H3>D. Payment Information</H3>
          <P>
            Payments made through Plungers may be processed by third-party payment
            providers, including Stripe.
          </P>
          <P>Depending on the payment method used, payment providers may collect:</P>
          <UL>
            <li>Payment card information</li>
            <li>Billing information</li>
            <li>Transaction information</li>
            <li>Payment status</li>
            <li>Refund information</li>
            <li>Fraud-prevention information</li>
          </UL>
          <P>
            Plungers does not intentionally store complete payment card numbers or
            card security codes on its own servers. Payment information is handled
            through the applicable payment provider.
          </P>

          <H3>E. Authentication Information</H3>
          <P>Plungers may allow users to register or sign in using:</P>
          <UL>
            <li>Email-based authentication</li>
            <li>Google</li>
            <li>Facebook</li>
            <li>Microsoft</li>
            <li>Other authentication providers that may be introduced in the future</li>
          </UL>
          <P>
            When you use a third-party authentication provider, we may receive
            information such as your name, email address, profile identifier, and
            other information that the provider makes available based on the
            permissions granted.
          </P>
          <P>
            We use this information to create and maintain your Plungers account
            and authenticate you.
          </P>

          <H3>F. Location and Map Information</H3>
          <P>
            Plungers may use mapping and location services to help users discover
            experiences and businesses.
          </P>
          <P>Depending on the feature being used, we may process:</P>
          <UL>
            <li>General location information</li>
            <li>Selected destinations</li>
            <li>Business or experience locations</li>
            <li>Search locations</li>
            <li>Map-related information</li>
          </UL>
          <P>
            Plungers may use third-party mapping services, including Google Maps
            Platform, to provide mapping, location, and place-related
            functionality.
          </P>
          <P>
            You may control certain location permissions through your device or
            browser settings.
          </P>

          <H3>G. Information Collected Automatically</H3>
          <P>
            When you access the Platform, certain technical information may be
            collected automatically, including:
          </P>
          <UL>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type</li>
            <li>Operating system</li>
            <li>Language preferences</li>
            <li>Approximate geographic location</li>
            <li>Pages or features accessed</li>
            <li>Date and time of access</li>
            <li>Referring URLs</li>
            <li>Diagnostic and security information</li>
          </UL>
          <P>
            This information may be used for security, troubleshooting,
            analytics, performance monitoring, and improving the Platform.
          </P>

          <H2 id="how-we-use-information">3. How We Use Information</H2>
          <P>We may use personal information for the following purposes:</P>
          <UL>
            <li>Create and manage user accounts</li>
            <li>Authenticate users</li>
            <li>Provide access to the Platform</li>
            <li>Display and manage experiences</li>
            <li>Process bookings and transactions</li>
            <li>Process payments and, where applicable, business payouts</li>
            <li>Verify users and businesses</li>
            <li>Prevent fraud, abuse, and unauthorized activity</li>
            <li>Maintain Platform security</li>
            <li>Process business applications</li>
            <li>Facilitate communication between users and businesses where applicable</li>
            <li>Process and display reviews and ratings</li>
            <li>Provide customer support</li>
            <li>Respond to inquiries</li>
            <li>Improve the Platform and user experience</li>
            <li>Develop and test new features</li>
            <li>Monitor Platform performance</li>
            <li>Comply with legal and regulatory obligations</li>
            <li>Enforce our Terms of Service</li>
            <li>Protect the rights, safety, property, and security of Plungers, our users, and third parties</li>
            <li>Send service-related communications</li>
            <li>Send promotional communications where permitted and where appropriate consent has been obtained</li>
          </UL>
          <P>
            We will not use personal information for purposes materially
            incompatible with those described in this Privacy Policy without
            providing appropriate notice or obtaining consent where required by
            law.
          </P>

          <H2 id="reviews-content">4. Reviews, Ratings, and User-Generated Content</H2>
          <P>
            Plungers may allow users to submit reviews, ratings, photographs,
            comments, and other content concerning experiences or businesses.
          </P>
          <P>
            Content submitted for public display may be visible to other users of
            the Platform and may include information associated with your
            account, such as your display name.
          </P>
          <P>
            You should avoid submitting personal information that you do not want
            publicly displayed.
          </P>
          <P>
            Plungers may moderate, remove, or restrict content that violates our
            Terms of Service, applicable law, or our content standards.
          </P>

          <H2 id="how-we-share-information">5. How We Share Information</H2>
          <P>
            We may share information with third parties when reasonably necessary
            to provide, maintain, secure, or improve the Platform.
          </P>
          <P>These parties may include:</P>

          <H3>Service Providers</H3>
          <P>We may use third-party providers for services such as:</P>
          <UL>
            <li>Database hosting</li>
            <li>Authentication</li>
            <li>Payment processing</li>
            <li>Identity verification</li>
            <li>Hosting and infrastructure</li>
            <li>Mapping and location services</li>
            <li>Security</li>
            <li>Analytics</li>
            <li>Email or communications</li>
            <li>Customer support</li>
            <li>Technical monitoring</li>
          </UL>
          <P>
            These providers generally receive only the information reasonably
            necessary to perform their services.
          </P>

          <H3>Businesses and Experience Providers</H3>
          <P>
            When necessary to facilitate a booking, inquiry, or other interaction,
            certain information may be shared with the applicable business or
            experience provider.
          </P>

          <H3>Legal and Safety Purposes</H3>
          <P>We may disclose information when reasonably necessary to:</P>
          <UL>
            <li>Comply with applicable law</li>
            <li>Respond to lawful requests</li>
            <li>Enforce our agreements</li>
            <li>Investigate fraud or abuse</li>
            <li>Protect users or third parties</li>
            <li>Protect the rights, property, or security of Plungers</li>
          </UL>

          <H3>Business Transfers</H3>
          <P>
            If Plungers is involved in a merger, acquisition, financing,
            reorganization, sale of assets, or similar transaction, personal
            information may be transferred as part of that transaction, subject to
            applicable law.
          </P>

          <H2 id="third-party-services">6. Third-Party Services</H2>
          <P>Plungers relies on third-party services to operate portions of the Platform.</P>
          <P>These may include:</P>
          <UL>
            <li>Stripe for payments and related financial services</li>
            <li>Stripe Identity or another identity-verification provider for identity verification</li>
            <li>Supabase for database and related infrastructure</li>
            <li>Google services for authentication and mapping</li>
            <li>Facebook (Meta) services for authentication</li>
            <li>Microsoft services for authentication</li>
            <li>Vercel or other infrastructure providers for hosting and deployment</li>
          </UL>
          <P>
            Third-party services may process information according to their own
            privacy policies and contractual obligations.
          </P>
          <P>Plungers does not control the privacy practices of independent third parties.</P>

          <H2 id="cookies">7. Cookies and Similar Technologies</H2>
          <P>
            Plungers may use cookies, local storage, session technologies, and
            similar technologies to:
          </P>
          <UL>
            <li>Maintain authentication sessions</li>
            <li>Remember preferences</li>
            <li>Maintain security</li>
            <li>Support Platform functionality</li>
            <li>Understand Platform usage</li>
            <li>Improve performance</li>
          </UL>
          <P>
            Where required by applicable law, Plungers will provide appropriate
            choices or consent mechanisms for non-essential cookies and similar
            technologies.
          </P>
          <P>
            You can control certain cookies through your browser settings.
            Disabling certain cookies may affect Platform functionality.
          </P>

          <H2 id="data-retention">8. Data Retention</H2>
          <P>We retain personal information only for as long as reasonably necessary to:</P>
          <UL>
            <li>Provide the Platform and requested services</li>
            <li>Maintain accounts and transaction records</li>
            <li>Fulfill legitimate business purposes</li>
            <li>Resolve disputes</li>
            <li>Prevent fraud and abuse</li>
            <li>Comply with legal, tax, accounting, and regulatory requirements</li>
            <li>Enforce our agreements</li>
          </UL>
          <P>
            Retention periods may vary depending on the type of information and the
            reason it was collected.
          </P>
          <P>
            When information is no longer reasonably required, we may delete,
            anonymize, or securely dispose of it, subject to applicable legal
            obligations.
          </P>

          <H2 id="data-security">9. Data Security</H2>
          <P>
            We use reasonable administrative, technical, and organizational
            safeguards designed to protect personal information against
            unauthorized access, alteration, disclosure, loss, or destruction.
          </P>
          <P>However, no internet-based service can guarantee absolute security.</P>
          <P>
            You are responsible for maintaining the security of your account
            credentials and should notify us promptly if you believe your account
            has been compromised.
          </P>

          <H2 id="international-transfers">10. International Data Transfers</H2>
          <P>
            Plungers may use service providers located in countries other than the
            country in which you live.
          </P>
          <P>As a result, your information may be processed internationally.</P>
          <P>
            Where required by applicable law, Plungers will use appropriate
            safeguards for international transfers of personal information.
          </P>

          <H2 id="your-privacy-rights">11. Your Privacy Rights</H2>
          <P>
            Depending on where you live and applicable law, you may have rights
            concerning your personal information, including the right to:
          </P>
          <UL>
            <li>Access personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of certain information</li>
            <li>Request restriction of processing</li>
            <li>Object to certain processing</li>
            <li>Request portability of certain information</li>
            <li>Withdraw consent where processing is based on consent</li>
            <li>Opt out of certain marketing communications</li>
          </UL>
          <P>
            Additional rights may apply under laws such as applicable U.S. state
            privacy laws, the California Consumer Privacy Act and related
            regulations, the European Union General Data Protection Regulation,
            the United Kingdom GDPR, or other applicable privacy legislation.
          </P>
          <P>To exercise applicable rights, contact:</P>
          <P>
            <strong>{PRIVACY_EMAIL}</strong>
          </P>
          <P>We may need to verify your identity before fulfilling certain requests.</P>

          <H2 id="marketing">12. Marketing Communications</H2>
          <P>
            We may send service-related communications that are necessary to
            operate your account or fulfill transactions.
          </P>
          <P>
            Where permitted and where appropriate consent has been obtained, we
            may also send promotional communications about Plungers, experiences,
            destinations, offers, or other services.
          </P>
          <P>
            You may unsubscribe from promotional communications by using the
            unsubscribe mechanism included in the communication or by contacting
            us.
          </P>
          <P>
            Unsubscribing from marketing communications does not prevent us from
            sending important transactional or account-related communications.
          </P>

          <H2 id="childrens-privacy">13. Children&rsquo;s Privacy</H2>
          <P>
            Plungers is not intended to be used independently by children under
            the age required by applicable law.
          </P>
          <P>
            We do not knowingly collect personal information from children in
            violation of applicable law.
          </P>
          <P>
            If you believe that a child has provided personal information to
            Plungers improperly, please contact us so that we can investigate and
            take appropriate action.
          </P>

          <H2 id="third-party-links">14. Third-Party Websites and Links</H2>
          <P>
            The Platform may contain links to third-party websites, applications,
            or services.
          </P>
          <P>
            Plungers is not responsible for the privacy practices, content,
            security, or policies of third-party websites.
          </P>
          <P>
            We encourage you to review the privacy policies of third parties
            before providing them with personal information.
          </P>

          <H2 id="changes">15. Changes to This Privacy Policy</H2>
          <P>
            We may update this Privacy Policy periodically to reflect changes to
            the Platform, technology, legal requirements, or our practices.
          </P>
          <P>
            When we make material changes, we may provide notice through the
            Platform or other appropriate means.
          </P>
          <P>
            The &ldquo;Last Updated&rdquo; date at the top of this Privacy Policy
            indicates when the policy was most recently revised.
          </P>

          <H2 id="contact">16. Contact Us</H2>
          <P>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or Plungers&rsquo; privacy practices, contact us at:
          </P>
          <P>
            <strong>{LEGAL_COMPANY_NAME}</strong>
            <br />
            {BUSINESS_ADDRESS}
            <br />
            {COMPANY_COUNTRY}
          </P>
          <P>
            <strong>Email:</strong> {PRIVACY_EMAIL}
          </P>

          <div className="mt-10 pt-6 border-t border-[#e0eeee]">
            <p className="text-xs italic text-[#062626]/45 leading-relaxed">
              Important: This Privacy Policy is intended to describe
              Plungers&rsquo; current and planned MVP operations. Additional
              disclosures may be required as new features, analytics services,
              advertising technologies, payment products, or data-processing
              activities are introduced.
            </p>
          </div>

          <div className="mt-8">
            <Link
              href="/terms"
              className="text-sm font-semibold text-[#006f6b] hover:text-[#00534d] underline underline-offset-4"
            >
              View our Terms of Service →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
