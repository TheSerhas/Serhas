import { createContext, useContext } from "react";
import { ServiceType } from "@serhas/modules/services";

interface RouterServiceContextProps {
    service: ServiceType;
}

export const RouterServiceContext = createContext<RouterServiceContextProps | null>(null);

export const useRouterServiceContext = () => {
    const ctx = useContext(RouterServiceContext);
    return ctx;
};
