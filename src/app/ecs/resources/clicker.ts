import { ClientResourcesBuilder } from "../ecs_types";

export async function addClickerResources(builder: ClientResourcesBuilder) {
    builder.addGlobal("/clicker/num_pressed", { value: 0 });
}
