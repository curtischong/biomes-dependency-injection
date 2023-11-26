import React from "react";
import { ClientResourcePaths, ClientResources } from "./ecs/ecs_types";
import { Loop, resourcesBuilder } from "./ecs/ecs_init";
import { ReactResources } from "./ecs/ecs_core/react";

export interface ClientContext {
    resources: ClientResources;
    reactResources: ReactResources<ClientResourcePaths>;
    loop: Loop;
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
            const resources = await resourcesBuilder();
            const reactResources = new ReactResources<ClientResourcePaths>(resources);
            const loop = new Loop(reactResources);
            setValue({
                clientContext: {
                    resources,
                    reactResources,
                    loop,
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
