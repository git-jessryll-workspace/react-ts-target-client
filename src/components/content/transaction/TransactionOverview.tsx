import React from "react";
import {
    MinusCircleIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline"
import { useDispatch, useSelector } from "react-redux";
import { TransactionItem, StatItem } from "./partials";
import { TransactionContentContext, TransactionContentContextProps } from "@/context/transactionProvider";
import { RootState } from "@/store";
import { Stats, Transaction, getTransactions } from "@/slices/transactionSlice";

interface TransactionOverviewProps { }


const TransactionOverview: React.FC<TransactionOverviewProps> = () => {

    const dispatch = useDispatch();
    const { list, stats } = useSelector((state: RootState) => state.transaction);
    const { user } = useSelector((state: RootState) => (state.user));
    const { token } = user

    const [filterBy, setFilterBy] = React.useState<"TODAY" | "WEEK" | "MONTH" | "YEAR">("MONTH");

    const { openModal } = React.useContext(TransactionContentContext) as TransactionContentContextProps;

    const handleFilter = async (filter: "TODAY" | "WEEK" | "MONTH" | "YEAR") => {
        setFilterBy(filter)
        // @ts-ignore
        await dispatch(getTransactions({ token, filter_by: filter }))
    }

    return <>
        <dl className="mx-auto grid grid-cols-1 border-t border-b gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.filter((stat: Stats) => ['TOTAL_EXPENSE_COUNT', 'TOTAL_INCOME_COUNT'].indexOf(stat._id) === -1).map((stat: Stats) => (
                <StatItem key={stat._id} stat={stat} />
            ))}
        </dl>
        <div className='p-3'>
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className='flex items-center px-6 py-2 space-x-2 text-sm'>
                    <button onClick={() => handleFilter("TODAY")} className={`${filterBy === "TODAY" ? "bg-gray-700 text-white" : "text-gray-700"} border border-gray-300 px-3 font-bold pt-1 pb-1.5 antialiased`}>Today</button>
                    <button onClick={() => handleFilter("WEEK")} className={`${filterBy === "WEEK" ? "bg-gray-700 text-white" : "text-gray-700"} border border-gray-300 px-3 font-bold pt-1 pb-1.5 antialiased`}>This Week</button>
                    <button onClick={() => handleFilter("MONTH")} className={`${filterBy === "MONTH" ? "bg-gray-700 text-white" : "text-gray-700"} border border-gray-300 px-3 font-bold pt-1 pb-1.5 antialiased`}>This Month</button>
                    <button onClick={() => handleFilter("YEAR")} className={`${filterBy === "YEAR" ? "bg-gray-700 text-white" : "text-gray-700"} border border-gray-300 px-3 font-bold pt-1 pb-1.5 antialiased`}>This Year</button>
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
                    .sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())
                    .map((transaction: Transaction) => (
                        <TransactionItem key={transaction._id} transaction={transaction} />
                    ))}
            </ul>
        </div>
    </>
}

export default TransactionOverview