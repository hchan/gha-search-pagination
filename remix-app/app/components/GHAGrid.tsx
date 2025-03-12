import React from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// React Data Grid Component
import { ColDef, ICellRendererParams } from "ag-grid-community";

import { AgGridReact } from "ag-grid-react";
import { Workflow } from "~/data/Workflow"; // ✅ Import Workflow type
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface GHAGridProps {
  workflows: Workflow[]; // Prop to receive workflows array
}

export const GHAGrid: React.FC<GHAGridProps> = ({ workflows }) => {
  const colDefs: ColDef<Workflow>[] = [
    {
      field: "filename",
      headerName: "Filename",
      flex: 5,
      filter: true, // Enable filtering for this column,
      cellRenderer: (params: ICellRendererParams<Workflow>) => {
        const baseUrl = "https://github.com/hchan/gha-search-pagination";
        return (
          <div className="flex items-center space-x-2">
            <span>{params.value}</span>
            <a
              href={`${baseUrl}/blob/main/.github/workflows/${params.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Source
            </a>
            <a
              href={`${baseUrl}/actions/workflows/${params.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Runs
            </a>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 3,
      filter: true, // Enable filtering for this column
    },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      filter: true, // Enable filtering for this column
    },
    {
      field: "pin",
      headerName: "Favorite",
      cellRenderer: (params: ICellRendererParams<Workflow>) => {
        return params.value ? "⭐" : "☆";
      },
      flex: 1,
    },
  ];

  return (
    <div className="ag-theme-alpine pb-5">
      <AgGridReact
        rowData={workflows}
        columnDefs={colDefs}
        domLayout="autoHeight" // Adjusts height based on content
        pagination={true} // Optional: Enable pagination for large datasets
        enableCellTextSelection={true} // Optional: Enable text selection in cells
        paginationPageSize={20}
      />
    </div>
  );
};
