import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { getResumePage } from "@/lib/pages";
import EducationRow from "./_components/EducationRow";
import RoleCard from "./_components/RoleCard";
import SidebarSection from "./_components/SidebarSection";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getResumePage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function ResumePage() {
  const page = await getResumePage();
  const { frontmatter } = page;
  const { contact } = frontmatter;

  const contactItems = [
    <a key="email" href={`mailto:${contact.email}`} className={styles.contactLink}>
      {contact.email}
    </a>,
    contact.phone,
    contact.location,
    contact.note ? (
      <span key="note" className={styles.note}>
        {contact.note}
      </span>
    ) : null,
  ].filter(Boolean);

  return (
    <>
      <section className={styles.intro}>
        <div className={styles.introTop}>
          <p className={`text-eyebrow ${styles.eyebrow}`}>{frontmatter.eyebrow}</p>
          <a href={frontmatter.downloadHref} className={styles.download}>
            {frontmatter.downloadCtaLabel}
          </a>
        </div>
        <h1 className={`text-display text-title ${styles.name}`}>{frontmatter.name}</h1>
        <Prose html={page.html} className={styles.summary} />
      </section>

      <section className={styles.content}>
        <aside className={styles.sidebar}>
          <SidebarSection label="Contact" items={contactItems} />
          <SidebarSection label="Focus" items={frontmatter.focus} />
          <SidebarSection label="Tools" items={frontmatter.tools} />
        </aside>

        <div className={styles.main}>
          <h2 className={`text-label ${styles.sectionTitle}`}>Experience</h2>
          {frontmatter.roles.map((role) => (
            <RoleCard key={`${role.company}-${role.dates}`} role={role} />
          ))}

          <h2 className={`text-label ${styles.sectionTitle} ${styles.sectionTitleSpaced}`}>Education &amp; Recognition</h2>
          {frontmatter.education.map((item) => (
            <EducationRow key={item.title} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
