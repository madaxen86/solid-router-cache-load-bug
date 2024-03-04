import { RouteDefinition, cache, createAsync } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";

const errorPromise = cache(async () => {
	throw Error("Some Error");
	// return new Promise((_, reject) => {
	//   reject("Some Error")
	// })
}, "Err");

export const route = {
	load: () => errorPromise(),
} satisfies RouteDefinition;

export default function Test() {
	const data = createAsync(() => errorPromise(), { deferStream: true });
	return (
		<ErrorBoundary
			fallback={(err: Error) => {
				return <main style={{ background: "red", "text-align": "center" }}>Error: {err.message}</main>;
			}}
		>
			<main style={{ "text-align": "center" }}>Data: {(data() as unknown as Error).message}</main>
		</ErrorBoundary>
	);
}
