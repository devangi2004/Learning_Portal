import { useEffect, useState } from "react";
import client from "../api/client";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    client.get("/dashboard").then(({ data }) => setDashboard(data));
  }, []);

  if (!dashboard) return <p>Loading dashboard...</p>;

  return (
    <section className="grid">
      <article className="card"><h3>Streak 🔥</h3><p>{dashboard.streakCount} days</p></article>
      <article className="card"><h3>XP</h3><p>{dashboard.xp}</p></article>
      <article className="card"><h3>Level</h3><p>{dashboard.level}</p></article>
    </section>
  );
}
