import { List } from "@/components/List";
import { getDb } from "@/db";
import { applications } from "@/db/schema";

// Reads the database on every request, never at build time
export const dynamic = "force-dynamic";

export default async function ApplicationsPage() {
  const rows = getDb().select().from(applications).all();

  return (
    <main className="p-5">
      <h1 className="font-heading text-xl text-text">Applications</h1>
      <List
        items={rows}
        emptyMessage="No applications yet. Paste a job description to make your first tailored resume."
        // Placeholder row until S-11 defines the row content (company, role, status)
        renderItem={(application) => `Application ${application.id}`}
      />
    </main>
  );
}
