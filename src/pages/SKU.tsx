import { Button } from "@/components/ui/button";
import { useMemo } from "react";

// ✅ Import AG Grid Modules
import Grid from "@/components/common/Grid";
import { RootState } from "@/store/store";
import { Store } from "@/store/storeSlice";
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
import { useSelector } from "react-redux";
import { Sku } from "@/store/skuSlice";
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
  const store = useSelector((centralStore: RootState) => centralStore.sku);

  const columns = useMemo<ExtendedColDef<Sku>[]>(() => {
    const _col = store.columns
      .filter((column) => ["Label", "Price", "Cost"].includes(column))
      .map((column) => ({
        headerName: column === "Label" ? "Skus" : column,
        field: column as keyof Store,
        sortable: true,
      })) as ExtendedColDef<Sku>[];
    _col.unshift({
      headerName: "☰",
      field: "drag" as keyof Sku,
      rowDrag: true,
      width: 50,
    });
    return _col;
  }, [store.columns]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Skus Management</h2>
        <Button onClick={() => {}}>Add Skus</Button>
      </div>
      <div className="ag-theme-alpine w-full h-[500px]">
        <Grid rows={store.rows} columns={columns} />
      </div>
    </div>
  );
};

export default Stores;
