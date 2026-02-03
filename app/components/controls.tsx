import React, { useCallback, useEffect, useMemo, useState } from "react";
import { assetsTypes } from "./mock-assets";
import { ArrowUp, Grid2x2, Search, TableOfContents } from "lucide-react";
import { Tooltip } from "../utils/tooltip";

type SortKey = "name" | "price" | "change" | "volume";
type SortOrder = "asc" | "desc";

export default function Controls({
  setAssets,
  assets = [],
  isGridView,
  setIsGridView,
}: {
  setAssets: (assets: Asset[]) => void;
  assets: Asset[];
  isGridView: boolean;
  setIsGridView: (value: boolean) => void;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const parseVolume = (v: string) => {
    const num = Number(v.replace(/[^\d.]/g, ""));
    if (v.includes("B")) return num * 1_000;
    if (v.includes("M")) return num;
    return num / 1_000;
  };

  const sortValueGetters: Record<SortKey, (a: Asset) => string | number> = {
    name: (a) => a.name.toLowerCase(),
    price: (a) => a.price,
    change: (a) => a.changePercent,
    volume: (a) => parseVolume(a.volume),
  };

  const sortAssetsBy = useCallback(
    (list: Asset[], key: SortKey, order: SortOrder) => {
      const getValue = sortValueGetters[key];

      return [...list].sort((a, b) => {
        const aVal = getValue(a);
        const bVal = getValue(b);

        if (typeof aVal === "string") {
          return order === "asc"
            ? aVal.localeCompare(bVal as string)
            : (bVal as string).localeCompare(aVal);
        }

        return order === "asc"
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      });
    },
    [],
  );

  const applyFilterAndSort = useCallback(
    (type: string, search: string) => {
      const filtered = assets.filter((asset) => {
        const matchesSearch =
          asset.name.toLowerCase().includes(search) ||
          asset.symbol.toLowerCase().includes(search);

        return type === "All"
          ? matchesSearch
          : asset.type === type && matchesSearch;
      });

      const sorted = sortAssetsBy(filtered, sortKey, sortOrder);
      setAssets(sorted);
    },
    [assets, sortAssetsBy, sortKey, sortOrder, setAssets],
  );

  function debounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number,
  ): (...args: Parameters<T>) => void {
    let timer: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value);
        applyFilterAndSort(selectedType, value);
      }, 500),
    [applyFilterAndSort, selectedType],
  );

  useEffect(() => {
    if (assets.length) {
      applyFilterAndSort(selectedType, searchValue);
    }
  }, [sortKey, sortOrder]);

  const handleSortChange = (key: SortKey, order: SortOrder) => {
    setSortKey(key);
    setSortOrder(order);

    const sorted = sortAssetsBy(assets, key, order);
    setAssets(sorted);
  };

  return (
    <div className="sticky top-0 z-40 bg-slate-900 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:items-center sm:justify-center">
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

          {/* Sort */}
          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-sm">Sort by:</span>

            <select
              value={sortKey}
              onChange={(e) =>
                handleSortChange(e.target.value as SortKey, sortOrder)
              }
              className="bg-slate-800/60 border border-slate-700/50 text-slate-200 text-sm rounded-lg px-2 py-2 h-9"
            >
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="change">Change</option>
              <option value="volume">Volume</option>
            </select>

            <Tooltip text={sortOrder === "asc" ? "Descending" : "Ascending"}>
              <button
                onClick={() =>
                  debounce(
                    () =>
                      handleSortChange(
                        sortKey,
                        sortOrder === "asc" ? "desc" : "asc",
                      ),
                    200,
                  )()
                }
                className="flex items-center justify-center w-7 h-7 rounded-full border border-white text-white bg-slate-800/60 hover:bg-slate-700/70 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                <ArrowUp
                  className={`w-4 h-4 transform transition-transform duration-300 ${sortOrder === "asc" ? "rotate-0" : "rotate-180"}`}
                />{" "}
              </button>{" "}
            </Tooltip>
          </div>

          {/* View Toggle */}
          <div className="flex lg:justify-end">
            <div className="inline-flex bg-slate-800 p-1 rounded-xl gap-1">
              <Tooltip text="Grid View">
              <button
                onClick={() => setIsGridView(true)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
        ${
          isGridView
            ? "bg-linear-to-r from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-500/30"
            : "text-slate-300 hover:text-white hover:bg-slate-700"
        }`}
              >
                <Grid2x2 className="w-5 h-5 mx-auto" />
              </button>
              </Tooltip>

              <Tooltip text="Table View">
              <button
                onClick={() => setIsGridView(false)}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
        ${
          !isGridView
            ? "bg-linear-to-r from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-500/30"
            : "text-slate-300 hover:text-white hover:bg-slate-700"
        }`}
              >
                <TableOfContents className="w-5 h-5 mx-auto" />
              </button>
              </Tooltip>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
