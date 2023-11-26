import { useClientContext } from "./client_context";

export const Clicker = () => {
    const { reactResources } = useClientContext();
    // TODO: use "use"
    const { value: numPressed } = reactResources.use("/clicker/num_pressed");

    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p>hi</p>
            <p>{numPressed}</p>
            <button
                onClick={() => {
                    if (numPressed === undefined) {
                        return;
                    }
                    console.log("click");
                    reactResources.set("/clicker/num_pressed", {
                        value: numPressed + 1,
                    });
                }}
            >
                click me
            </button>
        </div>
    );
};
