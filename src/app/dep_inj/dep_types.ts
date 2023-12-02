import { BiomesResourcesBuilder } from "./dep_inj_core/biomes";
import { PathDef } from "./dep_inj_core/path_map";
import { ReactResources } from "./dep_inj_core/react";
import { Optional } from "./dep_inj_core/type_helpers";
import { TypedResources } from "./dep_inj_core/types";

interface BaseClientResourcePaths {
    "/clicker/num_pressed": PathDef<[], { value: Optional<number> }>;
}

export type ClientResourcePaths = BaseClientResourcePaths; // you can use & to concat more path interfaces
export type ClientResources = TypedResources<ClientResourcePaths>;
export type ClientResourcesBuilder = BiomesResourcesBuilder<ClientResourcePaths>;
export type ClientReactResources = ReactResources<ClientResourcePaths>;
