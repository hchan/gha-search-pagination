import React, { useEffect, useState, useCallback } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { ColDef, ICellRendererParams, ColumnState, GridReadyEvent } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Workflow } from "~/data/Workflow"; // ✅ Import Workflow type

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface GHAGridProps {
  workflows: Workflow[]; // Prop to receive workflows array
}

export const GHAGrid: React.FC<GHAGridProps> = ({ workflows }) => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (filename: string) => {
    const updatedFavorites = { ...favorites, [filename]: !favorites[filename] };
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Save to localStorage
  };

  const rowDataGetter = (params: any) => {
    return params.data;
  };

  const onGridReady = useCallback((params: GridReadyEvent) => {

    const defaultSortModel: ColumnState[] = [
      { colId: "pin", sort: "asc", sortIndex: 1 },
    ];
    params.api.applyColumnState({ state: defaultSortModel });
  }, []);

  const colDefs: ColDef<Workflow>[] = [
    {
      field: "filename",
      headerName: "Filename",
      flex: 5,
      filter: true, // Enable filtering for this column
      sort: "asc",
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
      valueGetter: rowDataGetter,
      sortable: true,
      cellRenderer: (params: ICellRendererParams<Workflow>) => {
        // Safely access filename using optional chaining
        const filename = params.data?.filename; // This prevents the error by checking if params.data is defined
        if (!filename) return null; // If filename is not available, return null (or any fallback)

        const isPinned = favorites[filename] || false; // Default to false if not pinned
        return (
          <span
            onClick={() => toggleFavorite(filename)} // Use the correct filename
            style={{ cursor: "pointer" }}
          >
            {isPinned ? "⭐" : "☆"}{" "}
            {/* Display filled star if pinned, empty otherwise */}
          </span>
        );
      },
      flex: 1,
      comparator: (a, b, nodeA, nodeB, isInverted) => {
        // Ensure that nodeA.data and nodeB.data are defined
        const dataA = nodeA.data ?? { filename: "" };
        const dataB = nodeB.data ?? { filename: "" };

        // Compare favorite status (starred) first
        const favoriteA = favorites[dataA.filename] ? 1 : 0;
        const favoriteB = favorites[dataB.filename] ? 1 : 0;

        if (favoriteA !== favoriteB) {
          return favoriteB - favoriteA; // Sort starred items (1) on top
        }

        // If favorites are the same, sort by filename
        const filenameA = dataA.filename.toLowerCase();
        const filenameB = dataB.filename.toLowerCase();

        if (filenameA < filenameB) {
          return isInverted ? 1 : -1;
        }
        if (filenameA > filenameB) {
          return isInverted ? -1 : 1;
        }
        return 0;
      },
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
        onGridReady={onGridReady}
      />
    </div>
  );
};
