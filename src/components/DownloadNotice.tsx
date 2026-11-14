import { Link } from "react-router-dom";

export default function DownloadNotice() {
  return <p className="!text-sm leading-relaxed">Review files before using them. Sample code and workflows are for learning and evaluation only. Run code in a separate test environment without production access. Read our <Link to="/downloads-policy" className="font-semibold underline underline-offset-4">download terms and safe-use guidance</Link>.</p>;
}
