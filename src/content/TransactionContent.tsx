import React from "react";
import AuthLayout from '../layouts/AuthLayout'
import { TransactionExpense, TransactionIncome, TransactionOverview, TransactionPeople, TransactionSetting } from "../components/content/transaction";
import TransactionContentProvider from "../context/transactionProvider";
import TransactionModal from "../components/content/transaction/partials/TransactionModal";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../slices/groupSlice";
import { RootState } from "../store";
import { getTransactions } from "../slices/transactionSlice";

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}

interface TransactionContentProps { }

interface TransactionTab {
    name: string;
    href: string;
    current: boolean;
}

const TransactionContent: React.FC<TransactionContentProps> = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);

    const { token } = user;

    const [tabs, setTabs] = React.useState<TransactionTab[]>([
        { name: 'Overview', href: '#', current: true },
        { name: 'Expenses', href: '#', current: false },
        { name: 'Income', href: '#', current: false },
        { name: 'People', href: '#', current: false },
        { name: 'Settings', href: '#', current: false },
    ])

    React.useEffect(() => {
        // @ts-ignore
        const getGroupsAction = async () => await dispatch(getGroups(token))
        // @ts-ignore
        const getTransactionsAction = async () => await dispatch(getTransactions(token))
        
        getTransactionsAction();
        getGroupsAction();
    }, [token]);

    return (<AuthLayout>
        <TransactionContentProvider>
            <div>
                <div className="sm:hidden">
                    <label htmlFor="tabs" className="sr-only">
                        Select a tab
                    </label>
                    {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                    <select
                        id="tabs"
                        name="tabs"
                        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        defaultValue={tabs.find((tab) => tab.current)?.name}
                    >
                        {tabs.map((tab) => (
                            <option key={tab.name} onClick={() => setTabs((tabs) => {
                                return tabs.map((t: TransactionTab) => {
                                    return {
                                        ...t,
                                        current: t.name === tab.name
                                    }
                                })
                            })}>{tab.name}</option>
                        ))}
                    </select>
                </div>
                <div className="hidden sm:block">
                    <div className="border-b border-gray-200 pl-7">
                        <nav className="flex space-x-3" aria-label="Tabs">
                            {tabs.map((tab) => (
                                <button
                                    type="button"
                                    onClick={() => setTabs((tabs) => {
                                        return tabs.map((t: TransactionTab) => {
                                            return {
                                                ...t,
                                                current: t.name === tab.name
                                            }
                                        })
                                    })}
                                    key={tab.name}
                                    className={classNames(
                                        tab.current
                                            ? 'border-indigo-500 text-indigo-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                        'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                                    )}
                                    aria-current={tab.current ? 'page' : undefined}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
            {
                tabs.find((item: any) => item.current)?.name === 'Overview' &&
                <TransactionOverview />
            }
            {
                tabs.find((item: any) => item.current)?.name === 'Expenses' && <TransactionExpense />
            }
            {
                tabs.find((item: any) => item.current)?.name === 'Income' && <TransactionIncome />
            }
            {
                tabs.find((item: any) => item.current)?.name === 'People' && <TransactionPeople />
            }
            {
                tabs.find((item: any) => item.current)?.name === 'Settings' && <TransactionSetting />
            }
            <TransactionModal />
        </TransactionContentProvider>
    </AuthLayout>
    )
}

export default TransactionContent;