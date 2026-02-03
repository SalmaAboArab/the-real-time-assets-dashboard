"use client";

import React, { useState } from "react";
import Header from "./header";
import AssetsCard from "./assets-card";
import { assets } from "./mock-assets";
import AssetsTable from "./assets-table";

export default function DashboardPreview() {
  const [isCardPreview, setIsCardPreview] = useState(true);
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
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg mb-4" onClick={() => setIsCardPreview(!isCardPreview)}>
          Toggle View
        </button>
        {isCardPreview ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {assets.map((card) => (
            <AssetsCard key={card.id} card={card} />
          ))}
        </div>
        ) : (
          <AssetsTable assets={assets}/>
        )}
      </main>
    </div>
  );
}
