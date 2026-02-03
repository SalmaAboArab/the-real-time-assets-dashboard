import React, { useEffect, useMemo, useState } from "react";
import { assetsTypes } from "./mock-assets";
import { Search } from "lucide-react";

export default function Controls({
  setAssets,
  assets = [],
}: {
  setAssets: (assets: Asset[]) => void;
  assets: Asset[];
}) {
  const [searchValue, setSearchValue] = useState("");
  const [SelectedType, setSelectedType] = useState("All");

  const getSearchNameValue = (input: { target: { value: string } }) => {
    setSearchValue(input.target.value.toLowerCase());
    getSearchValue(SelectedType, input.target.value.toLowerCase());
  };

  const getSearchValue = (type: string, name: string) => {
    let filteredData;
    if (type === "All") {
      filteredData = assets.filter(
        (asset) =>
          asset.symbol.toLowerCase().includes(name) ||
          asset.name.toLowerCase().includes(name),
      );
    } else {
      filteredData = assets.filter(
        (asset) =>
          asset.type === type &&
          (asset.symbol.toLowerCase().includes(name) ||
            asset.name.toLowerCase().includes(name)),
      );
    }

    setAssets(filteredData);
  };

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    let debounceTimer: NodeJS.Timeout | undefined;

    return function debouncedFunction(
      this: ThisParameterType<T>,
      ...args: Parameters<T>
    ) {
      const context = this;

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  }

  const debouncedFilter = useMemo(
    () => debounce((value: string) => getSearchValue(value, searchValue), 500),
    [searchValue],
  );

  useEffect(() => {
    if (assets.length > 0) {
      getSearchValue(SelectedType, searchValue);
    }
  }, [assets]);

  return (
    <div className="sticky top-0 z-40 bg-slate-900 w-full">
      {/* border-b border-slate-800/50 backdrop-blur-xl */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4">

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="search"
              id="search"
              className="max-w-md w-full pl-11 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all text-sm font-medium"
              placeholder="Search assets, symbols..."
              onChange={debounce(getSearchNameValue, 500)}
            />
          </div>

          <div className="flex gap-1.5 mx-2">
            {["All", ...assetsTypes].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  debouncedFilter(type);
                }}
                disabled={SelectedType === type}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  SelectedType === type
                    ? "bg-linear-to-r from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-500/30"
                    : "bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
