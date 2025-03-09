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
  const store = useSelector((centralStore: RootState) => centralStore.store);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Stores Management</h2>
        <Button onClick={() => {}}>Add Store</Button>
      </div>
      <div className="ag-theme-alpine w-full h-[500px]">
        <Grid rows={store.rows} columns={columns} />
      </div>
    </div>
  );
};

export default Stores;
