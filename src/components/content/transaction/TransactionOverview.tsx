import React from "react";
import {
    MinusCircleIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline"
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Stats, Transaction } from "../../../slices/transactionSlice";
import { TransactionItem, StatItem } from "./partials";
import { TransactionContentContext, TransactionContentContextProps } from "../../../context/transactionProvider";

interface TransactionOverviewProps { }

const TransactionOverview: React.FC<TransactionOverviewProps> = () => {

    const { list, stats } = useSelector((state: RootState) => state.transaction);

    const { openModal } = React.useContext(TransactionContentContext) as TransactionContentContextProps;

    return <>
        <dl className="mx-auto grid grid-cols-1 border-t border-b gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.filter((stat: Stats) => ['TOTAL_EXPENSE_COUNT', 'TOTAL_INCOME_COUNT'].indexOf(stat._id) === -1).map((stat: Stats) => (
                <StatItem key={stat._id} stat={stat} />
            ))}
        </dl>
        <div className='p-3'>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className='flex items-center px-6 py-2 space-x-2 text-sm'>
                    <button className='bg-gray-700 text-white border border-gray-300 px-3 font-bold pt-1 pb-1.5 antialiased'>Today</button>
                    <button className='border border-gray-300 px-3 font-bold text-gray-700 pt-1 pb-1.5 antialiased'>This Month</button>
                    <button className='border border-gray-300 px-3 font-bold text-gray-700 pt-1 pb-1.5 antialiased'>3 Months</button>
                    <button className='border border-gray-300 px-3 font-bold text-gray-700 pt-1 pb-1.5 antialiased'>This Year</button>
                </div>
                <div className="flex pr-6">
                    <button type="button" onClick={() => { openModal("INCOME", true) }} className="flex bg-green-700 text-sm py-1 px-3 text-white">
                        <PlusCircleIcon className="h-6 w-6" />
                        Income
                    </button>
                    <button
                        type="button"
                        onClick={() => { openModal("EXPENSE", true) }}
                        className="bg-red-700 text-white flex text-sm py-1 px-3"
                    >
                        <MinusCircleIcon className="h-6 w-6" />Expense
                    </button>
                </div>
            </div>
            <div className="pt-6 border-b px-6 pb-3">
                <h1 className="text-sm font-semibold leading-6 text-gray-700">Transactions</h1>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {[...list]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((transaction: Transaction) => (
                        <TransactionItem key={transaction._id} transaction={transaction} />
                    ))}
            </ul>
        </div>
    </>
}

export default TransactionOverview