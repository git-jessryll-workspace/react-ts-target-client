import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Select from 'react-select'
import { TransactionContentContext, TransactionContentContextProps } from '../../../../context/transactionProvider';
import { InputText, TextLabel } from '../../../forms';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { GroupDetails } from '../../../../slices/groupSlice';
import { createTransaction } from '../../../../slices/transactionSlice';
import { swalPopupMessage } from '../../../../lib/swal';

interface TransactionModalProps { }

const TransactionModal: React.FC<TransactionModalProps> = () => {
    const dispatch = useDispatch();
    const { list: groups } = useSelector((state: RootState) => state.group);
    const { openStatus: open, reset, transactionType } = React.useContext(TransactionContentContext) as TransactionContentContextProps;
    const [name, setName] = React.useState<string>("")
    const [amount, setAmount] = React.useState<string>("");
    const [note, setNote] = React.useState<string>("");
    const [groupTag, setGroupTag] = React.useState<any>();
    const [transactionDate, setTransactionDate] = React.useState<string>(new Date().toISOString().split('T')[0])

    const handleCreateTransaction = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = {
            name,
            amount,
            note,
            group_id: groupTag?._id,
            transaction_date: transactionDate,
            type: transactionType
        }
        // @ts-ignore
        const res = await dispatch(createTransaction(data));
        if (res.error) {
            swalPopupMessage({ icon: 'error', title: "Ops", text: res.payload })
        } else {
            swalPopupMessage({ icon: 'success', title: 'Successfully created.', text: "You can start create transaction under on this team." })
            reset();
            setName("");
            setAmount("");
            setNote("")
            setGroupTag(null);
            setTransactionDate("")
        }

    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={reset}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative w-full md:w-3/4 lg:w-1/2 transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div className='pb-4'>
                                    <h3>{transactionType} FORM</h3>
                                </div>
                                <form className="space-y-3" onSubmit={handleCreateTransaction}>
                                    <div className="space-y-2">
                                        <TextLabel text="Transaction Name" htmlFor='transaction_name' />
                                        <div>
                                            <InputText
                                                type="text"
                                                value={name}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <TextLabel text="Amount" htmlFor='amount_' />
                                        <div>
                                            <InputText type="number" value={amount} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAmount(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <TextLabel text="Group Tag" htmlFor='group_tag' />
                                        <div>
                                            <Select
                                                value={groupTag}
                                                onChange={(newValue: any) => setGroupTag(newValue)}
                                                options={groups.map((group: GroupDetails) => ({ ...group, label: group.name, value: group._id }))}
                                            />
                                        </div>
                                    </div>
                                    <div className='space-y-2'>
                                        <TextLabel text="Transaction Date" htmlFor='transaction_date' />
                                        <div>
                                            <InputText type="date" value={transactionDate} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTransactionDate(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <TextLabel text="Note (optional)" htmlFor='note_' />
                                        <div>
                                            <textarea rows={4} className='w-full border border-gray-300' value={note} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setNote(event.target.value)} />
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <div className='flex space-x-2 text-sm'>
                                            <button onClick={reset} type="button" className='border border-gray-300 px-6 py-1.5'>Cancel</button>
                                            <button className="text-white bg-gray-800 px-8 py-1.5">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default TransactionModal
