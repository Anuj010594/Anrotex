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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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

      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
