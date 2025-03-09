import Grid from "@/components/common/Grid";
import { RootState } from "@/store/store";
import { CellValueChangedEvent, ColDef, GridOptions } from "ag-grid-community";
import { useSelector } from "react-redux";

import { ValueGetterParams } from "ag-grid-community";

interface Params extends ValueGetterParams<{ [key: string]: number }, unknown> {
  value: number;
}

interface RowData {
  Store_ID: string;
  Store_Label: string;
  Store_City: string;
  Store_State: string;
  SKU_ID: string;
  SKU_Label: string;
  SKU_Class: string;
  SKU_Department: string;
  SKU_Price: string;
  SKU_Cost: string;
}

interface ColumnDef {
  headerName: string;
  field?: keyof RowData;
  pinned?: "left";
  children?: ColumnDef[];
  editable?: boolean;
  valueGetter?: (params: Params) => number;
  valueFormatter?: (params: Params) => string;
  cellStyle?: (params: Params) => { backgroundColor: string };
}

const Planning = () => {
  const store = useSelector(
    (centralStore: RootState) => centralStore.store.rows
  );

  const skus = useSelector((centralStore: RootState) => centralStore.sku.rows);

  const calendarWeeks = useSelector(
    (centralStore: RootState) => centralStore.calendar.rows
  );

  // Cross join stores and SKUs to create row data
  const rowData = store.flatMap((_store) =>
    skus.map((sku) => {
      const row: RowData & { [key: string]: string | number } = {
        // Store fields
        Store_ID: _store.ID,
        Store_Label: _store.Label,
        Store_City: _store.City,
        Store_State: _store.State,
        // SKU fields
        SKU_ID: sku.ID,
        SKU_Label: sku.Label,
        SKU_Class: sku.Class,
        SKU_Department: sku.Department,
        SKU_Price: sku.Price,
        SKU_Cost: sku.Cost,
      };
      // Initialize Sales Units for each week
      calendarWeeks.forEach((week) => {
        row[`${week.Week}_Sales_Units`] = 0;
      });
      return row as RowData;
    })
  );

  const monthGroups = calendarWeeks.reduce(
    (
      acc: { [key: string]: { label: string; weeks: typeof calendarWeeks } },
      week
    ) => {
      const monthKey = week.Month;
      if (!acc[monthKey]) {
        acc[monthKey] = {
          label: week["Month Label"],
          weeks: [],
        };
      }
      acc[monthKey].weeks.push(week);
      return acc;
    },
    {}
  );

  const columnDefs: ColumnDef[] = [
    // Store and SKU columns
    {
      headerName: "Store Label",
      field: "Store_Label",
      pinned: "left" as const,
    },
    { headerName: "SKU Label", field: "SKU_Label", pinned: "left" as const },
  ];

  Object.entries(monthGroups).forEach(([, month]) => {
    const children: {
      headerName: string;
      children: {
        headerName: string;
        field?: string;
        editable?: boolean;
        valueGetter?: (params: Params) => number;
        valueFormatter?: (params: Params) => string;
        cellStyle?: (params: Params) => { backgroundColor: string };
      }[];
    }[] = month.weeks.map((week) => ({
      headerName: week["Week Label"],
      children: [
        {
          headerName: "Sales Units",
          field: `${week.Week}_Sales_Units`,
          editable: true,
        },
        {
          headerName: "Sales $",
          valueGetter: (params) => {
            const units = params.data?.[`${week.Week}_Sales_Units`] || 0;
            console.log(units);
            return units * (params.data?.SKU_Price ?? 0);
          },
          valueFormatter: (params) => `$${params.value.toFixed(2)}`,
        },
        {
          headerName: "GM $",
          valueGetter: (params) => {
            const units = params.data?.[`${week.Week}_Sales_Units`] || 0;
            return (
              units * (params.data?.SKU_Price ?? 0) -
              units * (params?.data?.SKU_Cost ?? 0)
            );
          },
          valueFormatter: (params) => `$${params.value.toFixed(2)}`,
        },
        {
          headerName: "GM%",
          valueGetter: (params) => {
            const units = params.data?.[`${week.Week}_Sales_Units`] || 0;
            const sales = units * (params.data?.SKU_Price ?? 0);

            if (sales === 0) return 0;
            const gm = sales - units * (params.data?.SKU_Cost ?? 0);
            console.log(
              gm,
              sales,
              units,
              params.data?.SKU_Cost,
              "skucost"
            );
            return gm / sales;
          },
          valueFormatter: (params) => `${(params.value * 100).toFixed(1)}%`,
          cellStyle: (params) => {
            const value = params.value;
            if (value >= 0.4) return { backgroundColor: "#90EE90" };
            if (value >= 0.1) return { backgroundColor: "#FFFFE0" };
            if (value > 0.05) return { backgroundColor: "#FFA500" };
            return { backgroundColor: "#FF0000" };
          },
        },
      ],
    }));

    columnDefs.push({
      headerName: month.label,
      children: children as ColumnDef[],
    });
  });

  const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    onCellValueChanged: (event: CellValueChangedEvent) => {
      if (event.colDef.field && event.colDef.field.endsWith("_Sales_Units")) {
        const week = event.colDef.field.split("_")[0];
        const rowNode = event.node;
        const api = event.api;

        // Refresh dependent columns
        const columnsToUpdate = ["Sales $", "GM $", "GM%"].map(
          (col) => `${week}_${col.replace(" ", "")}`
        );
        api.refreshCells({
          rowNodes: [rowNode],
          columns: columnsToUpdate,
        });
      }
    },
  };
  console.log(columnDefs);
  return (
    <>
      <Grid<RowData>
        rows={rowData}
        columns={columnDefs as ColDef[]}
        gridOptions={gridOptions as GridOptions}
        className="h-[600px]"
      />
    </>
  );
};

export default Planning;
