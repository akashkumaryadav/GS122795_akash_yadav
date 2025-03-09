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
  const sheet = useSheetData({
    sheetName: "stores",
    fetch: Boolean(store.rows.length),
  });

  const columns = useMemo<ColDef<Store>[]>(() => {
    return store.columns.map((column) => ({
      headerName: column,
      field: column as keyof Store,
      sortable: false,
    }));
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
          domLayout="autoHeight"
          animateRows
        />
      </div>
    </div>
  );
};

export default Stores;
