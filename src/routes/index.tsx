import { createFileRoute } from "@tanstack/react-router";
import { Viewer } from "@/components/starship/Viewer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return <Viewer />;
}
