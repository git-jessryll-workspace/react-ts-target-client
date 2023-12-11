import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { formatCurrency } from "@/utils/currency";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { getTransaction } from "@/slices/transactionSlice";
import { useParams } from "react-router-dom";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

interface TransactionDetailsContentProps { }

const TransactionDetailsContent: React.FC<TransactionDetailsContentProps> = () => {
    const dispatch = useDispatch();
    const { details } = useSelector((state: RootState) => state.transaction);
    const { user } = useSelector((state: RootState) => state.user)
    const { token } = user
    const { id } = useParams();
    const { type, name, amount, transaction_date, group, user: transaction_user } = details
    React.useEffect(() => {
        // @ts-ignore
        const getTransactionAction = async () => await dispatch(getTransaction({ token, _id: id }))
        getTransactionAction();
    }, [])
    console.log(details);
    return <AuthLayout>
        <div className="grid grid-cols-1 md:grid-cols-3 px-6 mt-3 gap-3">
            <div className="w-full col-span-2">
                <div className="border border-gray-300 rounded-md">
                    {/* Heading */}
                    <div className="flex border-b flex-col items-start justify-between gap-x-8 gap-y-4 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">

                        <div>
                            <div className="text-xs text-gray-500">{type}</div>
                            <div className="flex items-center gap-x-3">
                                <h1 className="flex gap-x-3 text-base leading-7">
                                    <span className="font-semibold text-gray-700">{name}</span>
                                </h1>
                            </div>
                            <p className="text-xs leading-6 text-gray-500 mt-2">Transact By <strong>{transaction_user.name}</strong></p>
                        </div>
                        <div className=" text-right text-gray-700">
                            <div className="text-xs">{
                                new Date(transaction_date).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                            }</div>
                            <h1 className="text-2xl">{formatCurrency(amount, 'PHP')}</h1>
                            {
                                group.name !== "" &&
                                <p className="text-xs leading-6 text-gray-500 mt-2">from <strong>{group.name}</strong></p>
                            }
                        </div>
                    </div>

                    <div className="px-8 py-5 flex justify-between">
                        <div className="text-xs text-gray-700">Note:</div>
                    </div>
                </div>
            </div>
            <div className="border rounded-md">
                <div className="border-b flex items-center justify-between">
                    <div className="p-3">
                        <h5 className="text-sm text-gray-500">Comments</h5>
                    </div>
                    <div className="pr-3">
                        <ArrowPathIcon className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                    </div>
                </div>
                <div className="">
                    <p className="text-sm text-center py-10 text-gray-500">No comment available</p>
                </div>
                <div className="p-2">
                    <textarea className="w-full border-gray-300 text-sm focus:outline-none focus:ring-0" rows={2} />
                    <div className="flex justify-end pt-1 pb-1">
                        <button className="text-sm px-6 py-1 border border-gray-100 bg-gray-800 text-white rounded-sm">Sent</button>
                    </div>
                </div>
            </div>
        </div>
    </AuthLayout>
}

export default TransactionDetailsContent