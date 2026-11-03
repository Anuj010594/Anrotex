import { Link } from "react-router-dom";
import PolicyPage from "@/components/PolicyPage";

export default function WebsiteTerms() {
  return <PolicyPage title="Website terms" description="The terms for using Anrotex's website, guides and free resources." path="/terms-of-use">
    <p>This website belongs to Anrotex IT Systems LLP, Pune, India, LLPIN ACY-8754. Questions about these terms can be sent to <a href="mailto:sales@anrotex.com">sales@anrotex.com</a>.</p>

    <h2>Guides and examples</h2>
    <p>Our articles, code, workflows and worksheets help you understand and plan engineering work. An example may need changes before it fits your application. Check the assumptions, permissions, dependencies and costs before using it.</p>
    <p>Published test results describe the checks performed for that example. They do not guarantee that it will work safely in another environment or that every possible fault has been found.</p>

    <h2 id="code-permission">Using downloadable code</h2>
    <p>Unless a file includes a different licence, you may download, copy and modify Anrotex's sample code and workflow files for learning and evaluation only, in a separate test environment. Keep the copyright and usage notices supplied with the files.</p>
    <p>This permission does not cover production use, delivery as part of client work or redistribution. Contact <a href="mailto:sales@anrotex.com">sales@anrotex.com</a> for written permission before using the code for those purposes.</p>
    <p>This permission does not give you rights to third-party software or Anrotex's name and branding. Third-party components keep their own licences. Do not present our examples or your changes as work we have reviewed or endorsed.</p>
    <p>Read the <Link to="/downloads-policy">download terms and safe-use guidance</Link> before running code. You are responsible for checking how the files will behave in your environment.</p>

    <h2>Other website content</h2>
    <p>You may save guides and worksheets for your own reference and use the worksheets for your own planning. You may share links to our pages and quote short passages with credit and a link. Contact us before republishing complete articles, graphics or other website content.</p>

    <h2>Paid services are agreed separately</h2>
    <p>Sending an enquiry or downloading a file does not start a paid engagement. The scope, fees, access, deliverables and acceptance checks for consulting work are agreed separately in writing. That agreement governs the paid work.</p>

    <h2>Responsible use</h2>
    <p>Use the website and examples lawfully and only with systems you are authorised to access. Do not use them to introduce harmful code, disrupt services, obtain someone else's data or bypass access controls.</p>
    <p>If you find a possible problem with our website or a download, email <a href="mailto:sales@anrotex.com">sales@anrotex.com</a>. Please get written permission before carrying out security testing against our live systems.</p>

    <h2>Responsibility and limits</h2>
    <p>Free resources are provided as they are. To the extent permitted by law, we do not promise that they are error-free, suitable for every purpose or continuously available.</p>
    <p>Review and test files before using them, keep backups and control access to your systems. Code and third-party tools can change files, access data, interrupt services or incur cloud charges.</p>
    <p>To the extent permitted by law, Anrotex is not liable for loss of data, service interruption, lost profit or unexpected charges resulting from use of these free resources. Nothing in these terms removes rights you have, or limits liability that cannot legally be excluded.</p>

    <h2>Outside websites and software</h2>
    <p>Links to other websites and references to third-party tools are provided for convenience. Their availability, terms, licences and privacy practices may differ from ours. Review them before using those services or installing software.</p>

    <h2>Updates</h2>
    <p>We may correct or remove website content and downloads when needed. Changes to these terms apply from the effective date shown above. A separate licence supplied with a file continues to govern that file.</p>
    <p>Our <Link to="/privacy-policy">privacy policy</Link> explains how information collected through the website is used.</p>
  </PolicyPage>;
}
