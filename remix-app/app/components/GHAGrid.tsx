"use client";
import React from "react";
import { useState, useEffect } from "react";
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
    { field: "filename", headerName: "Filename" },
    { field: "name", headerName: "Name" },
    { field: "description", headerName: "Description" },
    {
      field: "pin",
      headerName: "Favorite",
      cellRenderer: (params: ICellRendererParams<Workflow>) => {
        // Explicitly type the 'params' as ICellRendererParams with Workflow
        return params.value ? "⭐" : "☆"; // Render '⭐' or '☆' based on the boolean value
      },
    },
  ];
  return (
    // set a height on the parent div because the grid fills the available space
    <div className="h-screen w-full ag-theme-alpine">
      <AgGridReact rowData={workflows} columnDefs={colDefs} />
    </div>
  );
};
