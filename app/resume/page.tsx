import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { getResumePage } from "@/lib/pages";
import EducationRow from "./EducationRow";
import RoleCard from "./RoleCard";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getResumePage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function ResumePage() {
  const page = await getResumePage();
  const { frontmatter } = page;

  return (
    <>
      <section className={styles.intro}>
        <div className={styles.introTop}>
          <p className={styles.eyebrow}>{frontmatter.eyebrow}</p>
          <a href={frontmatter.downloadHref} className={styles.download}>
            {frontmatter.downloadCtaLabel}
          </a>
        </div>
        <h1 className={`${styles.name} text-display`}>{frontmatter.name}</h1>
        <Prose html={page.html} className={styles.summary} />
      </section>

      <section className={styles.content}>
        <aside className={styles.sidebar}>
          <div>
            <h2 className={styles.sidebarLabel}>Contact</h2>
            <ul className={styles.sidebarList}>
              <li>
                <a href={`mailto:${frontmatter.contact.email}`} className={styles.contactLink}>
                  {frontmatter.contact.email}
                </a>
              </li>
              {frontmatter.contact.phone && <li>{frontmatter.contact.phone}</li>}
              {frontmatter.contact.location && <li>{frontmatter.contact.location}</li>}
              {frontmatter.contact.note && <li className={styles.note}>{frontmatter.contact.note}</li>}
            </ul>
          </div>
          <div>
            <h2 className={styles.sidebarLabel}>Focus</h2>
            <ul className={styles.sidebarList}>
              {frontmatter.focus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={styles.sidebarLabel}>Tools</h2>
            <ul className={styles.sidebarList}>
              {frontmatter.tools.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={styles.main}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {frontmatter.roles.map((role) => (
            <RoleCard key={`${role.company}-${role.dates}`} role={role} />
          ))}

          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleSpaced}`}>Education &amp; Recognition</h2>
          {frontmatter.education.map((item) => (
            <EducationRow key={item.title} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
