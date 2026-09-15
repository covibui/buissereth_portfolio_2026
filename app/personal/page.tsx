import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ProjectRow from "@/components/ProjectRow";
import { getPersonalPage } from "@/lib/pages";
import { getAllProjectsWithHtml } from "@/lib/projects";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getPersonalPage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function PersonalPage() {
  const [page, projects] = await Promise.all([getPersonalPage(), getAllProjectsWithHtml()]);

  return (
    <>
      <Hero
        eyebrow={page.frontmatter.eyebrow}
        headline={page.frontmatter.heroHeadline}
        lede={page.frontmatter.heroLede}
        showReveal={page.frontmatter.showHeroReveal ?? true}
        revealLabel={page.frontmatter.heroRevealLabel}
        revealAlign={page.frontmatter.heroRevealAlign}
      />

      <section className={styles.projects}>
        {projects.map((project, index) => (
          <ProjectRow key={project.slug} project={project} reversed={index % 2 === 1} index={index} />
        ))}
      </section>
    </>
  );
}
