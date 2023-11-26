import React from "react";
import { ClientResourcePaths, ClientResources } from "./ecs/ecs_types";
import { Loop, resourcesBuilder } from "./ecs/ecs_init";
import { ReactResources } from "./ecs/ecs_core/react";
import EventEmitter from "events";

export interface ClientContext {
    resources: ClientResources;
    reactResources: ReactResources<ClientResourcePaths>;
    // loop: Loop;
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
            const emitter = new EventEmitter(); // needed so the resourcesBuilder can emit "set" events to the react resources
            // the original biomes code doesn't use this because instead, they use a loop that constantly calls the eventEmitter to
            // tell the react components to update:
            //
            // const emitter = this.reactResources.emitter;
            // if (emitter) {
            //     emitter.eventNames().forEach((path) => {
            //         // console.log("path", path);
            //         if (path !== "hot") {
            //             emitter.emit(path);
            //         }
            //     });
            // }
            const resources = await resourcesBuilder(emitter);
            const reactResources = new ReactResources<ClientResourcePaths>(resources, emitter);
            // const loop = new Loop(reactResources);
            setValue({
                clientContext: {
                    resources,
                    reactResources,
                    // loop,
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
