import { Search } from "lucide-react";
import React from "react";

type Props = {
  debouncedSearch: (value: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  assetsTypes: string[];
  applyFilterAndSort: (type: string, searchValue: string) => void;
  debounce: (func: () => void, delay: number) => () => void;
  searchValue: string;
};

export default function SearchAndFilter({
  debouncedSearch,
  selectedType,
  setSelectedType,
  assetsTypes,
  applyFilterAndSort,
  debounce,
  searchValue,
}: Props) {
  return (
    <>
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          className="max-w-md w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          placeholder="Search assets, symbols..."
          onChange={(e) => debouncedSearch(e.target.value.toLowerCase())}
        />
      </div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2">
        {["All", ...assetsTypes].map((type) => (
          <button
            key={type}
            onClick={() => {
              setSelectedType(type);
              debounce(() => {
                applyFilterAndSort(type, searchValue);
              }, 300)();
            }}
            disabled={selectedType === type}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
              selectedType === type
                ? "bg-linear-to-r from-cyan-600 to-blue-700 text-white"
                : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </>
  );
}
