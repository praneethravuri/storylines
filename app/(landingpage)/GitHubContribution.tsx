import React from 'react';
import Link from 'next/link';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const GitHubContribution = () => {
  return (
    <section className="container py-20 relative overflow-hidden">
    <div className="text-center mb-16">
      <h2 className="heading-landing mb-4">
        StoryLines is <span className="text-primary">Open Source</span>
      </h2>
      <p className="paragraph-primary mb-8 max-w-2xl mx-auto">
        We believe in the power of open-source. Learning and sharing knowledge are essential for growth and innovation. Join us and contribute to a community that values collaboration and transparency. Together, we can achieve more.
      </p>
      <Link href="https://github.com/praneethravuri/storylines" target='_blank' className="btn btn-outline group">
        Contribute to StoryLines <ArrowTopRightIcon className="inline-block ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </Link>
    </div>
  </section>
  )
}

export default GitHubContribution