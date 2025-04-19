import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import RegistrationPage from "@/pages/RegistrationPage";
import ContactPage from "@/pages/ContactPage";
import VideoOpeningSlide from "@/pages/presentation/VideoOpeningSlide";
import { PresentationProvider } from "@/lib/presentationContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/register" component={ContactPage} />
      <Route path="/video" component={VideoOpeningSlide} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PresentationProvider>
        <Router />
        <Toaster />
      </PresentationProvider>
    </QueryClientProvider>
  );
}

export default App;
