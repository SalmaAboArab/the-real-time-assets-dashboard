import { Bell, Star, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";
import {
  formatChange,
  formatChangePercent,
  formatPrice,
} from "../utils/format";

export default function AssetsTable({
  assets,
  flashingIds,
}: {
  assets: Asset[];
  flashingIds: Set<number>;
}) {
  return (
    <div className="bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-linear-to-r from-slate-800/50 to-slate-900/50 border-b border-slate-700/50">
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Asset
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Type
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Price
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  24h Change
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Volume
                </span>
              </th>
              <th className="px-6 py-4 text-right">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Market Cap
                </span>
              </th>
              <th className="px-6 py-4 text-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset, index) => {
              const isGain = asset.change >= 0;
              const isFlashing = flashingIds.has(asset.id);
              return (
                <tr
                  key={asset.id}
                  className={`border-b border-slate-800/30 hover:bg-slate-800/30 cursor-pointer transition-all duration-300 ${
                    isFlashing
                      ? "bg-cyan-500/10 shadow-lg shadow-cyan-500/20"
                      : ""
                  } ${index % 2 === 0 ? "bg-slate-900/20" : ""}`}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-base font-bold text-white">
                        {asset.symbol}
                      </div>
                      <div className="text-xs text-slate-400">{asset.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 text-xs font-bold rounded-full inline-block ${
                        asset.type === "Stock"
                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          : asset.type === "Crypto"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : asset.type === "ETF"
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : asset.type === "Bond"
                                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      }`}
                    >
                      {asset.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-white tabular-nums">
                      {formatPrice(asset.price)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`flex items-center gap-1.5 text-sm font-bold tabular-nums ${
                          isGain ? "text-emerald-400" : "text-rose-400"
                        }`}
                      >
                        {isGain ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        {formatChangePercent(asset.changePercent)}
                      </span>
                      <span
                        className={`text-xs font-medium tabular-nums ${
                          isGain ? "text-emerald-400/70" : "text-rose-400/70"
                        }`}
                      >
                        {formatChange(asset.change)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-slate-300 tabular-nums font-medium">
                      {asset.volume}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-slate-300 tabular-nums font-medium">
                      {asset.marketCap || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Alert set for ${asset.symbol}`);
                        }}
                        className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        <Bell className="w-4 h-4 text-slate-400 hover:text-cyan-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
