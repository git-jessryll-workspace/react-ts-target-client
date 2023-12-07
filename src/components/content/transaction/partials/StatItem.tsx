import React from "react";
import { Stats } from "../../../../slices/transactionSlice";
import { formatCurrency } from "../../../../utils/currency";

const StatItem: React.FC<{ stat: Stats }> = ({ stat }) => {
    return <div
        key={stat._id}
        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-4 sm:px-6 xl:px-8"
    >
        <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>

        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {
                ['TOTAL_COUNT', 'TOTAL_INCOME_COUNT', 'TOTAL_EXPENSE_COUNT'].indexOf(stat._id) === -1 ? formatCurrency(stat.amount, 'PHP') : stat.amount
            }
        </dd>
    </div>
}

export default StatItem