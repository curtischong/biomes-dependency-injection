import { useClientContext } from "./client_context";

export const Clicker = () => {
    const { resources } = useClientContext();
    // TODO: use "use"
    const numPressed = resources.get("/clicker/num_pressed").value;

    return (
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p>hi</p>
            <p>{numPressed}</p>
            <button
                onClick={() => {
                    if (numPressed === undefined) {
                        return;
                    }
                    resources.set("/clicker/num_pressed", {
                        value: numPressed + 1,
                    });
                }}
            >
                click me
            </button>
        </div>
    );
};
