import { InputText, TextLabel } from "@/components/forms";
import AuthLayout from "@/layouts/AuthLayout";
import { createTransaction } from "@/slices/transactionSlice";
import { RootState } from "@/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

interface CreateTransactionContentProps { }

const CreateTransactionContent: React.FC<CreateTransactionContentProps> = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.user);
    const { token } = user;

    const [name, setName] = React.useState<string>("");
    const [amount, setAmount] = React.useState<number>(0);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // @ts-ignore
        const res = await dispatch(createTransaction({ name, token }));
    }
    return <AuthLayout>
        <div className="flex justify-center items-center py-6">
            <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-1/2 border border-gray-300 py-8 px-6">
                <div className="space-y-2">
                    <TextLabel text="Transaction Name" htmlFor="transaction_name" />
                    <div>
                        <InputText value={name} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <TextLabel text="Amount" htmlFor="amount_" />
                    <div>
                        <InputText value={amount} type="number" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAmount(+event.target.value)} />
                    </div>
                </div>
            </form>
        </div>
    </AuthLayout>
}

export default CreateTransactionContent