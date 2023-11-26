import { BiomesResourcesBuilder } from "./ecs_core/biomes";
import { PathDef } from "./ecs_core/path_map";
import { ReactResources } from "./ecs_core/react";
import { Optional } from "./ecs_core/type_helpers";
import { TypedResources } from "./ecs_core/types";

interface BaseClientResourcePaths {
    "/clicker/num_pressed": PathDef<[], { value: Optional<number> }>;
}

export type ClientResourcePaths = BaseClientResourcePaths; // you can use & to concat more path interfaces
export type ClientResources = TypedResources<ClientResourcePaths>;
export type ClientResourcesBuilder = BiomesResourcesBuilder<ClientResourcePaths>;
export type ClientReactResources = ReactResources<ClientResourcePaths>;
