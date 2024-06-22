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
import { Donation, Expense, Member, Year } from "@prisma/client";
import { ExpenseColumn } from "@/app/(dashboard)/(routes)/expense/components/columns";
import { ScrollArea } from "../ui/scroll-area";


interface CurrentAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: (Member & {donations: Donation[]})[],
  YearlyExpense: ExpenseColumn[];
  // YearlyExpense: (Year & {expenses: Expense})[];
  loading: boolean;
}


export const CurrentAmountModal: React.FC<CurrentAmountModalProps> = ({
  isOpen,
  onClose,
  donation,
  YearlyExpense,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [yearlyCost, setYearlyCost] = useState<number[]>([]);

  useEffect(() => {
    setIsMounted(true);

    // Calculate yearly costs when the component is mounted
    const costs = YearlyExpense.map((exp) => YearlyExpenseSum(exp.expenses));
    setYearlyCost(costs);
  }, [YearlyExpense]);

  // As the yearlyCost is partially static it is best practice to use usememo
  // prevents recalculating except during updates
  const totalExpenses = useMemo(() => {
    return yearlyCost.reduce((acc, total) => acc + total, 0);
  }, [yearlyCost]);


  // Calculate overall donation
  const overAllDonation = useMemo(() => {
    return donation.reduce((totalSum, member) => {
      return totalSum + member.donations.reduce((memberSum, donation) => memberSum + donation.amount, 0);
    }, 0);
  }, [donation]);

  const calculateCurrentAmount = (donation: number, cost: number) => {
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
      <ScrollArea className="h-96 w-full ">
        <Table>
          <TableCaption className="text-black">Total expense: £{totalExpenses.toLocaleString(undefined, {
            useGrouping: true,
          })}</TableCaption>
          <TableCaption className="text-black">Total Amount: £{overAllDonation.toLocaleString(undefined, {
            useGrouping: true,
          })}</TableCaption>
          <TableCaption className="font-semibold text-black">current Amount: £{calculateCurrentAmount(overAllDonation, totalExpenses).toLocaleString(undefined, {
            useGrouping: true,
          })}</TableCaption>
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
      </ScrollArea>
    </Modal>
  );
};