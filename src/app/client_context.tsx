import React from "react";
import { ClientResources } from "./ecs/ecs_types";
import { resourcesBuilder } from "./ecs/ecs_init";

export interface ClientContext {
    resources: ClientResources;
}

export interface ClientContextReact {
    clientContext: ClientContext | null;
}

// Create a context
const ClientContextReactContext = React.createContext<ClientContextReact>({
    clientContext: null,
});

// Create a provider component
export const ClientContextProvider = ({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) => {
    const [value, setValue] = React.useState<ClientContextReact | undefined>();
    React.useEffect(() => {
        (async () => {
            setValue({
                clientContext: {
                    resources: await resourcesBuilder(),
                },
            });
        })();
    }, []);
    if (value) {
        return (
            <ClientContextReactContext.Provider value={value}>
                {children}
            </ClientContextReactContext.Provider>
        );
    }
    return <></>;
};

export const useClientContext = (): ClientContext => {
    const context = React.useContext(ClientContextReactContext).clientContext;
    if (!context) {
        throw new Error("useClientContext must be used within a ClientProvider");
    }
    return context;
};

// Export the context for use in other components
export default ClientContext;