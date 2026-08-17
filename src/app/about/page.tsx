import { Metadata } from 'next';
import Link from 'next/link';
import { BRAND } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'About OpsKnight | Open Source Incident Management',
  description: 'Learn about OpsKnight, the open-source alternative to PagerDuty built for modern engineering teams.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-24 pt-32 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-slate">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-white">About OpsKnight</h1>
        
        <p className="text-lg text-slate-300 leading-relaxed mb-6">
          OpsKnight was built out of frustration with existing incident management tools. 
          As engineering teams grow, per-seat pricing models for tools like PagerDuty become prohibitively expensive, 
          and many platforms lack the flexibility needed by modern, fast-moving organizations.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">Our Mission</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          We believe that reliable incident management is a fundamental requirement for any software team, 
          not a luxury. Our mission is to make enterprise-grade incident response accessible to every engineering 
          team by providing a robust, open-source alternative.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">The Open Source Philosophy</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          OpsKnight is licensed under AGPL-3.0 and is proudly open-source. We are a community-driven project 
          that adopts a "self-hosted first" approach. You maintain full ownership of your data, complete 
          control over your infrastructure, and avoid vendor lock-in.
        </p>

        <h2 className="text-2xl font-semibold mt-12 mb-4 text-white">The Creator</h2>
        <p className="text-slate-300 leading-relaxed mb-8">
          OpsKnight is created and maintained by Dushyant Rahangdale.
        </p>

        <div className="flex gap-4 mt-12">
          <a href={BRAND.links.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 rounded-md bg-white text-zinc-950 font-medium hover:bg-zinc-200 transition-colors no-underline">
            View on GitHub
          </a>
          <Link href="/docs" className="px-5 py-2.5 rounded-md border border-white/20 text-white hover:bg-white/10 transition-colors no-underline">
            Read the Docs
          </Link>
        </div>
      </div>
    </main>
  );
}
