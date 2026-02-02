import React from "react";

export default function Header() {
  return (
    <header className="relative border-b border-slate-800/50 backdrop-blur-xl bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Title*/}
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2 tracking-tight">
              Portfolio Command
            </h1>
            <p className="text-sm text-slate-400 font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
              </svg>
              Real-time market data • Last updated: just now
                  {/* <span className="font-normal">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span> */}
            </p>
          </div>

          {/* States Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-semibold">
                Total Value
              </p>
              <p className="text-2xl font-black text-white tabular-nums">$41.950.41</p>
              <p className="text-sm font-bold tabular-nums mt-1 flex items-center gap-1 text-emerald-400
                ">16%</p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-linear-to-br from-emerald-900/20 to-slate-900/50 backdrop-blur-sm">
              <p className="text-xs text-emerald-300 uppercase tracking-wider mb-1 font-semibold">
                Gainers
              </p>
              <p className="text-2xl font-black text-emerald-400 tabular-nums">
                9
              </p>
              <p className="text-xs text-emerald-400/60 mt-1">
                Assets up today
              </p>
            </div>

            <div className=" p-4 rounded-xl border border-rose-500/30 bg-linear-to-br from-rose-900/20 to-slate-900/50 backdrop-blur-sm">
              <p className="text-xs text-rose-300 uppercase tracking-wider mb-1 font-semibold">Losers</p>
              <p className="text-2xl font-black text-rose-400 tabular-nums">3</p>
              <p className="text-xs text-rose-400/60 mt-1">
                Assets down today
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
