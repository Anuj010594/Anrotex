import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import FintechAwsCostReduction from "./pages/case-studies/FintechAwsCostReduction";
import ContactPage from "./pages/ContactPage";
import SolutionsPage from "./pages/SolutionsPage";
import AWSCostOptimization from "./pages/AWSCostOptimization";
import KubernetesScaling from "./pages/KubernetesScaling";
import CICDAutomation from "./pages/CICDAutomation";
import DevOpsConsulting from "./pages/DevOpsConsulting";
import AwsCostReductionBlog from "./pages/blog/AwsCostReductionBlog";
import CICDBestPractices from "./pages/blog/CICDBestPractices";
import KubernetesScalingBestPractices from "./pages/blog/KubernetesScalingBestPractices";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const Analytics = lazy(() =>
  import("@vercel/analytics/react").then(({ Analytics: component }) => ({
    default: component,
  })),
);
const SpeedInsights = lazy(() =>
  import("@vercel/speed-insights/react").then(
    ({ SpeedInsights: component }) => ({ default: component }),
  ),
);

const DeferredTelemetry = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    const schedule = () => {
      timeoutId = window.setTimeout(() => setReady(true), 600);
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      window.removeEventListener("load", schedule);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <Analytics />
      <SpeedInsights />
    </Suspense>
  );
};

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route
          path="/case-studies/fintech-aws-cost-reduction"
          element={<FintechAwsCostReduction />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/aws-cost-optimization" element={<AWSCostOptimization />} />
        <Route path="/kubernetes-scaling" element={<KubernetesScaling />} />
        <Route path="/ci-cd-automation" element={<CICDAutomation />} />
        <Route path="/devops-consulting" element={<DevOpsConsulting />} />
        <Route path="/blog/reduce-aws-costs" element={<AwsCostReductionBlog />} />
        <Route path="/blog/cicd-best-practices" element={<CICDBestPractices />} />
        <Route
          path="/blog/kubernetes-scaling-best-practices"
          element={<KubernetesScalingBestPractices />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <DeferredTelemetry />
    </>
  );
}

export default App;
