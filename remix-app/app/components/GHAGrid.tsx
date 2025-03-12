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
    { field: "filename", headerName: "Filename", flex: 3 },  // 30% of total width
    { field: "name", headerName: "Name", flex: 3 },  // 30% of total width
    { field: "description", headerName: "Description", flex: 3 },  // 30% of total width
    {
      field: "pin",
      headerName: "Favorite",
      cellRenderer: (params: ICellRendererParams<Workflow>) => {
        return params.value ? "⭐" : "☆";
      },
      flex: 1,  // 10% of total width
    },
  ];

  return (
    // set a height on the parent div because the grid fills the available space
    <div className="ag-theme-alpine" style={{ height: "100%", width: "100%" }}>
      <AgGridReact rowData={workflows} columnDefs={colDefs} />
    </div>
  );
};
