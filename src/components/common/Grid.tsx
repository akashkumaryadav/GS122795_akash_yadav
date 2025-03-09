import { AgGridReact } from "ag-grid-react";

// ✅ Import AG Grid Modules
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
  NumberEditorModule,
  CellStyleModule,
  GridOptions,
  RenderApiModule,
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
  NumberEditorModule,
  CellStyleModule,
  RenderApiModule,
]);

const Grid = <T,>({
  rows,
  columns,
  gridOptions,
  className,
}: {
  rows: T[];
  columns: ColDef<T>[];
  gridOptions?: GridOptions;
  className?: string;
}) => {
  return (
    <div className={`ag-theme-alpine w-full h-[500px] ${className}`}>
      <AgGridReact
        gridOptions={gridOptions}
        rowData={rows}
        columnDefs={columns}
        rowModelType="clientSide"
        domLayout="normal"
        animateRows
        rowDragManaged
      />
    </div>
  );
};

export default Grid;
