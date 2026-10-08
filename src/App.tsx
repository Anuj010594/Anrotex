import { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const CaseStudiesPage = lazy(() => import("./pages/CaseStudiesPage"));
const FintechAwsCostReduction = lazy(() => import("./pages/case-studies/FintechAwsCostReduction"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SolutionsPage = lazy(() => import("./pages/SolutionsPage"));
const AWSCostOptimization = lazy(() => import("./pages/AWSCostOptimization"));
const KubernetesScaling = lazy(() => import("./pages/KubernetesScaling"));
const CICDAutomation = lazy(() => import("./pages/CICDAutomation"));
const DevOpsConsulting = lazy(() => import("./pages/DevOpsConsulting"));
const AwsCostReductionBlog = lazy(() => import("./pages/blog/AwsCostReductionBlog"));
const CICDBestPractices = lazy(() => import("./pages/blog/CICDBestPractices"));
const KubernetesScalingBestPractices = lazy(() => import("./pages/blog/KubernetesScalingBestPractices"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
      <Suspense fallback={<p role="status" className="p-8 text-brand-navy">Loading page…</p>}>
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
      </Suspense>

      <DeferredTelemetry />
    </>
  );
}

export default App;
