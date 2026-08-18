"use client";

import React, { useState } from "react";
import { 
  Hash, 
  Smile, 
  Paperclip, 
  MoreVertical,
  Activity,
  CheckCircle,
  AlertTriangle,
  Pin
} from "lucide-react";

export function SlackChatOps() {
  const [status, setStatus] = useState<"triggered" | "acknowledged" | "resolved">("triggered");
  const [notes, setNotes] = useState<string[]>([]);
  
  const handleAcknowledge = () => setStatus("acknowledged");
  const handleResolve = () => setStatus("resolved");
  const handleAddNote = () => {
    if (!notes.includes("Investigating database latency spike. Applied read-replica pool fix.")) {
      setNotes([...notes, "Investigating database latency spike. Applied read-replica pool fix."]);
    }
  };

  const getStatusBorder = () => {
    if (status === "triggered") return "bg-red-500";
    if (status === "acknowledged") return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <section className="py-24 bg-slate-950 text-slate-200 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-4">
            ChatOps & Incident War Rooms
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Command Center, directly in Slack.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Bi-directional incident sync, automatic war room provisioning, participant auto-invites, and emoji timeline pins.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl border border-white/10 bg-[#1a1d21] shadow-2xl overflow-hidden flex flex-col font-sans">
          
          {/* Slack Header */}
          <div className="h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#222529]">
            <div className="flex items-center gap-2 font-bold text-slate-100 text-sm">
              <Hash size={18} className="text-slate-400" />
              <span>warroom-inc-384-api-gateway</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <Activity size={18} className="text-emerald-400" />
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-[#222529] text-[10px] text-white flex items-center justify-center font-bold">DR</div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#222529] text-[10px] text-white flex items-center justify-center font-bold">SR</div>
                <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-[#222529] text-[10px] text-white flex items-center justify-center font-bold">OK</div>
              </div>
            </div>
          </div>

          {/* Slack Body */}
          <div className="flex-1 p-6 space-y-6 bg-[#1a1d21] min-h-[380px]">
            
            {/* Slash Command */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center font-bold text-white shrink-0 text-sm">
                DR
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-slate-200 text-sm">Dushyant Rahangdale</span>
                  <span className="text-xs text-slate-500">10:42 PM</span>
                </div>
                <div className="text-slate-300 text-sm mt-1">
                  <code className="text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded font-mono text-xs">/incident declare</code> High latency on payment API gateway
                </div>
              </div>
            </div>

            {/* OpsKnight Bot Message */}
            <div className="flex items-start gap-3 mt-4">
              <div className="w-9 h-9 rounded bg-red-600 flex items-center justify-center font-bold text-white shrink-0 text-sm">
                ⚔
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-slate-200 text-sm">OpsKnight</span>
                  <span className="text-[9px] bg-slate-700 text-slate-300 px-1 rounded uppercase font-bold tracking-wider">APP</span>
                  <span className="text-xs text-slate-500">10:42 PM</span>
                </div>
                
                {/* Incident Card */}
                <div className="mt-2 rounded-xl border border-white/10 bg-[#222529] overflow-hidden max-w-2xl shadow-lg">
                  <div className="flex">
                    <div className={`w-1.5 shrink-0 ${getStatusBorder()}`}></div>
                    <div className="p-4 flex-1 space-y-4">
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-white text-base">
                            [INC-384] High latency on payment API gateway
                          </h3>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
                            <span className="flex items-center gap-1 font-bold text-red-400">
                              <AlertTriangle size={13} className="text-red-400" /> SEV-1 CRITICAL
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              Status: <strong className="text-slate-200 uppercase">{status}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {status === "triggered" && (
                          <button 
                            onClick={handleAcknowledge}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition-colors"
                          >
                            Acknowledge Incident
                          </button>
                        )}
                        {status !== "resolved" && (
                          <button 
                            onClick={handleResolve}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-colors flex items-center gap-1"
                          >
                            <CheckCircle size={13} /> Resolve
                          </button>
                        )}
                        <button 
                          onClick={handleAddNote}
                          className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-colors flex items-center gap-1.5"
                        >
                          <Pin size={13} className="text-red-400" /> Pin Timeline Note 📌
                        </button>
                      </div>

                      {status === "resolved" && (
                        <div className="text-xs text-emerald-300 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                          <CheckCircle size={15} /> Incident resolved in 14m 23s. Auto-generated postmortem posted to Command Center.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            {notes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-3 mt-4">
                <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center font-bold text-white shrink-0 text-sm">
                  DR
                </div>
                <div className="flex-1 group">
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-slate-200 text-sm">Dushyant Rahangdale</span>
                    <span className="text-xs text-slate-500">10:45 PM</span>
                  </div>
                  <div className="text-slate-300 text-sm mt-1 flex items-start gap-2">
                    <Pin size={14} className="text-red-400 mt-1 shrink-0" />
                    <span className="bg-red-500/10 border border-red-500/20 text-red-300 px-2.5 py-1 rounded-md text-xs font-mono">
                      {note}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slack Input Area */}
          <div className="p-4 bg-[#1a1d21] border-t border-white/10">
            <div className="border border-white/10 rounded-xl bg-[#222529] p-2.5 flex flex-col">
              <div className="p-1 text-slate-400 text-xs">Message #warroom-inc-384-api-gateway</div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-slate-400">
                <div className="flex gap-2">
                  <Paperclip size={16} className="cursor-pointer hover:text-white" />
                  <Smile size={16} className="cursor-pointer hover:text-white" />
                </div>
                <div className="flex gap-2">
                  <MoreVertical size={16} className="cursor-pointer hover:text-white" />
                </div>
              </div>
            </div>
          </div>

        </div>
        
        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <h4 className="font-bold text-white mb-2">Bi-directional Sync</h4>
            <p className="text-sm text-slate-400">Everything in Slack syncs with the OpsKnight web Command Center in real time via SSE.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <h4 className="font-bold text-white mb-2">Auto War Room Provisioning</h4>
            <p className="text-sm text-slate-400">Dedicated `#warroom-inc-xxx` channels created and on-call responders invited instantly.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/50 border border-white/5">
            <h4 className="font-bold text-white mb-2">Emoji Pin Sync</h4>
            <p className="text-sm text-slate-400">React with 📌 to any message to instantly pin it to the official incident audit timeline.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
