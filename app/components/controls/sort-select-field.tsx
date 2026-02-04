import React from "react";
import { Tooltip } from "../../utils/tooltip";
import { ArrowUp } from "lucide-react";

export default function SortSelectField({
  sortKey,
  sortOrder,
  handleSortChange,
  debounce,
}: {
  sortKey: SortKey;
  sortOrder: SortOrder;
  handleSortChange: (
    key: SortKey,
    order: SortOrder,
  ) => void;
  debounce: (func: () => void, delay: number) => () => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-slate-400 text-sm">Sort by:</span>

      <select
        value={sortKey}
        onChange={(e) => handleSortChange(e.target.value as SortKey, sortOrder)}
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
                handleSortChange(sortKey, sortOrder === "asc" ? "desc" : "asc"),
              300,
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
  );
}
