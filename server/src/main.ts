import * as trpc from "@trpc/server";
import { z as zod } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";

const APP = express();
const PORT = process.env.PORT || 5050;

// @ts-ignore
APP.use(cors());

APP.get("/", (_, res) => {
	res.status(200).send("Hello World");
});

APP.get("/api", (_, res) => {
	res.status(200).json({ message: "Hello World" });
});

const trpcRouter = trpc.router()
	.query("hello", {
		async resolve() {
			return "World";
		}
	})
	.mutation("takeObject", {
		input: zod.object({ name: zod.string().min(5) }),
		async resolve(req) {
			return req.input;
		}
	})
	.mutation("takeString", {
		input: zod.string(),
		async resolve(req) {
			return req.input;
		}
	});

APP.use("/trpc", trpcExpress.createExpressMiddleware({
	router: trpcRouter,
	createContext: () => null
}));

APP.listen(PORT, () => {
	console.log(`APP STARTED: http://localhost:${PORT}`);
});

export type TrpcRouter = typeof trpcRouter;

