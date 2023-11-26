import EventEmitter from "events";
import { BiomesResourceCapacities, BiomesResourcesBuilder } from "./ecs_core/biomes";
import { ClientReactResources, ClientResourcePaths } from "./ecs_types";
import { addClickerResources } from "./resources/clicker";

export async function resourcesBuilder(emitter: EventEmitter) {
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

    return builder.build(emitter);
}
