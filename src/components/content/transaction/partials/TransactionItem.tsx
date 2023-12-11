import React from "react"
import {
    ArrowDownIcon,
    ArrowUpIcon,
    ChevronRightIcon
} from "@heroicons/react/24/outline"
import { useSelector } from "react-redux"
import { Transaction } from "@/slices/transactionSlice"
import { formatCurrency } from "@/utils/currency"
import { RootState } from "@/store"
import { Link } from "react-router-dom"

const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
    const { user } = useSelector((state: RootState) => state.user);

    return <li key={transaction._id} className="relative flex justify-between gap-x-6 py-5 px-6">
        <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
                <Link to={`/transactions/${transaction._id}/details`} className="text-sm font-semibold leading-6 text-gray-900 flex space-x-3">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {transaction.name}
                </Link>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    Transact by {user._id === transaction.user._id ? "Me" : transaction.user.name} {transaction.group && <span className="pl-1">from <strong>{transaction.group.name}</strong></span>}
                </p>
            </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
            <div className="flex flex-col items-end">
                <p className={`text-xl leading-6 flex ${transaction.type === 'EXPENSE' ? 'text-red-700' : 'text-green-700'}`}>
                    {
                        formatCurrency(
                            +transaction.amount, 'PHP'
                        )
                    }
                    {
                        transaction.type === 'INCOME' ? <ArrowUpIcon className="text-green-700 h-6 w-6 ml-2" /> : <ArrowDownIcon className="text-red-700 h-6 w-6 ml-2" />
                    }
                </p>
                <p className="text-xs text-gray-500">
                    {
                        new Date(transaction.transaction_date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }
                </p>
            </div>
            <Link to={`/transactions/${transaction._id}/details`} className="cursor-pointer">
                <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" />
            </Link>
        </div>
    </li>
}

export default TransactionItem