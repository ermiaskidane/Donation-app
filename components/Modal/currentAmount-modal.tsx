"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { YearlyExpenseSum } from "@/app/(dashboard)/(routes)/expense/components/client";

// const invoices = [
//   {
//     // expense: "INV002",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     description: "Credit Card PayPal PayPal PayPal",
//   },
//   {
//     // description: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     description: "PayPal",
//   },
//   {
//     // description: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     description: "Bank Transfer",
//   },
//   {
//     // description: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     description: "Credit Card",
//   },
//   {
//     // description: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     description: "PayPal",
//   },
//   {
//     // description: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     description: "Bank Transfer",
//   },
//   {
//     // description: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     description: "Credit Card",
//   },
// ]

interface CurrentAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  TotalExpense: any[];
  loading: boolean;
}


export const CurrentAmountModal: React.FC<CurrentAmountModalProps> = ({
  isOpen,
  onClose,
  TotalExpense,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  console.log(TotalExpense)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Summary Expense"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <Table>
        <TableCaption>Total expense {"10000"}.</TableCaption>
        <TableCaption>Total Amount {"100000"}.</TableCaption>
        <TableCaption>current Amount {"90000"}.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {TotalExpense.map((ToatlExp) => (
            <TableRow key={ToatlExp.year}>
              <TableCell>{ToatlExp.year}</TableCell>
              <TableCell className="text-right">£{YearlyExpenseSum(ToatlExp.expenses)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Modal>
  );
};