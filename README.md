# biomes-ecs

inside renderer_controller

```
timeCode("react emitter invalidate", () => {
// Update react state based on all resource changes.
const emitter = this.reactResources.emitter;
if (emitter) {
    emitter.eventNames().forEach((path) => {
    if (path !== "hot") {
        emitter.emit(path);
    }
    });
}
});
this.emitter.emit("render");
```
