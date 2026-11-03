import { Link } from "react-router-dom";
import PolicyPage from "@/components/PolicyPage";

export default function PrivacyPolicy() {
  return <PolicyPage title="Privacy policy" description="What information we collect through this website, why we use it and how to contact us about your privacy." path="/privacy-policy">
    <p>This website is operated by Anrotex IT Systems LLP, Pune, India, LLPIN ACY-8754. For privacy questions or requests, email <a href="mailto:sales@anrotex.com">sales@anrotex.com</a>.</p>

    <h2>When you contact us</h2>
    <p>Our enquiry form collects your name, work email and message. You can also provide your company and the service you are interested in. The form includes the page you submitted it from so we can understand your enquiry.</p>
    <p>We use this information to reply, discuss the work you need and keep records of that conversation. Your enquiry is delivered to our business email inbox through our email provider. Sending an enquiry does not subscribe you to a newsletter.</p>
    <p>Please keep passwords, access keys, payment details and private customer data out of the form. If an engagement needs access to your systems, we agree a separate way to provide it.</p>

    <h2>Website operation and security</h2>
    <p>Vercel hosts this website. When you visit, hosting and security services process technical information such as your IP address, browser, requested page and request time to deliver the site and investigate errors or abuse.</p>
    <p>The enquiry form temporarily uses your IP address to limit repeated submissions. It can also use Cloudflare Turnstile to check for automated submissions. Cloudflare processes browser and network information for that check; see its <a href="https://www.cloudflare.com/turnstile-privacy-policy/" target="_blank" rel="noreferrer">Turnstile privacy notice</a>.</p>

    <h2 id="cookies">Analytics, cookies and your choice</h2>
    <p>With your permission, Google Analytics uses cookies to help us understand page visits, traffic sources, service interest and enquiry steps. This can include device and browser information, approximate location, campaign links and whether a form was started or submitted.</p>
    <p>Our analytics events do not include your name, email address or message. We do not use Google Analytics for advertising on this site. You can allow or decline its cookies, and change that choice using <strong>Cookie preferences</strong> in the footer. Declining does not prevent you from using the site or sending an enquiry.</p>
    <p>Your browser stores your cookie choice so we can remember it. That choice remains until you change it or clear the site's browser storage. For Google's own processing, read <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noreferrer">how Google uses information from sites that use its services</a>.</p>
    <p>We also use Vercel Web Analytics and Speed Insights for website usage and loading-speed reports. They process page, referral, device, country and performance information without analytics cookies. They can run even when you decline Google Analytics cookies. Read Vercel's notices for <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noreferrer">Web Analytics</a> and <a href="https://vercel.com/docs/speed-insights/privacy-policy" target="_blank" rel="noreferrer">Speed Insights</a>.</p>

    <h2>Downloads and outside links</h2>
    <p>You do not need to provide an email address to download our free resources. The website may record the page visit and download-link click as described above. Files you edit on your computer are not uploaded to us by this website.</p>
    <p>Other websites linked from our pages have their own privacy practices. Our <Link to="/downloads-policy">download terms and safe-use guidance</Link> explain what to check before running code.</p>

    <h2>Who receives information</h2>
    <p>Information is used by Anrotex and service providers that help us host the site, deliver email, prevent abuse and measure website use. We may also disclose information when required by law or to respond to a legal claim. We do not sell enquiry information.</p>
    <p>Anrotex is based in India. Our service providers may process information in other countries. Their privacy notices explain their processing and transfer arrangements.</p>

    <h2>How long information is kept</h2>
    <p>We keep enquiry records for as long as needed to handle the conversation, manage any resulting work and meet legal or record-keeping requirements. The period depends on the purpose of the record and any requirements that apply to it. You can contact us to ask about information we hold or request deletion.</p>

    <h2>Your requests and concerns</h2>
    <p>Email <a href="mailto:sales@anrotex.com">sales@anrotex.com</a> to request access, correction or deletion, or raise a privacy concern. Tell us which enquiry or information you mean. We may need to verify your identity before acting. Please do not send identity documents unless we agree that they are needed and how to provide them.</p>
    <p>Your rights and any limits on a request depend on the law that applies. Some records may need to be kept for legal reasons. You may also have the right to complain to your local data-protection authority.</p>

    <h2>Changes to this policy</h2>
    <p>We will update this page when our website's practices change and show the effective date above. You can contact us if a change is unclear.</p>
  </PolicyPage>;
}
