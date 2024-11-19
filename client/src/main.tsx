import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "./components/ui/toaster";
import LandingPage from "./pages/LandingPage";
import Trial from "./pages/Trial";
import { HelpCenter } from "./pages/Support/HelpCenter";
import { Contact } from "./pages/Support/Contact";
import { Privacy } from "./pages/Support/Privacy";
import { Terms } from "./pages/Support/Terms";
import { Features } from "./pages/Product/Features";
import { Pricing } from "./pages/Product/Pricing";
import { About } from "./pages/Company/About";
import { Blog } from "./pages/Company/Blog";
import { Careers } from "./pages/Company/Careers";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <Switch>
        <Route path="/" element={<LandingPage />} />
        <Route path="/trial" element={<Trial />} />
        <Route path="/support/help" element={<HelpCenter />} />
        <Route path="/support/contact" element={<Contact />} />
        <Route path="/support/privacy" element={<Privacy />} />
        <Route path="/support/terms" element={<Terms />} />
        <Route path="/product/features" element={<Features />} />
        <Route path="/product/pricing" element={<Pricing />} />
        <Route path="/company/about" element={<About />} />
        <Route path="/company/blog" element={<Blog />} />
        <Route path="/company/careers" element={<Careers />} />
        <Route>
          <div>404 Page Not Found</div>
        </Route>
      </Switch>
      <Toaster />
    </SWRConfig>
  </StrictMode>
);
