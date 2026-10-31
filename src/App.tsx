import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Seo } from "./components/Seo";
import Home from "./pages/Home";
import ThanksBen from "./samples/thanksben/ThanksBen";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();

  const isSamplePage =
    pathname === "/samples" ||
    pathname.startsWith("/samples/");

  return (
    <>
      <ScrollTop />
    
{!isSamplePage && <Nav />}

      <Routes>

        <Route
          path="/"
          element={
            <>
        



<Seo
  title="Free B2B SaaS SEO Plan & 90-Day Roadmap | GrowUp"
  description="Get a free, tailored 90-day B2B SaaS SEO plan with priority keywords, recommended pages, competitor opportunities and a roadmap for growing qualified pipeline."
  path="/"
  type="website"
/>



              <Home />
            </>
          }

        />

        {/* THANKSBEN SAMPLE */}
        <Route
          path="/samples/thanksben"
          element={
            <>
              <Seo
                title="ThanksBen SEO Strategy & 90-Day Roadmap | GrowUp"
                description="Explore a tailored B2B SaaS SEO strategy for ThanksBen, covering commercial search opportunities, competitor research, AI visibility and 90-day priorities."
                path="/samples/thanksben"
                type="website"
              />
              <ThanksBen />
            </>
          }
        />

        <Route
          path="*"

          element={
            <>


            <Seo
  title="Page Not Found | GrowUp"
  description="This page doesn't exist. Return to GrowUp's free B2B SaaS SEO plan and explore your next 90 days of organic growth priorities."
  path="/"
  type="website"
/>

              <Home />
            </>
          }
        />
      </Routes>
     
{!isSamplePage && <Footer />}

    </>
  );
}