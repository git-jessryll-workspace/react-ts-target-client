import React from "react"
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "@/store"
import AuthLayout from "@/layouts/AuthLayout"
import { getGroups } from "@/slices/groupSlice"

interface GroupsContentProps { }

const GroupsContent: React.FC<GroupsContentProps> = () => {
    const dispatch = useDispatch();
    const { list } = useSelector((state: RootState) => state.group);
    const { user } = useSelector((state: RootState) => state.user)
    const { token } = user;
    React.useEffect(() => {
        // @ts-ignore
        const getGroupsAction = async () => await dispatch(getGroups(token))
        getGroupsAction();
    }, [token]);
    return (<AuthLayout>
        <div className='p-3'>
            <div className="sm:flex sm:items-center pb-4 px-6">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Teams</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        List of groups on your organization.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Link
                        to="/create-team"
                        className="block uppercase text-xs font-bold bg-gray-800 px-3 py-2 text-center text-white shadow-sm"
                    >
                        Add new team
                    </Link>
                </div>
            </div>
            <ul role="list" className="divide-y divide-gray-100 border-t pt-2">
                {list.map((groupItem: any) => (
                    <li key={groupItem._id} className="relative flex justify-between px-6 gap-x-6 py-2 hover:bg-gray-100">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    <a href={'#'}>
                                        <span className="absolute inset-x-0 -top-px bottom-0" />
                                        {groupItem.name}
                                    </a>
                                </p>
                                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                    {new Date(groupItem.createdAt).toLocaleDateString('en-ES', {
                                        month: "long",
                                        year: "numeric",
                                        day: "2-digit"
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 items-center gap-x-4">
                            <div className="hidden sm:flex sm:flex-col sm:items-end">
                                {
                                    groupItem.members.map((member: any) => <div key={member._id}>
                                        <img className="rounded-full h-8 w-8 shadow-md" src={member.picture} />
                                    </div>)
                                }
                            </div>
                            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </AuthLayout>
    )
}

export default GroupsContent