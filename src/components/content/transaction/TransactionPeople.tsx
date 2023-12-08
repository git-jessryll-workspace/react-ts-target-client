import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "@/store";
import { Transaction } from "@/slices/transactionSlice";


interface TransactionPeopleProps { }
interface People {
    _id: string;
    email: string;
    name: string;
    picture: string;
}

// Function to get unique array objects based on the 'id' property
const getUniqueObjects = (array: any[], propertyName: string) => {
    const uniqueObjects = array.filter(
        (item, index, self) => index === self.findIndex((i) => i[propertyName] === item[propertyName])
    );
    return uniqueObjects;
};

const TransactionPeople: React.FC<TransactionPeopleProps> = () => {
    const { list: transaction_list } = useSelector((state: RootState) => state.transaction);
    const [people, setPeople] = React.useState<People[]>([])
    React.useEffect(() => {
        let map_users = transaction_list.map((transaction: Transaction) => transaction.user);
        setPeople(getUniqueObjects(map_users, '_id'))
    }, []);

    return (
        <div className="p-6">
            <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((person) => (
                    <li key={person.email} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
                        <div className="flex w-full items-center justify-between space-x-6 p-6">
                            <div className="flex-1 truncate">
                                <div className="flex items-center space-x-3">
                                    <h3 className="truncate text-sm font-medium text-gray-900">{person.name}</h3>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {person.email}
                                </span>
                            </div>
                            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={person.picture} alt="" />
                        </div>
                        <div>
                            <div className="-mt-px flex divide-x divide-gray-200">
                                <div className="flex w-0 flex-1">
                                    <Link to="#" className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900">View Profile</Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionPeople
