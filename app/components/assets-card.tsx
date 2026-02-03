import React from "react";
import {
  formatChange,
  formatChangePercent,
  formatPrice,
} from "../utils/format";
import { TrendingDown, TrendingUp } from "lucide-react";

export default function AssetsCard({
  card,
  isGain,
  isFlashing,
}: {
  card: Asset;
  isGain: boolean;
  isFlashing: boolean;
}) {
  return (
    <div
      // className={`border border-slate-700/50 rounded-xl p-4 bg-linear-to-br from-slate-900 to-slate-800 backdrop-blur-sm hover:scale-105 transition-transform duration-200 ${isFlashing ? 'animate-pulse' : ''}`}
      className={`bg-linear-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-5 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20 ${
        isFlashing ? "ring-2 ring-cyan-400 shadow-lg shadow-cyan-400/50" : ""
      }`}
    >
      <div className="flex justify-between">
        <p className="text-white uppercase text-md font-bold tracking-wider">
          {card?.symbol}
        </p>
        <span
          className={`px-2.5 py-1 text-xs font-bold rounded-full ${
            card.type === "Stock"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              : card.type === "Crypto"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : card.type === "ETF"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                  : card.type === "Bond"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
          }`}
        >
          {card.type}
        </span>
      </div>

      <p className="text-xs text-gray-400 mt-0.5 mb-3 tabular-nums">
        {card?.name}
      </p>

      <p className="text-2xl text-white font-extrabold tabular-nums">
        {formatPrice(card.price)}
      </p>

      <div className="flex items-center gap-2">
        <span
          className={`flex items-center gap-1 text-sm font-bold tabular-nums ${
            isGain ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {isGain ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {formatChangePercent(card.changePercent)}
        </span>
        <span
          className={`text-sm font-medium tabular-nums ${
            isGain ? "text-emerald-400/80" : "text-rose-400/80"
          }`}
        >
          {formatChange(card.change)}
        </span>
      </div>

      <div className="w-full h-px bg-gray-700 my-3"></div>

      <div className="grid grid-cols-2 gap-4 text-sm ">
        <div>
          <p className="font-semibold text-gray-400">Volume</p>
          <p className="tabular-nums text-gray-200">{card?.volume}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-400">Market Cap</p>
          <p className="tabular-nums text-gray-200">
            {card?.marketCap || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
