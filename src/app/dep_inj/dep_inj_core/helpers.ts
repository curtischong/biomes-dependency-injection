import { keys } from "lodash";
// import { performance as perfHooksPerformance } from "perf_hooks";

// export function getPerformance() {
//     return perfHooksPerformance || performance;
// }

// export function getNowMs() {
//   return getPerformance().now();
// }

export function clearObjectProperties(a: Record<string, any>) {
    keys(a).forEach((k) => {
        if (a.hasOwnProperty(k)) {
            delete a[k];
        }
    });
}
