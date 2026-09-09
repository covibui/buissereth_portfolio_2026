import Link from "next/link";
import Hero from "@/components/Hero";
import CaseNav from "@/components/CaseNav";
import styles from "./CookbookCase.module.css";

/* Bespoke implementation of Personal-DBC (Claude Design) — the only personal
   project with a case page. Copy is baked in from the design, matching how
   SecurityCase and SafePassageCase are handled.

   The design's layout comes from a JS resize listener (DCLogic.state.w) with two
   breakpoints, "narrow" at 900px and "tight" at 600px; both are media queries
   here, so this stays a server component. The cover reuses the shared Hero (same
   cursor-reveal treatment as the home page) via its backHref / ledeAside /
   serifAccent props rather than reimplementing the reveal.

   Wireframes and diagrams live in /public/images/personal/del-buico-cookbook/. */

const IMG = "/images/personal/del-buico-cookbook";
const recipePage = `${IMG}/dbc-10-v2-recipe-page.jpg`;
const addRecipe = `${IMG}/dbc-11-v2-add-recipe.jpg`;

/* The design frames each "moment" with an exact pixel crop of a wireframe,
   expressed as a percentage box plus an oversized absolutely-positioned image.
   Values are carried over verbatim. */
const moments = [
  {
    key: "provenance",
    title: "It asks who taught you, before it asks anything else.",
    body: (
      <>
        In v1 authorship was a free-text field called <code className={styles.code}>by</code> that mostly
        held a first name and sometimes held nothing. In v2 it&rsquo;s a provenance line — taught by,
        where, what year, copied out by whom — set in italics under the title where a subtitle would go.
        That isn&rsquo;t metadata housekeeping. &ldquo;From Teresa, Bari, 1958&rdquo; makes it a different
        object, and the only moment you will ever capture that is while somebody is sitting there typing
        it in.
      </>
    ),
    crop: { src: recipePage, ratio: "760 / 253", width: "173.03%", left: "-38.16%", top: "-55.34%" },
    alt: "Crop: the recipe title with its provenance line — from Teresa, Bari, 1958, copied out by Marco.",
  },
  {
    key: "margin-note",
    title: "Free text gets exactly one home and it's called the margin note.",
    body: (
      <>
        The v1 failure was three unbounded boxes. The naïve fix is zero boxes, and that is the worse of
        the two — voice with nowhere legitimate to go forces its way back into the directions and we are
        at v1 again.{" "}
        <em className={styles.emInk}>
          &ldquo;Mom adds a epis at hour two and nobody is allowed to skip this&rdquo;
        </em>{" "}
        is most of the reason to keep the recipe at all. One bounded, clearly labelled field. Structure
        without sterilising it.
      </>
    ),
    crop: { src: recipePage, ratio: "480 / 120", width: "273.96%", left: "-87.50%", top: "-593.33%" },
    alt: "Crop: the NOTE EN MARGE block on the recipe page.",
  },
  {
    key: "card-scan",
    title: "You can photograph the card instead of retyping it.",
    body: (
      <>
        <code className={styles.code}>SCAN DE LA CARTE</code> — &ldquo;upload the handwritten original and
        we will keep it alongside the typed page.&rdquo; The real obstacle to a family archive is that
        nobody will retype an index card, and the real heirloom is the handwriting, not the ratio. This is
        also the only place I&rsquo;d let AI near this thing: transcribe the scan, prefill the fields, make
        a person confirm every one. Assistance at intake, never authority over the record.
      </>
    ),
    crop: { src: addRecipe, ratio: "300 / 130", width: "438.33%", left: "-281.67%", top: "-306.15%" },
    alt: "Crop: the scan-the-card panel on the entry form.",
  },
  {
    key: "new-chapter",
    title: "You can invent a chapter while you're writing.",
    body: (
      <>
        On the entry form the chapter chips end with{" "}
        <code className={styles.code}>+ NOUVEAU CHAPITRE</code>. v1&rsquo;s 24 categories were fixed at
        build time by two people. Letting the person holding the recipe name the shelf it goes on keeps the
        taxonomy the shape of the family rather than the shape of our guess — and it means the form never
        has to turn a recipe away for not fitting.
      </>
    ),
    crop: { src: addRecipe, ratio: "540 / 82", width: "243.52%", left: "-22.22%", top: "-624.39%" },
    alt: "Crop: the chapter chip row, ending in plus new chapter.",
  },
  {
    key: "cooked-by",
    title: "The archive records who cooks it, not just who wrote it.",
    body: (
      <>
        Bottom right of the recipe page:{" "}
        <code className={styles.code}>CUISINÉ PAR — Teresa · Marco · Lena · Gio</code>, and under it,{" "}
        <em className={styles.emInk}>last made 12 May</em>. v1 stored dishes. This stores a practice.
        It&rsquo;s the difference between a document and a log, and it&rsquo;s the field that would tell
        you, years from now, which recipes are actually alive.
      </>
    ),
    crop: { src: recipePage, ratio: "215 / 100", width: "611.63%", left: "-436.28%", top: "-744.00%" },
    alt: "Crop: cuisiné par, four names, and last made 12 May.",
  },
];

const wireframes = [
  {
    file: "dbc-08-v2-home.jpg",
    cap: "The cover spread",
    alt: "Wireframe of the v2 home page: ex libris plate, volume line, and three recent recipes.",
  },
  {
    file: "dbc-09-v2-chapters.jpg",
    cap: "Sommaire",
    alt: "Wireframe of the chapter index: eight numbered chapters with facet filters for season, cook and occasion.",
  },
  {
    file: "dbc-10-v2-recipe-page.jpg",
    cap: "A recipe page",
    alt: "Wireframe of a recipe page: provenance line, quantity scaler, discrete steps, one margin note, pairings and who last cooked it.",
  },
];

export default function CookbookCase() {
  return (
    <div className={styles.page}>
      <article>
        {/* 1 · Cover — the home-page hero treatment, with the cursor reveal. */}
        <Hero
          backHref="/personal"
          backLabel="Off the clock"
          eyebrow="Personal · Del Buico Kitchen · 2025 — 2026"
          headline="Everything worked except the *upkeep.*"
          serifAccent
          size="large"
          lede="A family recipe site that shipped, populated, and then quietly failed — because we didn't design for more pressing need."
          ledeVariant="divider"
          ledeAside={
            <p className={styles.liveLink}>
              <a href="https://delbuico.netlify.app/" target="_blank" rel="noopener noreferrer">
                delbuico.netlify.app
              </a>{" "}
              · password-gated, Sorry, Not Sorry
            </p>
          }
          showReveal
          revealLabel="Del Buico Kitchen"
          revealAlign="left"
        />

        {/* 2 · The situation — label rail, statement, body. */}
        <section className={styles.situation}>
          <p className={styles.railLabel}>The situation</p>
          <h2 className={styles.statement}>It looks polished but hollow.</h2>
          <div className={styles.body}>
            <p>
              My family&rsquo;s hearth is the kitchen. For generations we have been established home chefs,
              trying and sharing love through food. Overtime we have accumulated an abundance of knowledge
              of the culinary arts and recipes and the increasingly unreliable memory of whoever cooked it
              last. Recipes don&rsquo;t live in cookbooks, they live in us.
            </p>
            <p>
              So a friend and I built a solution on a $0 budget: Next.js, Netlify, a git-backed CMS at{" "}
              <code className={styles.code}>/admin</code>, weekends of enthusiasm. And it worked. Fifty-nine
              recipes went in to start. The index page even at mid fidelity is lovely.
            </p>
            <p className={styles.bodyInk}>Then you go one level down.</p>
            <p>
              Twenty-four categories, seven of them holding nothing at all — Breads, Pastries, Sandwiches,
              and, magnificently, Dogs and Cleaning Recipes, both empty, both photographed, both sitting
              there like rooms in a house nobody furnished. Open Meat: eleven recipes, eleven blank pastel
              rectangles. The lovely tiles upstairs are stock photography of somebody else&rsquo;s dinner.
              The moment you reach the family&rsquo;s actual food, the pictures stop.
            </p>
            <p>
              Then open a recipe. The Pernil has a <code className={styles.code}>NOTES</code> field
              containing a second, complete copy of itself that disagrees with the first one — 475°
              falling to 275° for nine hours in the directions, a flat 350° for four to five hours in the
              notes. The ingredients appear twice with different yields. It thanks a woman named Emilee who
              is not related to anybody here. It refers you to &ldquo;the first picture, top of post.&rdquo;
              There is no picture. There is no post.
            </p>
            <p className={styles.bodyInk}>
              Nobody did any of that wrong. That is simply what happens when you hand a person three
              unlabelled text boxes and they have a recipe they&rsquo;d like to keep.
            </p>
          </div>
        </section>

        {/* 3 · The reframe — full-bleed quote band. */}
        <section className={styles.quoteBand}>
          <blockquote className={styles.quote}>
            <span aria-hidden="true" className={styles.quoteMark}>
              &ldquo;
            </span>
            A recipe box survives because someone keeps adding to it. We built something nobody could add
            to.
            <span aria-hidden="true" className={styles.quoteMark}>
              &rdquo;
            </span>
          </blockquote>
        </section>

        {/* 4 · The diagnosis */}
        <section className={styles.diagnosis}>
          <p className={styles.railLabel}>The diagnosis</p>
          <div className={styles.body}>
            <p>
              We had no money, so we took what free tier handed us, and what free tier handed us was a CMS
              with three default fields. Those three fields became the content model. The content model
              became the product. Nobody ever sat down and asked what a recipe actually{" "}
              <em className={styles.emInk}>is</em> — the tooling had already answered, and its answer was
              &ldquo;some text, some more text, and somewhere to put the rest.&rdquo;
            </p>
            <p className={styles.bodyInk}>
              That&rsquo;s a design decision. We just didn&rsquo;t make it. We inherited it and shipped it.
            </p>
            <p>
              <strong className={styles.strongInk}>The failure wasn&rsquo;t storage. It was intake.</strong>{" "}
              The archive holds 59 recipes perfectly well. What it cannot do is take one{" "}
              <em className={styles.emInk}>in</em>. A relative meets a bare password box, then a hot-pink
              screen with the word &ldquo;Decap&rdquo; on it, then three empty text areas with no shape and
              no questions. The path of least resistance from there is to paste an entire blog post in and
              hope, which is precisely what happened, and the evidence is still sitting in my mom&rsquo;s
              pernil recipe.
            </p>
            <p>
              <strong className={styles.strongInk}>
                A blob field accepts a paste. It cannot ask a question.
              </strong>{" "}
              &ldquo;Who taught you this?&rdquo; is the most valuable thing a family archive can possibly
              know, and no free-form textarea will ever ask it. That question has to be a field or it does
              not exist.
            </p>
          </div>
        </section>

        <section className={styles.diagramSection}>
          <figure className={styles.diagram}>
            <img
              src={`${IMG}/dbc-12-content-model.svg`}
              alt="Content model diagram: the shipped v1 record against the proposed v2 record, field by field."
              className={styles.diagramImg}
              loading="lazy"
            />
          </figure>
        </section>

        {/* 5 · The interface */}
        <section className={styles.interface}>
          <div>
            <p className={styles.kicker}>Version two, in principle</p>
            <h3 className={styles.interfaceTitle}>If we go again, we design the form first.</h3>
          </div>
          <div className={styles.bodyTight}>
            <p>
              Version 2 parses. Instead of one generic paste field, it reads a recipe and breaks the
              instructions into ordered steps, so the structure arrives with the recipe instead of being
              asked for afterward.
            </p>
            <p className={styles.bodyInk}>
              Which makes the form the hero here, not the recipe page. A recipe can be four lines or four
              pages, and the form has to hold both without punishing either — enough structure that the
              information comes out parsable, little enough friction that adding one stays something
              you&rsquo;d do on a weeknight. The recipe page is what you get to have{" "}
              <em className={styles.em}>after</em> that works, and last time we did those in precisely the
              wrong order.
            </p>
            <p>
              The look moved too. The first build took its palette from my mother&rsquo;s house; this one
              takes it from <em className={styles.em}>The Joy of Cooking</em>, the oldest cookbook we own,
              with French set here and there the way a traditional cookbook does it.
            </p>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className={styles.formPanel}>
            <img
              src={addRecipe}
              alt="The proposed entry form: title, who taught you, chapter chips, ingredient rows, steps, a photo drop, a scan of the handwritten card, and one margin note field."
              className={styles.formImg}
              loading="lazy"
            />
          </div>
          <div className={styles.formNoteWrap}>
            <p className={styles.note}>Wireframe. Placeholder family, placeholder recipe. Not built.</p>
          </div>
        </section>

        {/* Three wireframes, staggered on wide viewports. */}
        <section className={styles.staggerSection}>
          <div className={styles.stagger}>
            {wireframes.map((w, i) => (
              <figure key={w.file} className={styles[`stag${i + 1}` as keyof typeof styles] as string}>
                <figcaption className={styles.stagCaption}>{w.cap}</figcaption>
                <img src={`${IMG}/${w.file}`} alt={w.alt} className={styles.stagImg} loading="lazy" />
              </figure>
            ))}
          </div>
          <p className={styles.staggerNote}>
            The cover spread, the Sommaire, and a recipe page. Eight chapters where v1 had 24 bins, and
            facets — season, cook, occasion — doing the work the empty categories were doing badly.
            Wireframes, placeholder content, not built.
          </p>
        </section>

        {/* 6 · Five moments — a 12-column offset ladder. */}
        <section className={styles.ladder}>
          {moments.map((m, i) => (
            <div key={m.key} className={styles[`rung${i + 1}` as keyof typeof styles] as string}>
              <p className={styles.momentTitle}>{m.title}</p>
              <p className={styles.momentBody}>{m.body}</p>
              <div className={styles.cropBox} style={{ aspectRatio: m.crop.ratio }}>
                <img
                  src={m.crop.src}
                  alt={m.alt}
                  className={styles.cropImg}
                  style={{ width: m.crop.width, left: m.crop.left, top: m.crop.top }}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
          <p className={styles.ladderNote}>Crops from unbuilt wireframes.</p>
        </section>

        {/* 7 · What became possible */}
        <section className={styles.possible}>
          <div className={styles.possibleBody}>
            <p>
              Fifty-nine recipes from several different location saved onto something with an address. The
              archive exists, What it can&rsquo;t do is grow without me.
            </p>
            <p>
              Intake isn&rsquo;t plumbing you fit once the rooms are drawn. For anything that only stays
              alive by being added to, intake <em className={styles.emInk}>is</em> the product, and every
              other screen is a view onto whatever it managed to collect. Fifty-nine records is small
              enough to trace every consequence of a bad model and big enough that the consequences are
              undeniable.
            </p>
            <p className={styles.bodySmall}>
              The honest scorecard: v1 is live and stalled. v2 is four wireframes and two diagrams,
              unbuilt, possibly permanently. Nothing here was measured, because nobody was measuring —
              it&rsquo;s a family cookbook, not a product, and there is no version of this where I put a
              conversion rate on a pork shoulder.
            </p>
            <p className={styles.bodyInk}>
              And it was, for the record, an enormous amount of fun. The failure cost nothing,
              nobody&rsquo;s job depended on it, and I came out the other side with a genuine
              content-modelling education and a very good recipe for pernil.
            </p>
          </div>
          <div className={styles.possibleLabel}>
            <p className={styles.railLabelPlain}>What became possible</p>
            <p className={styles.ghostNumeral}>59</p>
            <p className={styles.note}>Recipes in the live archive, counted 23 Aug 2026</p>
          </div>
        </section>

        <section className={styles.diagramSection}>
          <figure className={styles.diagram}>
            <img
              src={`${IMG}/dbc-13-v2-architecture.svg`}
              alt="Proposed v2 architecture: who contributes, how it gets in, where it lives, how it comes out, and the free-tier rule underneath."
              className={styles.diagramImg}
              loading="lazy"
            />
          </figure>
        </section>

        {/* 8 · Reflection — off-center, columns 4–10. */}
        <section className={styles.reflection}>
          <p className={styles.reflectionLabel}>Reflection</p>
          <div className={styles.reflectionBody}>
            <p className={styles.bodyInk}>
              The mistake, named plainly: we picked the stack before we described the object. Free tier
              isn&rsquo;t the villain here. The villain is that a free-tier default became a content model
              by inheritance and nobody noticed, because a CMS with three text boxes looks like
              flexibility. It isn&rsquo;t. It&rsquo;s an absence of opinion, handed to people who came to it
              precisely because they don&rsquo;t have one either.
            </p>
            <p className={styles.bodyInk}>
              What I&rsquo;d do differently is smaller and more annoying than a redesign: write one recipe
              by hand, in the schema, on paper, before building anything. Ten minutes with the Pernil would
              have surfaced every problem on this page. A model that can&rsquo;t hold your hardest existing
              record isn&rsquo;t a model — and the hardest record is always the one your loudest relative
              wrote.
            </p>
            <p className={styles.bodyInk}>
              The gap I still haven&rsquo;t closed is the exit. This thing exists because paper failed, and
              we replaced it with something that fails differently: a domain that lapses, a platform that
              changes its terms, an account two people can get into. &ldquo;Print the book&rdquo; sits in
              the v2 architecture as a dashed box, which is a polite way of saying I haven&rsquo;t done it.
              Until it&rsquo;s solid, this is a better-looking single point of failure than the drawer was.
            </p>
            <Link href="/personal" className={styles.backLink}>
              &larr; Off the clock
            </Link>
          </div>
        </section>
      </article>

      <CaseNav
        prevHref="/personal"
        prevKicker="Off the clock"
        prevTitle="Every personal project, in one place"
        nextHref="/work"
        nextKicker="The work"
        nextTitle="Client and product case studies"
      />
    </div>
  );
}
