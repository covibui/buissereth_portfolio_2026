import type { Metadata } from "next";
import Prose from "@/components/Prose";
import { getResumePage } from "@/lib/pages";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const { frontmatter } = await getResumePage();
  return { title: frontmatter.title, description: frontmatter.description };
}

export default async function ResumePage() {
  const page = await getResumePage();
  const { frontmatter } = page;

  return (
    <main>
      <section className={styles.intro}>
        <div className={styles.introTop}>
          <p className={styles.eyebrow}>{frontmatter.eyebrow}</p>
          <a href={frontmatter.downloadHref} className={styles.download}>
            {frontmatter.downloadCtaLabel}
          </a>
        </div>
        <h1 className={styles.name}>{frontmatter.name}</h1>
        <Prose html={page.html} className={styles.summary} />
      </section>

      <section className={styles.body}>
        <aside className={styles.sidebar}>
          <div>
            <p className={styles.sidebarLabel}>Contact</p>
            <p className={styles.sidebarText}>
              <a href={`mailto:${frontmatter.contact.email}`} className={styles.contactLink}>
                {frontmatter.contact.email}
              </a>
              {frontmatter.contact.phone && (
                <>
                  <br />
                  {frontmatter.contact.phone}
                </>
              )}
              {frontmatter.contact.location && (
                <>
                  <br />
                  {frontmatter.contact.location}
                </>
              )}
              {frontmatter.contact.note && (
                <>
                  <br />
                  <span className={styles.note}>{frontmatter.contact.note}</span>
                </>
              )}
            </p>
          </div>
          <div>
            <p className={styles.sidebarLabel}>Focus</p>
            <p className={styles.sidebarText}>
              {frontmatter.focus.map((item, index) => (
                <span key={item}>
                  {item}
                  {index < frontmatter.focus.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
          <div>
            <p className={styles.sidebarLabel}>Tools</p>
            <p className={styles.sidebarText}>
              {frontmatter.tools.map((item, index) => (
                <span key={item}>
                  {item}
                  {index < frontmatter.tools.length - 1 && <br />}
                </span>
              ))}
            </p>
          </div>
        </aside>

        <div className={styles.main}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {frontmatter.roles.map((role) => (
            <div key={`${role.company}-${role.dates}`} className={styles.role}>
              <div className={styles.roleHeader}>
                <h3 className={styles.roleTitle}>{role.title}</h3>
                <span className={styles.roleDates}>{role.dates}</span>
              </div>
              <p className={styles.roleCompany}>{role.company}</p>
              <p className={styles.roleBlurb}>{role.blurb}</p>
            </div>
          ))}

          <h2 className={`${styles.sectionTitle} ${styles.sectionTitleSpaced}`}>Education &amp; Recognition</h2>
          {frontmatter.education.map((item) => (
            <div key={item.title} className={styles.eduRow}>
              <div>
                <h3 className={styles.eduTitle}>{item.title}</h3>
                <p className={styles.eduPlace}>{item.place}</p>
              </div>
              <span className={styles.eduYear}>{item.year}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
