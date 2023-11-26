import { useClientContext } from "./client_context";

export const Clicker = () => {
    const { resources, reactResources } = useClientContext();
    // TODO: use "use"
    const { value: numPressed } = reactResources.use("/clicker/num_pressed");

    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p>hi</p>
            <p>{numPressed}</p>
            <button
                onClick={() => {
                    const { value: numPressed2 } = resources.get("/clicker/num_pressed");
                    if (numPressed2 === undefined) {
                        return;
                    }
                    console.log("numPressed2", numPressed2);
                    console.log("click");
                    // reactResources.set("/clicker/num_pressed", {
                    //     value: numPressed + 1,
                    // });
                    resources.set("/clicker/num_pressed", {
                        value: numPressed2 + 1,
                    });
                }}
            >
                click me
            </button>
        </div>
    );
};
