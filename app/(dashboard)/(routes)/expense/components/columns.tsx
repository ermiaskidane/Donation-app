"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./cell-action";

// export type MembersColumn = {
//   id: string;
//   name: string;
//   phone: string;
//   email: string;
//   amount: number;
//   updatedAt: string;
//   donations: {
//     id: string;
//     dtime: string;
//     amount: number;
//     memberId: string;
//     createdAt: Date;
//     updatedAt: Date;
//   }[]
// }


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "paymentMethod",
    header: "PaymentMethod",
  },
  // {
  //   accessorKey: "expense",
  //   header: "Expense"
  // },
  {
    accessorKey: "paymentStatus",
    header: "PaymentStatus",
  },
  {
    accessorKey: "totalAmount",
    header: "TotalAmount",
  },
  {
    //implement id in your data later at the moment invoices daoes not have id 
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  }
]
