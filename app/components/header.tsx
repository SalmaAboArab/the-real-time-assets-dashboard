import React, { useEffect, useState } from "react";
import { formatChangePercent, formatPrice } from "../utils/format";
import { Clock, TrendingDown, TrendingUp } from "lucide-react";

export default function Header({totalChangePercent, gainers, losers, totalValue}: {totalChangePercent: number; gainers: number; losers: number; totalValue: number}) {
  // const [lastUpdated, setLastUpdated] = useState<string>("just now");
  // useEffect(() => {
  //     const now = new Date();
  //     setLastUpdated(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  // }, [totalChangePercent, gainers, losers, totalValue]);

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
              <Clock className="w-5 h-5" />
              Real-time market data • Last updated: just now
              {/* {lastUpdated} */}
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
                <p className="text-2xl font-black text-white tabular-nums">{formatPrice(totalValue)}</p>
                <p className={`text-sm font-bold tabular-nums mt-1 flex items-center gap-1 ${
                  totalChangePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {totalChangePercent >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {formatChangePercent(totalChangePercent)}
                </p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-500/30 bg-linear-to-br from-emerald-900/20 to-slate-900/50 backdrop-blur-sm">
              <p className="text-xs text-emerald-300 uppercase tracking-wider mb-1 font-semibold">
                Gainers
              </p>
              <p className="text-2xl font-black text-emerald-400 tabular-nums">
                {gainers}
              </p>
              <p className="text-xs text-emerald-400/60 mt-1">
                Assets up today
              </p>
            </div>

            <div className=" p-4 rounded-xl border border-rose-500/30 bg-linear-to-br from-rose-900/20 to-slate-900/50 backdrop-blur-sm">
              <p className="text-xs text-rose-300 uppercase tracking-wider mb-1 font-semibold">Losers</p>
              <p className="text-2xl font-black text-rose-400 tabular-nums">{losers}</p>
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
