"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";

export type ExpenseColumn = {
  id: string;
  year: number;
  expenses: {
    id: string;
    description: string;
    amount: number;
    paymentStatus: string;
    yearId: string;
  }[]
}


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "paymentStatus",
    header: "PaymentStatus",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
