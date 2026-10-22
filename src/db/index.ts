import { mkdirSync } from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { drizzle, type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

export type Db = BetterSQLite3Database<typeof schema> & { $client: Database.Database };

export function databasePath(configured: string | undefined): string {
  return configured || "data/resume-tailor.db";
}

// Opens (creating if needed) the SQLite file and applies any pending migrations.
export function openDb(filePath: string): Db {
  mkdirSync(path.dirname(filePath), { recursive: true });
  const sqlite = new Database(filePath);
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("foreign_keys = ON");
  const db = drizzle(sqlite, { schema });
  migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
  return db;
}

// One connection per server process; kept on globalThis so dev hot reloads reuse it.
const cache = globalThis as { db?: Db };

export function getDb(): Db {
  cache.db ??= openDb(databasePath(process.env.DATABASE_PATH));
  return cache.db;
}
