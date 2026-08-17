'use client'

import { useState } from 'react'
import { BRAND } from '@/lib/brand'

const tabs = [
  { id: 'compose', label: 'Docker Compose' },
  { id: 'run', label: 'Docker Run' },
  { id: 'helm', label: 'Helm' }
]

const codeSnippets = {
  compose: `$ git clone ${BRAND.links.github}
$ cd OpsKnight && docker compose up -d`,
  run: `$ docker run -d -p 3000:3000 ghcr.io/opsknight-labs/opsknight:latest`,
  helm: `$ helm repo add opsknight https://opsknight-labs.github.io/helm-charts
$ helm install opsknight opsknight/opsknight`
}

export function DeveloperExperience() {
  const [activeTab, setActiveTab] = useState('compose')

  return (
    <section className="bg-slate-950 py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Two commands to production.
          </h2>
          <p className="text-lg text-slate-400">
            Clone, compose, done. Full incident management running in your infrastructure.
          </p>
        </div>
        
        <div className="flex-1 w-full">
          <div className="rounded-xl bg-slate-900 border border-white/5 overflow-hidden shadow-2xl">
            <div className="flex items-center px-4 pt-3 pb-0 border-b border-white/5">
              <div className="flex gap-2 mr-6 pb-3">
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
              </div>
              <div className="flex gap-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'border-white text-white'
                        : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="font-mono text-sm text-slate-300 whitespace-pre-wrap break-all md:break-normal">
                <code>{codeSnippets[activeTab as keyof typeof codeSnippets]}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
