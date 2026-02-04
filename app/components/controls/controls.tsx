import React, { useCallback, useEffect, useMemo, useState } from "react";
import { assetsTypes } from "../mock-assets";
import ViewToggleButton from "./view-toggle-button";
import SortSelectField from "./sort-select-field";
import SearchAndFilter from "./search-and-filter";

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

  const handleSortChange = (key: SortKey, order: SortOrder) => {
    setSortKey(key);
    setSortOrder(order);

    const sorted = sortAssetsBy(assets, key, order);
    setAssets(sorted);
  };

  useEffect(() => {
    if (assets.length) {
      applyFilterAndSort(selectedType, searchValue);
    }
  }, [sortKey, sortOrder]);


  return (
    <div className="sticky top-0 z-40 bg-slate-900 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:items-center sm:justify-center">
          {/* Search and Filter */}
          <SearchAndFilter applyFilterAndSort={applyFilterAndSort} assetsTypes={assetsTypes} debounce={debounce} debouncedSearch={debouncedSearch} searchValue={searchValue} selectedType={selectedType} setSelectedType={setSelectedType}/>

          {/* Sort */}
          <SortSelectField debounce={debounce} handleSortChange={handleSortChange} sortKey={sortKey} sortOrder={sortOrder} />

          {/* View Toggle */}
          <ViewToggleButton setIsGridView={setIsGridView} isGridView={isGridView} />
        </div>
      </div>
    </div>
  );
}
