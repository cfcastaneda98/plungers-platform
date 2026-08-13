import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Plungers",
  description:
    "The terms governing your access to and use of the Plungers platform.",
};

const EFFECTIVE_DATE = "[08 10, 2026]";
const LAST_UPDATED = "[08 10, 2026]";
const LEGAL_COMPANY_NAME = "[LEGAL COMPANY NAME]";
const BUSINESS_ADDRESS = "[BUSINESS ADDRESS]";
const COMPANY_COUNTRY = "[COUNTRY]";
const GENERAL_CONTACT_EMAIL = "[GENERAL CONTACT EMAIL]";
const GOVERNING_JURISDICTION = "[STATE/COUNTRY]";
const DISPUTE_FORUM = "[CITY, STATE/COUNTRY]";
const LIABILITY_MONTHS = "[12]";

const SECTIONS = [
  { id: "about-plungers", label: "1. About Plungers" },
  { id: "eligibility", label: "2. Eligibility" },
  { id: "accounts", label: "3. Accounts" },
  { id: "traveler-accounts", label: "4. Traveler Accounts" },
  { id: "business-accounts", label: "5. Business & Provider Accounts" },
  { id: "experience-listings", label: "6. Experience Listings" },
  { id: "provider-responsibilities", label: "7. Provider Responsibilities" },
  { id: "verification", label: "8. Identity & Business Verification" },
  { id: "payments", label: "9. Payments" },
  { id: "refunds", label: "10. Refunds & Cancellations" },
  { id: "bookings", label: "11. Bookings" },
  { id: "reviews", label: "12. Reviews & Ratings" },
  { id: "user-content", label: "13. User-Generated Content" },
  { id: "intellectual-property", label: "14. Intellectual Property" },
  { id: "acceptable-use", label: "15. Acceptable Use" },
  { id: "third-party-services", label: "16. Third-Party Services" },
  { id: "maps", label: "17. Maps & Location Information" },
  { id: "safety", label: "18. Safety" },
  { id: "disclaimers", label: "19. Disclaimers" },
  { id: "limitation-of-liability", label: "20. Limitation of Liability" },
  { id: "indemnification", label: "21. Indemnification" },
  { id: "suspension", label: "22. Suspension & Termination" },
  { id: "platform-changes", label: "23. Changes to the Platform" },
  { id: "terms-changes", label: "24. Changes to These Terms" },
  { id: "governing-law", label: "25. Governing Law & Disputes" },
  { id: "severability", label: "26. Severability" },
  { id: "entire-agreement", label: "27. Entire Agreement" },
  { id: "contact", label: "28. Contact Us" },
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

function CounselNote({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "#fff8ec",
        border: "1px solid #f0ddb0",
        borderRadius: "10px",
      }}
      className="px-4 py-3 mb-4"
    >
      <p className="text-[0.85rem] leading-relaxed text-[#7a5a12] font-medium">
        {children}
      </p>
    </div>
  );
}

export default function TermsPage() {
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
            Terms of Service
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
          <P>Welcome to Plungers.</P>
          <P>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to
            and use of the Plungers website, platform, applications, and related
            services (collectively, the &ldquo;Platform&rdquo;).
          </P>
          <P>
            By creating an account, accessing the Platform, submitting an
            application, listing an experience, making a booking, or otherwise
            using Plungers, you agree to these Terms.
          </P>
          <P>If you do not agree to these Terms, you should not use the Platform.</P>

          <H2 id="about-plungers">1. About Plungers</H2>
          <P>
            Plungers is a marketplace platform designed to connect travelers with
            local experiences offered by independent businesses and experience
            providers.
          </P>
          <P>
            Plungers may provide technology that allows users to discover,
            review, communicate about, and book experiences.
          </P>
          <P>
            Unless expressly stated otherwise, Plungers is not the provider,
            operator, owner, or direct supplier of the experiences listed by
            independent businesses.
          </P>
          <P>
            The applicable business or experience provider is responsible for
            delivering its experience as described on the Platform.
          </P>

          <H2 id="eligibility">2. Eligibility</H2>
          <P>
            You must be legally capable of entering into a binding agreement
            under applicable law to use Plungers.
          </P>
          <P>By using the Platform, you represent that:</P>
          <UL>
            <li>The information you provide is accurate and current.</li>
            <li>You have authority to enter into these Terms.</li>
            <li>You will comply with applicable laws and regulations.</li>
            <li>You will not use the Platform for fraudulent, unlawful, or abusive purposes.</li>
          </UL>
          <P>Additional age requirements may apply to individual experiences.</P>

          <H2 id="accounts">3. Accounts</H2>
          <P>Certain Platform features require you to create an account.</P>
          <P>You may register using supported authentication methods, which may include:</P>
          <UL>
            <li>Email authentication</li>
            <li>Google</li>
            <li>Facebook</li>
            <li>Microsoft</li>
            <li>Other authentication providers introduced by Plungers</li>
          </UL>
          <P>You are responsible for:</P>
          <UL>
            <li>Providing accurate information</li>
            <li>Maintaining the security of your account</li>
            <li>Keeping account information current</li>
            <li>Protecting your login credentials</li>
            <li>All activity occurring through your account unless caused by circumstances outside your reasonable control</li>
          </UL>
          <P>
            You must notify Plungers promptly if you believe your account has
            been accessed without authorization.
          </P>
          <P>
            Plungers may suspend or terminate accounts that violate these Terms
            or applicable law.
          </P>

          <H2 id="traveler-accounts">4. Traveler Accounts</H2>
          <P>Travelers may use Plungers to:</P>
          <UL>
            <li>Browse experiences</li>
            <li>Search for experiences</li>
            <li>Save experiences</li>
            <li>View experience details</li>
            <li>Submit inquiries</li>
            <li>Make bookings where available</li>
            <li>Submit reviews and ratings</li>
            <li>Manage account information</li>
          </UL>
          <P>
            Travelers are responsible for reviewing the details, requirements,
            restrictions, meeting instructions, cancellation policies, and other
            information associated with an experience before booking.
          </P>

          <H2 id="business-accounts">5. Business and Experience Provider Accounts</H2>
          <P>Businesses may apply to become experience providers on Plungers.</P>
          <P>Businesses may be required to provide information including:</P>
          <UL>
            <li>Business details</li>
            <li>Contact information</li>
            <li>Experience information</li>
            <li>Pricing</li>
            <li>Location</li>
            <li>Availability</li>
            <li>Supporting documentation</li>
            <li>Identity or business verification information</li>
          </UL>
          <P>Submitting an application does not guarantee acceptance.</P>
          <P>
            Plungers may review, approve, reject, suspend, or remove business
            accounts or experiences at its discretion, subject to applicable law
            and any contractual obligations.
          </P>
          <P>
            Businesses are responsible for ensuring that all information
            submitted to Plungers is accurate, lawful, and current.
          </P>

          <H2 id="experience-listings">6. Experience Listings</H2>
          <P>Businesses are responsible for the accuracy of their experience listings.</P>
          <P>Listings may include:</P>
          <UL>
            <li>Experience descriptions</li>
            <li>Photographs and other media</li>
            <li>Pricing</li>
            <li>Availability</li>
            <li>Duration</li>
            <li>Location</li>
            <li>Requirements</li>
            <li>Restrictions</li>
            <li>Cancellation policies</li>
            <li>Included or excluded services</li>
            <li>Participant requirements</li>
          </UL>
          <P>
            Businesses must not publish misleading, fraudulent, unlawful,
            discriminatory, unsafe, or otherwise prohibited experiences.
          </P>
          <P>
            Plungers may modify, reject, suspend, or remove listings that violate
            these Terms or Platform standards.
          </P>

          <H2 id="provider-responsibilities">7. Experience Provider Responsibilities</H2>
          <P>Businesses and experience providers are responsible for:</P>
          <UL>
            <li>Providing the experience substantially as described</li>
            <li>Maintaining any licenses, permits, insurance, or approvals required by applicable law</li>
            <li>Providing accurate availability and pricing</li>
            <li>Complying with applicable safety requirements</li>
            <li>Treating travelers lawfully and respectfully</li>
            <li>Meeting applicable accessibility and nondiscrimination requirements</li>
            <li>Communicating material changes to travelers</li>
            <li>Honoring confirmed bookings, subject to legitimate cancellation or force-majeure circumstances</li>
          </UL>
          <P>
            Plungers does not independently guarantee that every business or
            experience complies with every local legal requirement.
          </P>

          <H2 id="verification">8. Identity and Business Verification</H2>
          <P>
            Plungers may require users or businesses to complete identity or
            other verification procedures.
          </P>
          <P>
            Verification may be provided through third-party services such as
            Stripe Identity or other verification providers.
          </P>
          <P>
            Providing false, misleading, fraudulent, or stolen identification
            information is strictly prohibited.
          </P>
          <P>
            Failure to complete a required verification process may result in an
            account or experience being restricted, suspended, or rejected.
          </P>
          <P>
            Completion of identity verification does not constitute an
            endorsement or guarantee of a user&rsquo;s character, qualifications,
            safety, or conduct.
          </P>

          <H2 id="payments">9. Payments</H2>
          <P>
            Payments for experiences may be processed through third-party
            payment providers, including Stripe.
          </P>
          <P>
            When you make a payment through Plungers, you authorize the
            applicable payment provider to process the transaction using the
            payment method you provide.
          </P>
          <P>
            Prices displayed on the Platform may include or exclude applicable
            taxes, fees, or charges as identified during the booking process.
          </P>
          <P>
            Plungers may facilitate payments between travelers and experience
            providers, but the exact payment and payout structure may vary
            depending on the experience and applicable agreements.
          </P>

          <H2 id="refunds">10. Refunds and Cancellations</H2>
          <P>Each experience may have its own cancellation and refund policy.</P>
          <P>The applicable policy should be reviewed before completing a booking.</P>
          <P>
            Where Plungers processes a refund, the refund will generally be
            returned through the original payment method, subject to the
            applicable payment provider&rsquo;s processing time.
          </P>
          <P>
            Where a business cancels an experience, Plungers may provide a
            refund or other remedy according to the applicable booking and
            cancellation terms.
          </P>
          <P>Plungers may establish additional refund procedures as the Platform develops.</P>

          <H2 id="bookings">11. Bookings</H2>
          <P>
            A booking may be considered confirmed only after the Platform
            provides confirmation or otherwise indicates that the transaction
            has been successfully completed.
          </P>
          <P>Travelers are responsible for providing accurate booking information.</P>
          <P>
            Businesses are responsible for honoring confirmed bookings except
            where cancellation is permitted under the applicable terms.
          </P>
          <P>
            Plungers may cancel or restrict a booking where necessary for fraud
            prevention, safety, technical issues, legal compliance, or other
            legitimate reasons.
          </P>

          <H2 id="reviews">12. Reviews and Ratings</H2>
          <P>Plungers may allow travelers to submit reviews and ratings of experiences.</P>
          <P>Reviews should reflect the reviewer&rsquo;s genuine experience.</P>
          <P>Users must not:</P>
          <UL>
            <li>Submit fraudulent reviews</li>
            <li>Review experiences they did not participate in</li>
            <li>Manipulate ratings</li>
            <li>Accept compensation in exchange for misleading reviews</li>
            <li>Threaten or harass businesses or other users through reviews</li>
            <li>Post unlawful, defamatory, discriminatory, or abusive content</li>
            <li>Include unnecessary personal or confidential information</li>
          </UL>
          <P>Plungers may moderate, remove, or restrict reviews that violate these Terms.</P>
          <P>
            Plungers does not guarantee that reviews are accurate, complete, or
            representative of every user&rsquo;s experience.
          </P>

          <H2 id="user-content">13. User-Generated Content</H2>
          <P>
            Users and businesses may submit photographs, text, reviews,
            descriptions, logos, videos, and other content (&ldquo;User
            Content&rdquo;).
          </P>
          <P>You retain ownership of User Content that you legally own.</P>
          <P>
            By submitting User Content to Plungers, you grant Plungers a
            worldwide, non-exclusive, royalty-free, transferable, sublicensable
            license to host, store, reproduce, display, distribute, adapt,
            format, and use that content as reasonably necessary to operate,
            promote, improve, and provide the Platform.
          </P>
          <P>You represent that:</P>
          <UL>
            <li>You own or have the necessary rights to submit the content.</li>
            <li>Your content does not infringe another person&rsquo;s rights.</li>
            <li>Your content does not violate applicable law.</li>
            <li>Your content does not contain unlawful or malicious material.</li>
          </UL>
          <P>Plungers may remove User Content that violates these Terms.</P>

          <H2 id="intellectual-property">14. Intellectual Property</H2>
          <P>
            The Platform, including its software, design, branding, trademarks,
            graphics, interfaces, text, functionality, and original content, is
            owned by or licensed to Plungers and is protected by applicable
            intellectual-property laws.
          </P>
          <P>Except as expressly permitted by these Terms, you may not:</P>
          <UL>
            <li>Copy or reproduce the Platform</li>
            <li>Reverse engineer or attempt to extract source code</li>
            <li>Scrape or systematically collect Platform data</li>
            <li>Reproduce Plungers branding without authorization</li>
            <li>Create derivative works from Platform content</li>
            <li>Use automated systems to access the Platform in a manner that violates these Terms</li>
          </UL>
          <P>
            Businesses retain ownership of content they independently provide,
            subject to the license described above.
          </P>

          <H2 id="acceptable-use">15. Acceptable Use</H2>
          <P>You agree not to use Plungers to:</P>
          <UL>
            <li>Commit fraud</li>
            <li>Impersonate another person or business</li>
            <li>Create false accounts</li>
            <li>Provide false identity or business information</li>
            <li>Circumvent verification systems</li>
            <li>Upload malicious software</li>
            <li>Attempt unauthorized access</li>
            <li>Interfere with Platform security</li>
            <li>Scrape or harvest information without authorization</li>
            <li>Promote unlawful activities</li>
            <li>Harass, threaten, or abuse other users</li>
            <li>Discriminate against users unlawfully</li>
            <li>Publish misleading or fraudulent experiences</li>
            <li>Manipulate reviews or ratings</li>
            <li>
              Conduct transactions outside the Platform for the purpose of
              avoiding applicable Platform fees or controls where prohibited by
              applicable agreements
            </li>
          </UL>

          <H2 id="third-party-services">16. Third-Party Services</H2>
          <P>Plungers relies on third-party services to provide portions of the Platform.</P>
          <P>These may include services for:</P>
          <UL>
            <li>Payments</li>
            <li>Identity verification</li>
            <li>Authentication</li>
            <li>Database hosting</li>
            <li>Mapping</li>
            <li>Infrastructure</li>
            <li>Analytics</li>
            <li>Communications</li>
            <li>Security</li>
          </UL>
          <P>Third-party services may have their own terms and policies.</P>
          <P>Your use of those services may be subject to the applicable third party&rsquo;s terms.</P>

          <H2 id="maps">17. Maps and Location Information</H2>
          <P>
            Plungers may use mapping and location services to display experience
            and business locations.
          </P>
          <P>
            Map information is provided for convenience and may not always be
            completely accurate or current.
          </P>
          <P>
            Users should independently verify important location,
            transportation, accessibility, safety, and meeting-point information
            before participating in an experience.
          </P>

          <H2 id="safety">18. Safety</H2>
          <P>
            Plungers is a marketplace platform and does not guarantee the
            safety, quality, legality, suitability, or condition of every
            experience or business listed on the Platform.
          </P>
          <P>
            Travelers are responsible for considering whether an experience is
            appropriate for their circumstances.
          </P>
          <P>
            Businesses are responsible for complying with applicable safety
            requirements and accurately disclosing material risks or
            requirements associated with their experiences.
          </P>
          <P>
            If an experience involves physical activity, travel, food, animals,
            water, vehicles, alcohol, controlled environments, or other
            potentially hazardous circumstances, users should review the
            applicable experience information carefully and follow all safety
            instructions.
          </P>

          <H2 id="disclaimers">19. Disclaimers</H2>
          <P>
            To the maximum extent permitted by applicable law, Plungers provides
            the Platform on an &ldquo;as is&rdquo; and &ldquo;as
            available&rdquo; basis.
          </P>
          <P>We do not guarantee that:</P>
          <UL>
            <li>The Platform will always be available</li>
            <li>The Platform will be error-free</li>
            <li>Experience information will always be accurate</li>
            <li>Every business or experience will meet a user&rsquo;s expectations</li>
            <li>Every experience will be available at all times</li>
            <li>Third-party services will operate without interruption</li>
          </UL>
          <P>
            Plungers does not guarantee the conduct, qualifications, legality,
            safety, or performance of independent businesses or travelers.
          </P>
          <P>
            Nothing in these Terms excludes or limits rights or protections that
            cannot legally be excluded or limited.
          </P>

          <H2 id="limitation-of-liability">20. Limitation of Liability</H2>
          <P>
            To the maximum extent permitted by applicable law, Plungers will not
            be responsible for indirect, incidental, special, consequential,
            exemplary, or punitive damages arising from or relating to:
          </P>
          <UL>
            <li>Your use of the Platform</li>
            <li>Your inability to use the Platform</li>
            <li>An experience provided by an independent business</li>
            <li>Conduct of another user</li>
            <li>Third-party services</li>
            <li>Loss of data</li>
            <li>Unauthorized access caused by circumstances outside Plungers&rsquo; reasonable control</li>
          </UL>
          <P>
            To the extent permitted by applicable law, Plungers&rsquo; total
            liability arising from a claim relating to the Platform will be
            limited to the amount you paid to Plungers for the applicable
            service during the {LIABILITY_MONTHS}-month period preceding the
            event giving rise to the claim.
          </P>
          <P>This limitation does not apply where prohibited by applicable law.</P>

          <H2 id="indemnification">21. Indemnification</H2>
          <P>
            To the extent permitted by applicable law, you agree to defend,
            indemnify, and hold harmless Plungers and its owners, officers,
            employees, contractors, and service providers from claims,
            liabilities, damages, losses, and expenses arising from:
          </P>
          <UL>
            <li>Your violation of these Terms</li>
            <li>Your User Content</li>
            <li>Your misuse of the Platform</li>
            <li>Your violation of applicable law</li>
            <li>Your infringement of another person&rsquo;s rights</li>
            <li>Your conduct in connection with an experience</li>
          </UL>

          <H2 id="suspension">22. Account Suspension and Termination</H2>
          <P>
            Plungers may suspend or terminate access to an account where
            reasonably necessary due to:
          </P>
          <UL>
            <li>Violation of these Terms</li>
            <li>Fraud or suspected fraud</li>
            <li>Security concerns</li>
            <li>Abuse or harassment</li>
            <li>False information</li>
            <li>Failed verification</li>
            <li>Illegal activity</li>
            <li>Payment-related issues</li>
            <li>Conduct that may harm users or the Platform</li>
          </UL>
          <P>Users may request account closure by contacting Plungers.</P>
          <P>
            Certain information may be retained after account closure when
            necessary for legal, accounting, security, fraud-prevention,
            dispute-resolution, or other legitimate purposes.
          </P>

          <H2 id="platform-changes">23. Changes to the Platform</H2>
          <P>
            Plungers may modify, add, remove, suspend, or discontinue features
            of the Platform as the service develops.
          </P>
          <P>
            Because Plungers is an evolving platform, certain features may be
            introduced gradually or may not be available in every location.
          </P>

          <H2 id="terms-changes">24. Changes to These Terms</H2>
          <P>We may update these Terms periodically.</P>
          <P>
            When material changes are made, we may provide notice through the
            Platform or other reasonable means.
          </P>
          <P>
            Your continued use of Plungers after updated Terms become effective
            constitutes acceptance of the updated Terms to the extent permitted
            by applicable law.
          </P>

          <H2 id="governing-law">25. Governing Law and Disputes</H2>
          <P>
            These Terms shall be governed by the laws of{" "}
            <strong>{GOVERNING_JURISDICTION}</strong>, without regard to
            conflict-of-law principles, unless applicable law requires
            otherwise.
          </P>
          <P>
            Any dispute arising from or relating to these Terms or the Platform
            shall be resolved in the courts or dispute-resolution forum located
            in <strong>{DISPUTE_FORUM}</strong>, unless applicable law provides
            otherwise.
          </P>
          <CounselNote>
            Client / legal counsel: confirm governing jurisdiction and whether
            arbitration, mediation, or another dispute-resolution process
            should be included before publication.
          </CounselNote>

          <H2 id="severability">26. Severability</H2>
          <P>
            If any provision of these Terms is determined to be invalid or
            unenforceable, the remaining provisions will remain in effect to the
            fullest extent permitted by law.
          </P>

          <H2 id="entire-agreement">27. Entire Agreement</H2>
          <P>
            These Terms, together with any additional terms or policies
            expressly incorporated into them, constitute the agreement between
            you and Plungers concerning your use of the Platform.
          </P>

          <H2 id="contact">28. Contact Us</H2>
          <P>If you have questions regarding these Terms, please contact:</P>
          <P>
            <strong>{LEGAL_COMPANY_NAME}</strong>
            <br />
            {BUSINESS_ADDRESS}
            <br />
            {COMPANY_COUNTRY}
          </P>
          <P>
            <strong>Email:</strong> {GENERAL_CONTACT_EMAIL}
          </P>

          <div className="mt-8">
            <Link
              href="/privacy"
              className="text-sm font-semibold text-[#006f6b] hover:text-[#00534d] underline underline-offset-4"
            >
              View our Privacy Policy →
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
