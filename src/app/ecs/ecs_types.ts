import { BiomesResourcesBuilder } from "./ecs_core/biomes";
import { PathDef } from "./ecs_core/path_map";
import { Optional } from "./ecs_core/type_helpers";

interface BaseClientResourcePaths {
    "/clicker/num_pressed": PathDef<[], { value: Optional<number> }>;
}

export type ClientResourcePaths = BaseClientResourcePaths; // you can use & to concat more path interfaces
export type ClientResourcesBuilder = BiomesResourcesBuilder<ClientResourcePaths>;