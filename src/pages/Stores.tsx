import { useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@/components/ui/button";

// ✅ Import AG Grid Modules
import { ColDef, ModuleRegistry, RowDragEndEvent } from "ag-grid-community";
import {
  ClientSideRowModelModule,
  ValidationModule,
  DateFilterModule,
  TextFilterModule,
  NumberFilterModule,
  TextEditorModule,
  RowDragModule,
} from "ag-grid-community";
// ✅ Register the required modules
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  DateFilterModule,
  TextFilterModule,
  NumberFilterModule,
  TextEditorModule,
  RowDragModule,
]);

const Stores = () => {
  const [rowData, setRowData] = useState([
    { id: 1, name: "Store A", location: "New York", manager: "John Doe" },
    { id: 2, name: "Store B", location: "Los Angeles", manager: "Jane Smith" },
    { id: 3, name: "Store C", location: "Chicago", manager: "Mark Brown" },
  ]);

  const [columnDefs] = useState<ColDef<{ id: number; name: string; location: string; manager: string; }>[]>([
    { headerName: "Store ID", field: "id", sortable: true, filter: true },
    { headerName: "Store Name", field: "name", editable: true, sortable: true },
    {
      headerName: "Location",
      field: "location",
      editable: true,
      sortable: true,
    },
    { headerName: "Manager", field: "manager", editable: true, sortable: true },
    {
      headerName: "Actions",
      cellRenderer: (params: { data: { id: number } }) => (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => handleDelete(params.data.id)}
        >
          Delete
        </Button>
      ),
    },
  ]);

  const handleDelete = useCallback((id: number) => {
    setRowData((prevData) => prevData.filter((store) => store.id !== id));
  }, []);

  const handleAddStore = () => {
    const newStore = {
      id: Date.now(),
      name: "New Store",
      location: "Unknown",
      manager: "N/A",
    };
    setRowData((prevData) => [...prevData, newStore]);
  };

  // Handle Row Dragging
  const onRowDragEnd = (event: RowDragEndEvent<{ id: number; name: string; location: string; manager: string }, void>) => {
    const movedRow = event.node.data;
    if (!movedRow) return;
    const newRowData = [...rowData];

    // Find and remove the dragged row
    const index = newRowData.findIndex((row) => row.id === movedRow.id);
    if (index !== -1) {
      newRowData.splice(index, 1);
    }

    // Insert it at the new position
    newRowData.splice(event.overIndex, 0, movedRow);

    setRowData(newRowData);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Stores Management</h2>
        <Button onClick={handleAddStore}>Add Store</Button>
      </div>
      <div className="ag-theme-alpine w-full h-[500px]">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowModelType="clientSide"
          domLayout="autoHeight"
          animateRows
          rowDragManaged
          onRowDragEnd={onRowDragEnd}
        />
      </div>
    </div>
  );
};

export default Stores;
