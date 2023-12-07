import React from "react";
interface NavigationContextProps {
    activeNavItem: string;
    setNavigation: (item: string) => void
}
interface NavigationProviderProps {
    children: React.ReactNode;
}
const NavigationContext = React.createContext<NavigationContextProps | null>(null);
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }: NavigationProviderProps) => {
    const [activeNavItem, setActiveNavItem] = React.useState('Dashboard');
    const setNavigation = (item: string) => {
        setActiveNavItem(item);
    };

    const value: NavigationContextProps = {
        activeNavItem,
        setNavigation,
    };

    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
}
export const useNavigation = (): NavigationContextProps => {
    const context = React.useContext(NavigationContext);

    if (!context) {
        throw new Error(
            'useNavigation must be used within a NavigationProvider'
        );
    }

    return context;
};