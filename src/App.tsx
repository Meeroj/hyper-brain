import { About } from "./components/landing/About";
import { Cta } from "./components/landing/Cta";
import { FAQ } from "./components/landing/FAQ";
import { Features } from "./components/landing/Features";
import { Footer } from "./components/landing/Footer";
import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { Navbar } from "./components/landing/Navbar";
import { Newsletter } from "./components/landing/Newsletter";
import { Pricing } from "./components/landing/Pricing";
import { ScrollToTop } from "./components/landing/ScrollToTop";
import { Services } from "./components/landing/Services";
import { Sponsors } from "./components/landing/Sponsors";
import { Team } from "./components/landing/Team";
import { Testimonials } from "./components/landing/Testimonials";

export default function App() {
  return (
    <>
    <Navbar />
    <Hero />
    <Sponsors />
    <About />
    <HowItWorks />
    <Features />
    <Services />
    <Cta />
    <Testimonials />
    <Team />
    <Pricing />
    <Newsletter />
    <FAQ />
    <Footer />
    <ScrollToTop />
  </>
  )
}

// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

// export default function App() {
//   return (
//     <header>
//       <SignedOut>
//         <SignInButton/>
//       </SignedOut>
//       <SignedIn>
//         <UserButton />
//       </SignedIn>
//     </header>
//   )
// }
