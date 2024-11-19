import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Switch, Route } from "wouter";
import "./index.css";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/fetcher";
import { Toaster } from "./components/ui/toaster";
import LandingPage from "./pages/LandingPage";
import Trial from "./pages/Trial";
import help-center from "./pages/Support";
import contact from "./pages/Support";
import privacy from "./pages/Support";
import terms-of-serivce from "./pages/Support";
import features from "./pages/Product";
import pricing from "./pages/Product";
import about from "./pages/Company";
import blog from "./pages/Company";
import careers from "./pages/Company";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <Switch>
        <Route path="/" component={LandingPage} />
        <Route path="/trial" component={Trial} />
        <Route>404 Page Not Found</Route>
      </Switch>
      <Toaster />
    </SWRConfig>
  </StrictMode>,
);
