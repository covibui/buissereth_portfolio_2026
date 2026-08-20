"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import CaseNav from "@/components/CaseNav";
import styles from "./SecurityCase.module.css";

/* Bespoke implementation of Work-CaseSecurity v3 (Claude Design).
   The generic /work/[slug] template renders every other case; the Security
   Assessment Tool gets this hand-built editorial layout instead. All copy is
   baked in from the design — this case is a fixed narrative, not content-driven.

   Screenshots live in /public/images/work/security-assessment-tool/. */

const IMG = "/images/work/security-assessment-tool";
const insights = `${IMG}/insights-filters.png`;
const heatmapTraining = `${IMG}/heatmap-training.png`;
const heatmapIssues = `${IMG}/heatmap-issues.png`;

/** Frame an exact pixel region of a source screenshot into a 16:10 box.
   Ported verbatim from the design's DCLogic.crop(). */
function crop(imgW: number, imgH: number, x0: number, y0: number, regionW: number) {
  const fw = regionW / imgW;
  const r = imgW / imgH;
  return {
    width: `${((100 / fw)).toFixed(2)}%`,
    left: `${((-(x0 / imgW) / fw) * 100).toFixed(2)}%`,
    top: `${((-(y0 / imgH) / (fw * r * 0.625)) * 100).toFixed(2)}%`,
  };
}

const meta = [
  { label: "Role", value: "Experience Designer" },
  { label: "Scope", value: "Vision / proof-of-concept" },
  { label: "Team", value: "1 designer & 1 engineer" },
  { label: "Client", value: "Enterprise infosec (NDA)" },
  { label: "Year", value: "2022" },
];

const lenses = [
  {
    lens: "Issue resolution time",
    src: insights,
    alt: "Issue Resolution Time view with filters open.",
  },
  {
    lens: "Security training hours",
    src: heatmapTraining,
    alt: "Security training hours view — the threshold scale inverted, red on the left.",
  },
  {
    lens: "Open issues",
    src: heatmapIssues,
    alt: "Open issues view — a wall of green with one red project tile.",
  },
];

const moments = [
  {
    title: "The threshold belongs to the user.",
    body: "Green, amber and red aren't hardcoded judgments — they're a slider the organization sets and is then held to. And when the metric inverts, so does the scale: on training hours, red sits on the left, because fewer hours is the failure state. The tool never assumes it knows what “bad” means for a given signal; it makes the org say so out loud and then holds the line.",
    src: insights,
    alt: "Crop: the threshold slider, green to red, with handles at 7 and 9.5.",
    ...crop(1364, 1651, 275, 939, 400),
  },
  {
    title: "No number appears without its reference.",
    body: "Every trend shows three plots — actual, average, recommended. A score of 8.1 means nothing alone; 8.1 against a recommended 9.5 is an argument. This is what makes a green tile something you can defend in a room rather than something you felt.",
    src: insights,
    alt: "Crop: the trend chart with its actual, average and recommended legend.",
    ...crop(1364, 1651, 740, 1084, 520),
  },
  {
    title: "The heatmap answers the actual morning question.",
    body: "Sixteen project tiles, one of them red. No reading, no sorting, no interpreting — the eye lands on ASD-CDE before the brain finishes the sentence. Everything above it in the interface exists to make that one tile trustworthy.",
    src: heatmapIssues,
    alt: "Crop: the project heatmap, one tile red.",
    ...crop(1377, 1441, 240, 940, 480),
  },
];

const cadence = Array.from({ length: 12 }, (_, i) => i);

const exposureValues = [14, 9, 26, 11, 52, 18, 7, 31, 88, 12, 22, 6];
const exposure = exposureValues.map((v, i) => ({
  height: `${Math.round(14 + v * 0.72)}px`,
  color: i === 8 ? "#C24E2E" : "rgba(244,241,234,.34)",
}));

const chips = [
  { value: "None", label: "Data entry required" },
  { value: "8", label: "Signals unified" },
  { value: "Evidence-led", label: "Assessment cadence" },
];

type RailMode = "one" | "two";
type RailName = "situation" | "reframe" | "possible";
type Cols = Record<RailName, RailMode>;

const RAIL_MIN_COPY_HEIGHT = 360;

/** Two-column grid with a sticky label rail; collapses to one centered column
   when the copy is short or the viewport narrows — the design's measure(). */
function railStyle(mode: RailMode) {
  return {
    gridTemplateColumns: mode === "one" ? "minmax(0,1fr)" : "minmax(190px,260px) minmax(0,1fr)",
    justifyItems: mode === "one" ? "center" : "stretch",
  } as const;
}

export default function SecurityCase() {
  const [cols, setCols] = useState<Cols>({ situation: "two", reframe: "two", possible: "two" });

  useEffect(() => {
    const measure = () => {
      const next: Partial<Cols> = {};
      document.querySelectorAll<HTMLElement>("[data-rail]").forEach((section) => {
        const copy = section.querySelector<HTMLElement>("[data-rail-copy]");
        const h = copy ? copy.getBoundingClientRect().height : 0;
        const name = section.getAttribute("data-rail") as RailName | null;
        if (name) {
          next[name] = h < RAIL_MIN_COPY_HEIGHT || window.innerWidth < 900 ? "one" : "two";
        }
      });
      setCols((prev) => ({ ...prev, ...next }));
    };
    measure();
    window.addEventListener("resize", measure);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className={styles.page}>
      {/* 1 · Cover */}
      <header className={styles.cover}>
        <Link href="/work" className={styles.archiveLink}>
          &larr; The archive
        </Link>
        <p className={styles.coverKicker}>Security Assessment Tool &middot; EPAM 2021&ndash;2023</p>
        <h1 className={styles.coverTitle}>
          Making risk impossible to <span className={styles.coverTitleAccent}>miss.</span>
        </h1>
        <p className={styles.coverLede}>
          A self-serve risk dashboard that told a growing security team which application to assess
          next — and, just as importantly, why.
        </p>
        <p className={styles.coverDisciplines}>Product Design &middot; UX/UI &middot; Data Visualization</p>
      </header>

      <section className={styles.heroImageSection}>
        <div className={styles.imageFrame}>
          <img
            src={insights}
            alt="The Security Assessment Tool: Issue Resolution Time view with the filters panel open, threshold scale and project heatmap below."
            className={styles.heroImg}
          />
        </div>
      </section>

      {/* 2 · Meta strip */}
      <section className={styles.metaSection}>
        <div className={styles.metaGrid}>
          {meta.map((m) => (
            <div key={m.label}>
              <p className={styles.metaLabel}>{m.label}</p>
              <p className={styles.metaValue}>{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 · The situation */}
      <section data-rail="situation" className={`${styles.rail} ${styles.railSituation}`} style={railStyle(cols.situation)}>
        <div className={styles.railLabel}>
          <p className={styles.railEyebrow}>The situation</p>
          <h2 className={styles.railHeading}>
            A security team doing good work — and quietly losing anyway.
          </h2>
        </div>
        <div data-rail-copy className={styles.railCopy}>
          <p className={styles.railBody}>
            Not because they were slow or careless, but because the thing they were guarding kept
            multiplying. New applications shipped faster than anyone could evaluate them, and the team
            had no reliable way to answer the only question that actually matters on any given morning:{" "}
            <em className={styles.emInk}>of everything we own, what is the most dangerous thing right now?</em>
          </p>
          <p className={styles.railBody}>
            So assessments got scheduled the way important work gets scheduled when nobody can see the
            whole board — by instinct, by rotation, by whoever shouted loudest last. The team could
            spend two careful weeks reviewing something low-stakes while a genuinely exposed
            application sat in a blind spot, unassessed and unbothered.
          </p>
          <p className={styles.railBody}>
            The risk was always there. What was missing wasn't effort. It was{" "}
            <em className={styles.emInk}>sight</em>.
          </p>
        </div>
      </section>

      <section className={styles.compareSection}>
        <div className={styles.compareGrid}>
          <div className={`${styles.comparePanel} ${styles.comparePanelLight}`}>
            <p className={styles.compareKicker}>How the work was scheduled</p>
            <p className={styles.compareTitle}>The calendar</p>
            <p className={styles.compareSub}>Assessments every N weeks, by rotation.</p>
            <div className={styles.barsRow}>
              {cadence.map((i) => (
                <span key={i} className={styles.cadenceBar} />
              ))}
            </div>
            <p className={styles.compareFoot}>Even intervals · every project, same beat</p>
          </div>
          <div className={`${styles.comparePanel} ${styles.comparePanelDark}`}>
            <p className={`${styles.compareKicker} ${styles.compareKickerDark}`}>How risk actually arrived</p>
            <p className={styles.compareTitle}>The threat</p>
            <p className={`${styles.compareSub} ${styles.compareSubDark}`}>
              Exposure that doesn't care what week it is.
            </p>
            <div className={`${styles.barsRow} ${styles.barsRowDark}`}>
              {exposure.map((b, i) => (
                <span key={i} className={styles.exposureBar} style={{ height: b.height, background: b.color }} />
              ))}
            </div>
            <p className={`${styles.compareFoot} ${styles.compareFootDark}`}>
              No interval at all · one of them is already on fire
            </p>
          </div>
        </div>
      </section>

      {/* 4 · The reframe */}
      <section className={styles.quoteSection}>
        <figure className={styles.quoteFigure}>
          <blockquote className={styles.quoteText}>
            <span aria-hidden="true" className={styles.quoteMark}>
              &ldquo;
            </span>
            A calendar is not a threat model.
            <span aria-hidden="true" className={styles.quoteMark}>
              &rdquo;
            </span>
          </blockquote>
        </figure>
      </section>

      <section data-rail="reframe" className={`${styles.rail} ${styles.railReframe}`} style={railStyle(cols.reframe)}>
        <div className={styles.railLabel}>
          <p className={styles.railEyebrow}>The reframe</p>
          <h2 className={styles.railHeading}>Make risk impossible to miss.</h2>
        </div>
        <div data-rail-copy className={styles.railCopy}>
          <p className={styles.railBody}>
            The team didn't want another tool to maintain. They wanted to stop guessing. So the design
            goal became embarrassingly simple to say and genuinely hard to build: make risk impossible
            to miss.
          </p>
          <p className={styles.railBody}>
            Two decisions followed from that, and both were about removing humans from the loop rather
            than adding them to it.
          </p>
        </div>
      </section>

      <section className={styles.decisionsSection}>
        <div className={styles.decisionsGrid}>
          <div className={`${styles.card} ${styles.decisionCard}`}>
            <p className={styles.decisionTitle}>Nobody feeds it.</p>
            <p className={styles.decisionBody}>
              The tool reads directly from the automated security-testing tools the teams were already
              running — static code scan, penetration testing, open-source governance, CI/CD build
              data, training records. Any dashboard that depends on a person remembering to update it
              is just a more expensive way to be out of date.
            </p>
          </div>
          <div className={`${styles.card} ${styles.decisionCard}`}>
            <p className={styles.decisionTitle}>
              It encodes when an assessment is warranted, not just what state things are in.
            </p>
            <p className={styles.decisionBody}>
              That cuts both ways. It pushes genuinely at-risk applications to the front of the line,
              and it gives the team explicit permission to <em className={styles.emItalic}>stop</em>{" "}
              re-checking healthy ones so often. Good prioritization isn't only about what to do next.
              It's about what you're allowed to ignore.
            </p>
          </div>
        </div>
      </section>

      {/* 5 · The interface */}
      <section className={styles.interfaceHead}>
        <p className={styles.interfaceKicker}>The interface, in principle</p>
        <h3 className={styles.interfaceTitle}>One frame. Any signal.</h3>
      </section>

      <section className={styles.interfaceImageSection}>
        <div className={styles.imageFrame}>
          <img
            src={insights}
            alt="Issue Resolution Time: the filters panel narrows eight signals to one question, with the threshold scale and project heatmap beneath."
            className={styles.interfaceImg}
          />
        </div>
      </section>

      <section className={styles.lensesSection}>
        <div className={styles.lensesScroller}>
          {lenses.map((l) => (
            <figure key={l.lens} className={styles.lensFigure}>
              <figcaption className={styles.lensCaption}>{l.lens}</figcaption>
              <div className={styles.lensFrame}>
                <img src={l.src} alt={l.alt} className={styles.lensImg} />
              </div>
            </figure>
          ))}
        </div>
        <p className={styles.lensesNote}>
          The same frame, three signals: resolution time, training coverage, open issues. The rail
          changes the question; the structure holds.
        </p>
      </section>

      {/* 6 · Three moments */}
      <section className={styles.momentsSection}>
        <div className={styles.momentsGrid}>
          {moments.map((m) => (
            <div key={m.title} className={`${styles.card} ${styles.momentCard}`}>
              <p className={styles.momentTitle}>{m.title}</p>
              <p className={styles.momentBody}>{m.body}</p>
              <div className={styles.momentCropBox}>
                <img
                  src={m.src}
                  alt={m.alt}
                  className={styles.momentCropImg}
                  style={{ width: m.width, left: m.left, top: m.top }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7 · What became possible */}
      <section data-rail="possible" className={styles.railPossible} style={railStyle(cols.possible)}>
        <p className={styles.possibleEyebrow}>What became possible</p>
        <div className={styles.possibleContent}>
          <div className={styles.chipsGrid}>
            {chips.map((c) => (
              <div key={c.label}>
                <p className={styles.chipValue}>{c.value}</p>
                <p className={styles.chipLabel}>{c.label}</p>
              </div>
            ))}
          </div>
          <div data-rail-copy className={styles.possibleCopy}>
            <p className={styles.railBody}>
              We delivered a working vision prototype: a transparency layer that lets a security team
              see its own exposure continuously and point limited attention exactly where the evidence
              says it belongs. It reframes the job from{" "}
              <em className={styles.emItalic}>assess everything on a cycle and hope</em> to{" "}
              <em className={styles.emItalic}>assess what the data is flagging</em> — the quiet
              difference between a process that buckles as the application count climbs and one that
              scales with it.
            </p>
            <p className={styles.possibleBodySmall}>
              This was a vision and proof-of-concept engagement. It was not deployed to production
              during my involvement, so there are no adoption figures to report, and I'd rather say
              that than imply otherwise.
            </p>
          </div>
        </div>
      </section>

      {/* 8 · Reflection */}
      <section className={styles.reflectionSection}>
        <div className={styles.reflectionInner}>
          <p className={styles.reflectionEyebrow}>Reflection</p>
          <p className={styles.reflectionBody}>
            The part I'd revisit is the default thresholds. Handing an organization a slider is only
            empowering if they have some basis for where to put it — and a team that already lacked
            visibility is not well positioned to set its own tolerance on day one. Defaults are a
            design decision I treated as a settings problem.
          </p>
          <p className={styles.reflectionBody}>
            The gap I'd close is ownership. The tool is excellent at telling you{" "}
            <em className={styles.emItalic}>which</em> application is on fire and completely silent on{" "}
            <em className={styles.emItalic}>whose</em> it is. Making risk visible turns out to be the
            easier half; routing it to the person who can act is where a transparency layer either
            becomes an operating system or becomes a very well-designed poster.
          </p>
        </div>
      </section>

      {/* Case nav — curated prev/next from the v3 design */}
      <CaseNav
        prevHref="/work/vmc-aesthetics"
        prevTitle="VMC Aesthetics — a clinic rebuilt around one system"
        nextHref="/work/virtual-tryon-component-library"
        nextTitle="Virtual Try-On Component Library — one system, many faces"
      />
    </div>
  );
}
