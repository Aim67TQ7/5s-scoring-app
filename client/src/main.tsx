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
        <Route path="/" component={LandingPage} />
        <Route path="/trial" component={Trial} />
        <Route path="/support/help" component={HelpCenter} />
        <Route path="/support/contact" component={Contact} />
        <Route path="/support/privacy" component={Privacy} />
        <Route path="/support/terms" component={Terms} />
        <Route path="/product/features" component={Features} />
        <Route path="/product/pricing" component={Pricing} />
        <Route path="/company/about" component={About} />
        <Route path="/company/blog" component={Blog} />
        <Route path="/company/careers" component={Careers} />
        <Route>404 Page Not Found</Route>
      </Switch>
      <Toaster />
    </SWRConfig>
  </StrictMode>,
);
