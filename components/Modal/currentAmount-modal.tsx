"use client";

import { useEffect, useMemo, useState } from "react";

import { Modal } from "@/components/ui/modal";
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


interface CurrentAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: any[],
  YearlyExpense: any[];
  loading: boolean;
}


export const CurrentAmountModal: React.FC<CurrentAmountModalProps> = ({
  isOpen,
  onClose,
  donation,
  YearlyExpense,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [yearlyCost, setYearlyCost] = useState([]);


  useEffect(() => {
    setIsMounted(true);

    // Calculate yearly costs when the component is mounted
    const costs = YearlyExpense.map((exp) => YearlyExpenseSum(exp.expenses));
    setYearlyCost(costs);
  }, [YearlyExpense]);

  // As the yearlyCost is partially static it is best practice to use usememo
  // prevents recalculating except during updates
  const overAllCost = useMemo(() => {
    return yearlyCost.reduce((acc, total) => acc + total, 0);
  }, [yearlyCost]);

  const overAllDonation = donation.reduce((acc, total) => {
    return acc + total.amount;
  }, 0)

  const calculateCurrentAmount = (donation, cost) => {
    return donation - cost
  }

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
        <TableCaption>Total expense {overAllCost}.</TableCaption>
        <TableCaption>Total Amount {overAllDonation}.</TableCaption>
        <TableCaption>current Amount {calculateCurrentAmount(overAllDonation, overAllCost)}.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Cost</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {YearlyExpense.map((ToatlExp) => (
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