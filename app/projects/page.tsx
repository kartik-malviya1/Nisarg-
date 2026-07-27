import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Projects } from "@/components/ProjectsPage";

export const metadata: Metadata = {
  title: "Projects & Initiatives — NISARG Foundation",
  description:
    "Explore NISARG Foundation's field-level projects: farmer orientations, soil testing, women enterprise support, tree plantation drives, and community campaigns across Madhya Pradesh.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects & Initiatives"
        title="Every project, a step toward change."
        description="A complete log of our field-level programmes — farmer workshops, soil testing drives, women enterprise camps, and community campaigns across Madhya Pradesh."
      />
      <Projects />
    </>
  );
}
