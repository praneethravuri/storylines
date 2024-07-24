import React from 'react'
import Hero from './Hero'
import Features from './Features'
import Inspiration from './Inspiration'
import GitHubContribution from './GitHubContribution'
import Footer from './Footer'
import FAQ from './Faq'
import styles from "@/styles/glowAnimation.module.css";

const LandingPage = () => {
  return (
    <div className={`min-h-screen ${styles.glowAnimation}`}>
      <Hero />
      <Features />
      <Inspiration />
      <FAQ />
      <GitHubContribution />
      <Footer />
    </div>
  )
}

export default LandingPage