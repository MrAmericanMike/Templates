import "./style.css";
import "@picocss/pico";
import { createTRPCClient } from "@trpc/client";
import type { TrpcRouter } from "../../server/src/main";
import KoalaCodes from "koalacodes";

const KC = new KoalaCodes();

function assert(condition: unknown, message: string) {
	if (!condition) throw Error(message);
}

const BUTTON: HTMLButtonElement | null = document.querySelector("#get");
const DATA: HTMLDivElement | null = document.querySelector("#data");

assert(BUTTON, "Missing button #get");
assert(DATA, "Missing data div #data");

const CLIENT = createTRPCClient<TrpcRouter>({
	url: "http://localhost:5050/trpc"
});

BUTTON?.addEventListener("click", async () => {
	const D1 = await CLIENT.mutation("takeString", KC.generateCode());
	const D2 = await CLIENT.mutation("takeObject", { name: KC.generateCode(5) });

	const DIV: HTMLDivElement = document.createElement("div");
	DIV.innerText = `${D1} · ${D2.name}`;
	DATA?.appendChild(DIV);
});



