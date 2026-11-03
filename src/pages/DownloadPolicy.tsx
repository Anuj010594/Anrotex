import { Link } from "react-router-dom";
import PolicyPage from "@/components/PolicyPage";
import checksumList from "../../public/downloads/SHA256SUMS.txt?raw";

const downloads = checksumList.trim().split("\n").map((line) => {
  const [sha256, file] = line.split("  ");
  return { sha256, file };
});

export default function DownloadPolicy() {
  return <PolicyPage title="Download terms and safe use" description="Check what a file does before running it. Use a separate test environment and protect your data and cloud access." path="/downloads-policy">
    <p>Our downloads include sample code, workflows, checklists and worksheets. Sample code and workflow files are for learning and evaluation only, in a separate test environment. A successful test does not make a file safe for every computer or cloud account.</p>
    <p>The <Link to="/terms-of-use#code-permission">website terms</Link> explain permission to use and modify our code. Any separate licence included with a file also applies.</p>

    <h2>Before running downloaded code</h2>
    <ol>
      <li><strong>Check the source.</strong> Download from <code>https://www.anrotex.com</code>. Read the accompanying instructions and open the code in a text editor before running it.</li>
      <li><strong>Review what it can do.</strong> Check commands, file changes, network requests, downloaded packages and access to environment variables. Review the dependencies and any changes you make too.</li>
      <li><strong>Use a separate test environment.</strong> Use a disposable virtual machine, container or test account appropriate to the code. A separate folder alone does not prevent access to your files or credentials.</li>
      <li><strong>Keep real data and access out.</strong> Do not start with production credentials, customer data or administrator permissions. Use test data, the least access needed and a budget for any cloud resources.</li>
      <li><strong>Plan recovery.</strong> Back up anything the code could change. Know how to stop it and recover before using it with a real workload. Keep security tools enabled.</li>
    </ol>

    <h2 id="lambda-tests">What the Lambda download does</h2>
    <p>The command <code>python3 -B -m unittest -v test_release</code> runs 23 tests using simulated AWS and application responses. Network connections are blocked while the tests run. They do not use AWS credentials or deploy an application, and need only Python's standard library.</p>
    <p>The same ZIP also includes <code>release.py</code> and <code>smoke.py</code> so you can inspect the real release and application checks. Running those scripts directly is different: with AWS access, they can publish code, change the version in use, send network requests and create test records. Cloud charges may apply.</p>
    <p>Both commands require <code>--confirm-test-account</code> with the 12-digit ID of your separate AWS test account. They check the destination and account before making changes. This does not prove that the account is safe to use: check its contents and permissions yourself.</p>
    <p>Read the <Link to="/blog/aws-lambda-rollback-github-actions#test-rollback">article's test instructions</Link> first. Review and configure the scripts separately before using them with AWS. They have not been verified through a live AWS release.</p>

    <h2>Workflows and other files</h2>
    <p>A GitHub Actions workflow can install packages and run commands from your repository. Review those commands, the referenced actions and their permissions before enabling it. A pinned version identifies the code to use; it does not guarantee that the code has no security issues.</p>
    <p>Checklists and worksheets help organise decisions. Check formulas, inputs and assumptions before relying on an estimate. Do not enable macros, external connections or extra software just because a downloaded file asks you to.</p>

    <h2 id="file-checks">Check that your file matches our copy</h2>
    <p>Each file below has a SHA-256 fingerprint, a value calculated from its contents. Compare your downloaded file's fingerprint with the published value. A match shows that the file contents match our copy; it does not prove the code is safe.</p>
    <p>For the Lambda ZIP, run <code>shasum -a 256 lambda-rollback-tests.zip</code> on macOS, <code>sha256sum lambda-rollback-tests.zip</code> on Linux, or <code>Get-FileHash .\lambda-rollback-tests.zip -Algorithm SHA256</code> in Windows PowerShell. Use the actual file name if your browser renamed it.</p>
    <p>If the values differ, stop and download a fresh copy. Contact us if the difference remains. File contents and fingerprints can change when we publish an update.</p>
    <p><a href="/downloads/SHA256SUMS.txt" download>Download the fingerprint list (.txt)</a></p>
    <details className="mt-6 rounded-2xl border border-brand-navy/20 p-5">
      <summary className="cursor-pointer font-bold">Current file fingerprints (SHA-256)</summary>
      <dl className="mt-5 space-y-5">
        {downloads.map(({ file, sha256 }) => <div key={file}>
          <dt className="break-all text-sm font-semibold"><a href={`/downloads/${file}`}>{file}</a></dt>
          <dd className="mt-2 break-all font-mono text-xs leading-relaxed text-brand-teal">{sha256}</dd>
        </div>)}
      </dl>
    </details>

    <h2 id="report-a-problem">Report a concern</h2>
    <p>If a file appears to contain unexpected or harmful code, stop using it and email <a href="mailto:sales@anrotex.com?subject=Download%20security%20concern">sales@anrotex.com</a>. Include the download URL, file name, download date, fingerprint if available and a short description of what you found.</p>
    <p>Do not send passwords, access keys or customer data. If the report needs sensitive details, ask us to agree a suitable way to share them. We may correct or withdraw a download while investigating.</p>
    <p>Free resources come without a promise that they are error-free or suitable for your systems, to the extent permitted by law. The <Link to="/terms-of-use">website terms</Link> explain these limits and preserve rights that the law does not allow us to exclude.</p>
  </PolicyPage>;
}
