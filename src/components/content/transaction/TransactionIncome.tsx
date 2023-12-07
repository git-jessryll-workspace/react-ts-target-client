import React from "react"
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { RootState } from "../../../store";
import { Stats, Transaction } from "../../../slices/transactionSlice";
import { StatItem, TransactionItem } from "./partials";

interface TransactionIncomeProps {}

const TransactionIncome: React.FC<TransactionIncomeProps> = () => {
    const { list, stats } = useSelector((state: RootState) => state.transaction);
    return <>
        <dl className="mx-auto grid grid-cols-1 border-b gap-px bg-white sm:grid-cols-2 lg:grid-cols-3">
            {stats.filter((stat: Stats) => ['INCOME', 'TOTAL_INCOME_COUNT'].indexOf(stat._id) !== -1).map((stat: Stats) => (
                <StatItem key={stat._id} stat={stat} />
            ))}
            <div className="px-6 pb-3 flex justify-end items-center">

                <div>
                    <Link
                        to="/create-expense"
                        className="bg-green-700 text-white flex text-sm py-1 px-3"
                    >
                        <PlusCircleIcon className="h-6 w-6" />Expense
                    </Link>
                </div>
            </div>
        </dl>
        <ul role="list" className="divide-y divide-gray-100">
            {list.filter((item: Transaction) => item.type === 'INCOME').map((transaction: Transaction) => (
                <TransactionItem key={transaction._id} transaction={transaction} />
            ))}
        </ul>
    </>
}

export default TransactionIncome