import React, { useState, useEffect, Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Projects = lazy(() => import("./components/Projects/Projects"));
const Resume = lazy(() => import("./components/Resume/Resume"));
const TerminalResume = lazy(() => import("./components/Resume/TerminalResume"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const NotFound = lazy(() => import("./components/NotFound"));

function AppContent({ load }) {
  const location = useLocation();

  return (
    <>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <ErrorBoundary locationKey={location.key}>
          <Suspense
            fallback={
              <div className="lazy-loader">
                <div className="spinner" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/terminal" element={<TerminalResume />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <AppContent load={load} />
      </Router>
    </HelmetProvider>
  );
}

export default App;
