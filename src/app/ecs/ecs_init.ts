import { BiomesResourceCapacities, BiomesResourcesBuilder } from "./ecs_core/biomes";
import { ClientReactResources, ClientResourcePaths } from "./ecs_types";
import { addClickerResources } from "./resources/clicker";

export async function resourcesBuilder() {
    const builder = new BiomesResourcesBuilder<ClientResourcePaths>({
        collectorParams: {
            capacities: {
                count: 140_000,
                labels: {
                    blockMeshes: 1300,
                },
            } satisfies BiomesResourceCapacities,
        },
        stats: undefined,
    });

    await Promise.all([addClickerResources(builder)]);

    return builder.build();
}

export class Loop {
    private requestedAnimationFrame = 0;

    constructor(private readonly reactResources: ClientReactResources) {
        this.init();
    }

    tick() {
        const emitter = this.reactResources.emitter;
        if (emitter) {
            emitter.eventNames().forEach((path) => {
                // console.log("path", path);
                if (path !== "hot") {
                    emitter.emit(path);
                }
            });
        }
    }

    init() {
        const loop = () => {
            this.requestedAnimationFrame = requestAnimationFrame(loop);
            this.tick();
        };
        this.requestedAnimationFrame = requestAnimationFrame(loop);
    }

    stop() {
        cancelAnimationFrame(this.requestedAnimationFrame);
    }
}
