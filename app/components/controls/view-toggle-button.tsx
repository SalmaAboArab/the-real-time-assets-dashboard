import React from "react";
import { Tooltip } from "../../utils/tooltip";
import { Grid2x2, TableOfContents } from "lucide-react";

export default function ViewToggleButton({ setIsGridView, isGridView } : { setIsGridView: (value: boolean) => void; isGridView: boolean}) {
  return (
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
  );
}
