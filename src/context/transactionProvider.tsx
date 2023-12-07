import React from "react";

export const TransactionContentContext = React.createContext<TransactionContentContextProps | null>(null);

export interface TransactionContentContextProps {
    openStatus: boolean;
    transactionType: string;
    reset: () => void;
    openModal: (type: string, openModal: boolean) => void;
    groups: [];
}

const TransactionContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [transactionType, setTransactionType] = React.useState<string>("");

    const reset = () => {
        setOpen(false);
        setTransactionType("");
    }

    const openModal = (type: string = "INCOME", openModal: boolean = false) => {
        setTransactionType(type);
        setOpen(openModal);
    }

    return <TransactionContentContext.Provider value={{
        openStatus: open,
        transactionType,
        reset,
        openModal,
        groups: []
    }}>
        {children}
    </TransactionContentContext.Provider>
}

export default TransactionContentProvider