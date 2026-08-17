import { Metadata } from 'next';
import IntegrationsGrid from './IntegrationsGrid';

export const metadata: Metadata = {
  title: 'Integrations | OpsKnight',
  description: 'Connect your entire monitoring stack. Every integration ships built-in — no marketplace, no plugins.',
};

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            24+ native integrations
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Connect your entire monitoring stack. Every integration ships built-in — no marketplace, no plugins.
          </p>
        </header>

        <IntegrationsGrid />
      </div>
    </div>
  );
}
