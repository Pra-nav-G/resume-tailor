import { readFileSync } from "node:fs";
import net from "node:net";
import os from "node:os";
import { expect, test } from "@playwright/test";

const port = 3000;

function canConnect(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = net.connect({ host, port, timeout: 2000 });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

// Every address of this machine other than 127.0.0.1. 127.0.0.2 is loopback on Linux, so it
// exposes a server listening on all interfaces even on a machine with no network connection.
function otherAddresses(): string[] {
  const network = Object.values(os.networkInterfaces())
    .flat()
    .filter((i) => i !== undefined && i.family === "IPv4" && !i.internal)
    .map((i) => i!.address);
  return ["127.0.0.2", ...network];
}

// AC2
test("npm run dev answers on 127.0.0.1 and refuses every other address", async () => {
  expect(await canConnect("127.0.0.1")).toBe(true);
  for (const address of otherAddresses()) {
    expect(await canConnect(address), `server reachable on ${address}`).toBe(false);
  }
});

// AC2: npm start can't be exercised here without a build, so check it binds the same way
test("npm start binds to 127.0.0.1 like npm run dev", () => {
  const { scripts } = JSON.parse(readFileSync("package.json", "utf8"));
  expect(scripts.start).toContain("--hostname 127.0.0.1");
  expect(scripts.dev).toContain("--hostname 127.0.0.1");
});
