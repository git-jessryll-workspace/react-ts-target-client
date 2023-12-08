import React, { FormEvent } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { RootState } from "@/store";
import { searchUsers } from "@/slices/userSlice";
import { createGroup } from "@/slices/groupSlice";
import { swalPopupMessage } from "@/lib/swal";
import AuthLayout from "@/layouts/AuthLayout";
import { InputText, TextLabel } from "@/components/forms";
interface CreateGroupContentProps { }
interface InviteEmail {
    _id: string;
    email: string;
}
const CreateGroupContent: React.FC<CreateGroupContentProps> = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [onSubmitStatus, setOnSubmitStatus] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("")
    const [invites, setInvites] = React.useState<InviteEmail[]>([])
    const { user } = useSelector((state: RootState) => state.user);
    const { token } = user;
    function generateUniqueId() {
        const timestamp = new Date().getTime();
        const random = Math.random().toString(36).substring(2, 10); // Using substring to remove '0.' from the start
        return `${timestamp}-${random}`;
    }

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOnSubmitStatus(true);
        const emails = invites.filter((item: InviteEmail) => item.email !== "").map((item: InviteEmail) => item.email);
        // @ts-ignore
        const existingUsers = await dispatch(searchUsers({ token, emails, key: 'email', type: 'in', search: null }))

        let collectMemberIds = existingUsers.payload.map((item: any) => item._id);
        const data = {
            name,
            member_ids: collectMemberIds,
            token,
            active: true,
            description
        }
        // @ts-ignore
        let res = await dispatch(createGroup(data))
        setOnSubmitStatus(false);
        if (res.error) {
            swalPopupMessage({ icon: 'error', title: "Ops", text: res.payload })
        } else {
            swalPopupMessage({ icon: 'success', title: 'Successfully created.', text: "You can start create transaction under on this team." })
            navigate('/teams')
        }
    }
    return <AuthLayout>
        <div className="flex justify-center items-center py-6">
            <form className="space-y-4 w-full md:w-1/2 border border-gray-300 py-8 px-6" onSubmit={onSubmit}>
                <div className="space-y-2">
                    <TextLabel text="Group Name" htmlFor="group_name" />
                    <div>
                        <InputText value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <TextLabel text="Description" htmlFor="description" />
                    <div>
                        <textarea
                            className="w-full border border-gray-300 rounded-md"
                            rows={5}
                            value={description}
                            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(event.target.value)}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <TextLabel text="Invite Members" htmlFor="invite_members" />
                        <div>
                            <button type="button" className="py-1 px-4 text-xs font-bold text-gray-600 border border-gray-500" onClick={() => setInvites((invites: InviteEmail[]) => [...invites, { _id: generateUniqueId(), email: "" }])}>Add Email</button>
                        </div>
                    </div>
                    <div className="space-y-2.5 pb-2">
                        {
                            invites.length === 0 && <div className="flex justify-center items-center">
                                <h3 className="text-xs text-gray-500 py-4">No data available</h3>
                            </div>
                        }
                        {
                            invites.map((invite: InviteEmail) => <div key={invite._id} className="space-x-2 flex items-center">
                                <InputText placeholder="user@example.com" type="email" value={invite.email} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInvites((invites: InviteEmail[]) => {
                                    return invites.map((i: InviteEmail) => {
                                        if (i._id === invite._id) {
                                            return {
                                                ...i,
                                                email: event.target.value
                                            }
                                        }
                                        return i;
                                    })
                                })} />
                                <button
                                    className="text-gray-500 hover:text-gray-700"
                                    type="button"
                                    onClick={() => setInvites((invites: InviteEmail[]) => {
                                        return invites.filter((item: InviteEmail) => item._id !== invite._id)
                                    })}>
                                    <TrashIcon className="w-6 h-6" />
                                </button>
                            </div>)
                        }
                    </div>
                    <div className="flex justify-end pt-3 border-t">
                        <div className="flex space-x-2">
                            <Link to={"/teams"} className="border border-gray-300 py-1.5 px-6 text-sm font-bold text-gray-700">Cancel</Link>
                            <button disabled={onSubmitStatus} className={`border border-gray-300 py-1.5 px-8 text-sm font-bold text-white bg-gray-900 ${onSubmitStatus && "opacity-50"}`}>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </AuthLayout>
}

export default CreateGroupContent;