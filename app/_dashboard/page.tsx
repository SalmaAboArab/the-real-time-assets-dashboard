"use client";

import React, { useEffect, useState } from "react";
import Header from "../components/header";
import AssetsCard from "../components/assets-card";
import { generateMockAssets } from "../components/mock-assets";
import AssetsTable from "../components/assets-table";
import Controls from "../components/controls";
import { Search } from "lucide-react";

export default function DashboardPreview() {
  const [isCardPreview, setIsCardPreview] = useState(true);
  const [Assets, setAssets] = useState<Asset[]>([]);
  const [FilteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [flashingIds, setFlashingIds] = useState<Set<number>>(new Set());

  // ✅ generate mock data only on client
  useEffect(() => {
    const initial = generateMockAssets();
    setAssets(initial);
    setFilteredAssets(initial);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) => {
        const updatedAssets = prevAssets.map((asset) => {
          if (Math.random() > 0.6) {
            const changePercent = (Math.random() - 0.5) * 2;
            const changeAmount = asset.basePrice * (changePercent / 100);
            const newPrice = asset.price + changeAmount;
            const newChange = newPrice - asset.basePrice;
            const newChangePercent = (newChange / asset.basePrice) * 100;

            setFlashingIds((prev) => new Set(prev).add(asset.id));
            setTimeout(() => {
              setFlashingIds((prev) => {
                const next = new Set(prev);
                next.delete(asset.id);
                return next;
              });
            }, 600);

            return {
              ...asset,
              price: newPrice,
              change: newChange,
              changePercent: newChangePercent,
              dayHigh: Math.max(asset.dayHigh, newPrice),
              dayLow: Math.min(asset.dayLow, newPrice),
            };
          }
          return asset;
        });
        return updatedAssets;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <Header />
      <Controls setAssets={setFilteredAssets} assets={Assets} />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <button
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg mb-4"
          onClick={() => setIsCardPreview(!isCardPreview)}
        >
          Toggle View
        </button>
        {FilteredAssets.length === 0 && (
          <div className="text-center py-20 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-2xl">
            <div className="text-slate-400 mb-2">
              <Search className="w-12 h-12 mx-auto opacity-50" />
            </div>
            <p className="text-lg font-bold text-slate-300">No assets found</p>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your filters or search query</p>
          </div>
        )}
        {isCardPreview ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {FilteredAssets.map((card) => {
              const isGain = card.change >= 0;
              const isFlashing = flashingIds.has(card.id);

              return (
                <AssetsCard
                  key={card.id}
                  card={card}
                  isGain={isGain}
                  isFlashing={isFlashing}
                />
              );
            })}
          </div>
        ) : (
          <AssetsTable assets={FilteredAssets} flashingIds={flashingIds} />
        )}
      </main>
    </div>
  );
}