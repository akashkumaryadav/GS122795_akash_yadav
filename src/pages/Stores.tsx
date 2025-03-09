import { Button } from "@/components/ui/button";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useMemo } from "react";

// ✅ Import AG Grid Modules
import useSheetData from "@/hooks/useSheetData";
import { RootState } from "@/store/store";
import { initStore, Store } from "@/store/storeSlice";
import {
  ClientSideRowModelModule,
  ColDef,
  DateFilterModule,
  ModuleRegistry,
  NumberFilterModule,
  RowDragModule,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
interface ExtendedColDef<TData = unknown> extends ColDef<TData> {
  rowDrag?: boolean;
}
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
  const dispatch = useDispatch();
  const store = useSelector((centralStore: RootState) => centralStore.store);
  const sheet = useSheetData<Store>({
    sheetName: "stores",
    fetch: Boolean(store.rows.length),
  });

  const columns = useMemo<ExtendedColDef<Store>[]>(() => {
    const _col = store.columns.map((column) => ({
      headerName: column,
      field: column as keyof Store,
      sortable: false,
      pinned: column === "City" || column === "State" ? "right" : undefined,
    })) as ExtendedColDef<Store>[];
    _col.unshift({
      headerName: "☰",
      field: "drag" as keyof Store,
      rowDrag: true,
      width: 50,
    });
    return _col;
  }, [store.columns]);

  useEffect(() => {
    if (sheet.data) {
      dispatch(initStore({ rows: sheet.data, columns: sheet?.headers || [] }));
    }
  }, [sheet, dispatch]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Stores Management</h2>
        <Button onClick={() => {}}>Add Store</Button>
      </div>
      <div className="ag-theme-alpine w-full h-[500px]">
        <AgGridReact
          rowData={store.rows}
          columnDefs={columns}
          rowModelType="clientSide"
          domLayout="normal"
          animateRows
          rowDragManaged
        />
      </div>
    </div>
  );
};

export default Stores;
