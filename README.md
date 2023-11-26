# biomes-ecs

This is the ECS system used by [Biomes](https://github.com/ill-inc/biomes-game). This is one of the best
codebase I've ever seen. And partly because of the efficiency and simplicity of their ECS framework.

Adding components was super simple, and their type annotations made working with their ECS fantastic. So I wanted to factor out their ECS component framework into this repo for myself to use if I ever wanted something similar!

Note: If you want to drop this into your project, just copy and paste everything under the `ecs/` directory into your project.

Look at clicker.tsx to see how simple it is to interact with the clicker.
Also look at ecs_types.ts (and resources/clicker.ts) to see how the components are declared.
