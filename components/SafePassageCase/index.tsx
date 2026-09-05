import Link from "next/link";
import CaseNav from "@/components/CaseNav";
import styles from "./SafePassageCase.module.css";

/* Bespoke implementation of Highlight-DSP (Claude Design).

   The generic /work/[slug] template renders most cases; Safe Passage NEMT gets
   this hand-built editorial layout instead, because the case leads with strategy
   documents rather than a gallery. All copy is baked in from the design — this
   case is a fixed narrative, not content-driven, matching SecurityCase.

   The design drives its layout from a JS resize listener (DCLogic.state.w); every
   one of those breakpoints is a plain media query here, so this stays a server
   component. The design's momentsGround="ink" and showDeck=true defaults are baked in.

   Images live in /public/images/work/dine-safe-passage/. An Exhibit with src: null
   falls back to the project's standard labeled placeholder frame, so a missing
   export degrades to a caption rather than a broken image. */

const IMG = "/images/work/dine-safe-passage";

interface Exhibit {
  src: string | null;
  alt: string;
  /** Caption shown under the frame, and inside it while the art is still a placeholder. */
  label: string;
}

const fourFindings: Exhibit = {
  src: `${IMG}/four-findings-infographic.png`,
  alt: "Diligence memo: four findings on the transport claim — regulatory, market, funding, and unit economics, each with its headline finding and supporting figures.",
  label: "Validation memo — the four corrections",
};

const sourcesAndUses: Exhibit = {
  src: `${IMG}/sources-and-uses-v2.png`,
  alt: "Sources and uses, before and after the SAMHSA correction: owner equity and term loan unchanged; the ineligible SAMHSA grant line becomes a tribal subcontract booked as contracted revenue.",
  label: "Sources and uses — before and after the correction",
};

const verificationQueue: Exhibit = {
  src: `${IMG}/verification-queue-infographic.png`,
  alt: "Verification queue on a clipboard, five items ranked by how much the answer moves the model: the billing path flagged VERIFY at number one, two assumptions, two confirmed facts.",
  label: "Verification queue — ranked by what moves the model",
};

const logo: Exhibit = {
  src: `${IMG}/logo.png`,
  alt: "The DINÉ SAFE PASSAGE wordmark in canyon clay: DINÉ set heavy above letterspaced SAFE PASSAGE.",
  label: "Primary lockup",
};

const applicationVan: Exhibit = {
  src: `${IMG}/application.png`,
  alt: "Side view of a cream passenger van with the side door open and a ramp deployed, the DINÉ wordmark in canyon clay on the rear panel.",
  label: "Vehicle livery",
};

const meta = [
  { label: "Role", value: "Brand & Design Strategist" },
  { label: "Engagement", value: "Pre-launch venture · brand foundation" },
  { label: "Team", value: "1 designer, 1 founder" },
  { label: "Client", value: "Safe Passage NEMT" },
  { label: "Year", value: "2026" },
  { label: "Disciplines", value: "Branding, Business Strategy, Design Strategy" },
];

const facts = [
  { k: "Sector", v: "Non-emergency medical transport" },
  { k: "Region", v: "Arizona, New Mexico" },
  { k: "Stage", v: "Pre-launch" },
  { k: "Scope", v: "Brand foundation" },
  { k: "Out of scope", v: "Operations, logistics, product" },
];

/* Six swatches with their own on-color, so the role label stays legible on each. */
const swatches = [
  { role: "Canyon clay", hex: "#C2562F", on: "rgba(255,255,255,.86)" },
  { role: "Desert turquoise", hex: "#1C7C84", on: "rgba(255,255,255,.86)" },
  { role: "Sun gold", hex: "#D9A03C", on: "rgba(28,26,23,.78)" },
  { role: "Sandstone", hex: "#E8DFCF", on: "rgba(28,26,23,.68)" },
  { role: "Basalt", hex: "#2B2A28", on: "rgba(255,255,255,.82)" },
  { role: "Paper", hex: "#F7F4EE", on: "rgba(28,26,23,.62)" },
];

const slides = [
  { file: "dsp-10-deck-01-cover.jpg", alt: "Deck cover: the wordmark over a black-and-white photograph.", cap: "Slide 01 — Leads with the tagline, not the company" },
  { file: "dsp-11-deck-02-problem.jpg", alt: "Deck slide naming the distance between a treatment bed and the person who needs it.", cap: "Slide 02 — Names the distance as the barrier" },
  { file: "dsp-12-deck-03-solution.jpg", alt: "Deck slide: a branded van in a canyon landscape above three commitments.", cap: "Slide 03 — Three promises the vehicle has to keep" },
  { file: "dsp-13-deck-04-competition.jpg", alt: "Deck slide comparing how people get moved today against what this service wins on.", cap: "Slide 04 — Concedes the need is already met badly" },
  { file: "dsp-14-deck-05-business-model.jpg", alt: "Deck slide on a dark canyon wall: how we earn, how we profit, how we repay.", cap: "Slide 05 — The money argument gets its own ground" },
  { file: "dsp-15-deck-06-roadmap.jpg", alt: "Deck slide: roadmap in three steps.", cap: "Slide 06 — Plan reads as sequence, not ambition" },
  { file: "dsp-16-deck-07-ask.jpg", alt: "Deck slide stating the ask and how it is repaid.", cap: "Slide 07 — One number, then the questions it provokes" },
];

const moments = [
  {
    num: "01",
    title: "I killed the client’s best-sounding line.",
    body: "The original framing said no reliable transport solution existed on this corridor. It’s the sentence a founder wants in the deck. It’s also false, and I found four providers already working it, one of them run by the Nation itself. The plan now claims an underserved market rather than an empty one, with a table naming every competitor and the specific gap left open. A lender who catches an inflated market claim stops believing the financial model too, and the financial model was the part worth defending.",
  },
  {
    num: "02",
    title: "Same money, different door.",
    body: "The funding mix counted SAMHSA grant dollars as startup capital. Those grants go to tribes and tribal organizations, not to private LLCs, so a third of the raise was resting on an ineligible source. The fix wasn’t cutting the money. It was moving it: the Nation holds the grant, and transportation is an allowable wraparound service under it, so the same dollars come in as contracted revenue through a subcontract instead of as capital on the sources-and-uses. The raise survived. The structure changed.",
  },
  {
    num: "03",
    title: "Compliance is the product, not the overhead.",
    body: "The instinct with a regulatory burden this heavy is to treat it as cost and minimize the paragraph. I put it in the middle of the plan instead. Because the fraud used this exact route and this exact population, every licensed facility and tribal program on the corridor now needs a transport partner they can defend in an audit. Referral verification against the provider registry, documented medical necessity on every trip, GPS logs reconciled to claims, a written anti-kickback policy. Built deliberately, the scrutiny stops being a tax and starts being the reason someone picks you.",
  },
];

/** An exhibit frame: the real image once exported, otherwise a labeled placeholder. */
function ExhibitFrame({ exhibit, className }: { exhibit: Exhibit; className?: string }) {
  if (exhibit.src) {
    return <img src={exhibit.src} alt={exhibit.alt} loading="lazy" decoding="async" className={className ?? styles.exhibitImg} />;
  }
  return (
    <div className={styles.exhibitPlaceholder} role="img" aria-label={exhibit.alt}>
      <span className={styles.exhibitPlaceholderLabel}>{exhibit.label}</span>
    </div>
  );
}

export default function SafePassageCase() {
  return (
    <div className={styles.page}>
      <article>
        {/* 1 · Cover — type on paper. No artifact above the fold: the only finished
            lockup is under a naming hold. */}
        <header className={styles.cover}>
          <div className={styles.coverInner}>
            <Link href="/work" className={styles.back}>
              &larr; The archive
            </Link>
            <p className={styles.coverKicker}>Safe Passage NEMT &nbsp;·&nbsp; Independent &nbsp;·&nbsp; 2026</p>
            <div className={styles.coverLockup}>
              <h1 className={styles.coverTitle}>
                A brand built <em className={styles.coverTitleAccent}>before</em> the business.
              </h1>
              <div className={styles.coverImage}>
                <ExhibitFrame
                  exhibit={{
                    src: `${IMG}/dsp-00-hero.png`,
                    alt: "Black-and-white photograph: a group crouched over someone on the ground at a trailside, one person supporting their head.",
                    label: "Lead image",
                  }}
                />
              </div>
            </div>
            <p className={styles.coverLede}>
              Non-emergency medical transport for rural people getting to treatment. The first thing it
              needed wasn&rsquo;t logistics. It was a reason to be trusted on sight.
            </p>
          </div>
        </header>

        {/* 2 · Meta strip — identical on every case. Six fields, fixed order. */}
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

        {/* 3 · The situation — prose plus a fact rail that declares the boundary of the work. */}
        <section className={styles.situation}>
          <p className={styles.eyebrow}>The situation</p>
          <div className={styles.situationGrid}>
            <div className={styles.prose}>
              <p className={styles.proseLead}>
                Across Arizona and New Mexico, one of the quietest barriers to getting better is
                embarrassingly literal. You have to get there. Someone decides to go to treatment,
                referred by a facility or reaching out on their own, then has to physically arrive. That
                distance is where the decision can slip away.
              </p>
              <p>
                So the work started early. Before operations, before logistics, before the company was
                fully real, it needed an identity solid enough to build the rest around, and concrete
                enough to raise money against. The brand guidelines were commissioned to support an
                investor pitch. I&rsquo;d rather say that plainly than dress it up. This identity&rsquo;s
                first job was making a company that didn&rsquo;t exist yet legible to the people deciding
                whether to fund it.
              </p>
              <p>
                You can&rsquo;t ask someone at the toughest moment of their life to trust a service that
                carries them hundreds of miles. You also can&rsquo;t ask an investor to fund one.
              </p>
            </div>
            <div className={styles.factRail}>
              {facts.map((f) => (
                <div key={f.k} className={styles.fact}>
                  <p className={styles.factKey}>{f.k}</p>
                  <p className={styles.factValue}>{f.v}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 · The reframe — full-bleed band 1 of 2. */}
        <section>
          <div className={styles.band}>
            <blockquote className={styles.bandQuote}>
              For a pitch where trust is the entire product, the brand isn&rsquo;t decoration. It&rsquo;s
              the first promise the business makes before it can keep any of the others.
            </blockquote>
          </div>
          <div className={styles.section}>
            <div className={styles.prose}>
              <p>
                The usual sequence is operations first and brand later. Get the vans moving, dress it up
                once there&rsquo;s revenue. I argued for the opposite, and not because I like designing
                things. The argument is specific to this sector.
              </p>
              <p>
                A rider here has almost nothing to go on. No app history, no reviews, and no credit from a
                specific and independent community. There&rsquo;s a van, a driver, and whatever the thing
                looks like. For the length of that first ride, the visual system isn&rsquo;t sitting on top
                of the trust. It&rsquo;s the whole supply.
              </p>
              <p>
                So we went brand first while the operational side got worked out in parallel. A logo
                system. A high-desert palette of canyon clay, desert turquoise and sun gold, picked to
                carry place and warmth without ever sounding casual about a serious thing. A typographic
                scale. A named set of real-world applications, specified but not yet produced: vehicle,
                card, uniform, badge, social. And the line the whole brand rests on,{" "}
                <em className={styles.proseAccent}>
                  <strong>safe passage, every mile.</strong>
                </em>
              </p>
              <p>
                One bar governed all of it. Person-first, never stigmatizing. Warm, never flippant.
                Trustworthy at a glance, because a glance is the entire budget.
              </p>
            </div>
          </div>
        </section>

        {/* 5 · The interface — strategy documents lead. Identity is subordinate and late. */}
        <section>
          <div className={styles.sectionFlush}>
            <p className={styles.eyebrow}>The interface</p>
            <p className={styles.proseSingle}>
              The deliverable people expect from a branding engagement is a logo file. The deliverable
              that actually mattered here was a decision packet: a validation memo, a lender-ready
              business plan, a business model canvas, and a sequenced roadmap with stop-work gates in it.
              The brand came after, and it came out of those documents rather than the other way around.
            </p>

            {/* Module A — four findings, diligence memo exhibit */}
            <figure className={styles.figureNarrow}>
              <ExhibitFrame exhibit={fourFindings} />
              <figcaption className={styles.figCaption}>{fourFindings.label}</figcaption>
            </figure>

            <div className={`${styles.prose} ${styles.proseAfterFigure}`}>
              <p>
                The regulatory environment was the big one. Between 2019 and 2023, bad actors defrauded
                Arizona&rsquo;s Medicaid agency of roughly $2.8 billion by billing for fake addiction
                treatment, and the scheme ran on transporting Native people from reservations to
                Phoenix-area facilities. AHCCCS suspended more than 300 providers and froze new NEMT
                enrollment until December 2024. This business is the same shape as the fraud. Same route,
                same population, same billing codes.
              </p>
              <p>
                The market claim was overstated. The original framing said no reliable solution existed on
                this corridor. Four providers already serve it, including the Nation&rsquo;s own program.
                Lenders check that.
              </p>
              <p>
                And the unit economics had a hole in them. Medicaid pays for loaded miles only, which means
                a member has to be in the vehicle. A one-way Phoenix run is around 250 loaded miles and
                roughly $385 in revenue. The empty drive home pays nothing. The whole business turns on
                backhaul, so the financial model carries an explicit loaded-leg ratio with a sensitivity
                table. At the conservative floor with no backhaul, per-vehicle margin goes negative. That
                scenario is printed in the plan instead of buried, because a lender who finds it themselves
                stops trusting the rest of the numbers.
              </p>
            </div>
          </div>

          {/* Module B — funding restructure, typeset as a before/after comparison */}
          <div className={styles.sectionFlush}>
            <figure className={styles.figureWide}>
              <ExhibitFrame exhibit={sourcesAndUses} />
            </figure>
          </div>

          <div className={styles.sectionFlush}>
            <h3 className={styles.subhead}>Then the model changed</h3>
            <div className={styles.prose}>
              <p>
                At a founder meeting on June 20 the plan shifted. Instead of running the long
                reservation-to-Phoenix corridor, the company would anchor on one partnered treatment
                network as its primary client and layer Medicaid and private trips on top of that
                contracted base. The canvas I wrote two days later documents the new model, and every line
                in it is tagged FACT, ASSUMPTION, or VERIFY, with a ranked verification queue at the end
                listing which unknown moves the model most. The billing path sits at number one, because
                that single answer reshapes the entire revenue section.
              </p>
              <p>
                I&rsquo;d rather hand a founder a document that admits what it doesn&rsquo;t know yet than
                one that reads as finished and isn&rsquo;t.
              </p>
            </div>
          </div>

          {/* Module C — verification queue excerpt */}
          <div className={styles.sectionFlushTight}>
            <figure className={styles.figureMid}>
              <ExhibitFrame exhibit={verificationQueue} />
            </figure>
          </div>

          {/* Where the brand fits — subordinate, late, half weight */}
          <div className={styles.sectionFlush}>
            <h3 className={styles.subhead}>Where the brand fits</h3>
            <p className={styles.proseSingle}>
              The brand guidelines exist to serve the pitch. That is stated on the cover of the file
              itself. The palette, the type scale, and the two lockups make a company that doesn&rsquo;t
              operate yet legible to people deciding whether to fund it, which is a narrow job and a real
              one. Five application slots are named and one of them has been produced.
            </p>

            <div className={styles.peerGrid}>
              <figure className={styles.peerFigure}>
                <div className={styles.peerFrame}>
                  <ExhibitFrame exhibit={logo} className={styles.logoImg} />
                  <span className={styles.badgeAccent}>Retired name</span>
                </div>
                <figcaption className={styles.peerCaption}>
                  <p className={styles.peerKicker}>01 — Logo</p>
                  <p className={styles.peerBody}>
                    Primary and reversed lockups, with clear-space and minimum-size rules.
                  </p>
                  <p className={`${styles.peerBody} ${styles.peerBodyMuted}`}>
                    Shown as delivered, under the retired name. Redrawing it waits on a naming decision
                    that belongs to the founder and to the community the name refers to.
                  </p>
                </figcaption>
              </figure>

              <figure className={styles.peerFigure}>
                <div className={`${styles.peerFrame} ${styles.swatchFrame}`}>
                  {swatches.map((s) => (
                    <div key={s.role} className={styles.swatch} style={{ background: s.hex }}>
                      <p className={styles.swatchRole} style={{ color: s.on }}>
                        {s.role}
                      </p>
                      <p className={styles.swatchHex} style={{ color: s.on }}>
                        {s.hex}
                      </p>
                    </div>
                  ))}
                </div>
                <figcaption className={styles.peerCaption}>
                  <p className={styles.peerKicker}>02 — Color</p>
                  <p className={styles.peerBody}>
                    Six swatches with role labels, hex, RGB, usage notes, and a WCAG AA line.
                  </p>
                  <p className={`${styles.peerBody} ${styles.peerBodyMuted}`}>
                    Color was specified as an operating system with rules, not chosen as a mood.
                  </p>
                </figcaption>
              </figure>
            </div>

            {/* Module F — applications: one produced, four still reserved */}
            <figure className={styles.applicationFigure}>
              <div className={styles.applicationPanel}>
                <span className={styles.badgeMuted}>Application</span>
                <ExhibitFrame exhibit={applicationVan} />
              </div>
              <figcaption className={styles.peerCaption}>
                <p className={styles.peerKicker}>03 — Applications</p>
                <p className={styles.applicationBody}>
                  Vehicle livery, rendered. The wrap keeps the mark small and the ramp visible — the van
                  has to read as medical transport, not as a shuttle.
                </p>
                <p className={`${styles.applicationBody} ${styles.peerBodyMuted}`}>
                  One of five named application slots. Business card, uniform, badge, and social are still
                  empty placeholders in the file. This one carries the retired name too.
                </p>
              </figcaption>
            </figure>
          </div>

          {/* Deck module — after the strategy work, at reduced weight */}
          <div className={styles.sectionFlush}>
            <div className={styles.deckHead}>
              <h3 className={styles.subheadInline}>The pitch deck</h3>
              <span className={styles.badgeMuted}>Deck · 7 slides</span>
            </div>
            <p className={styles.proseSingle}>
              The documents are where the argument was made. The deck is where it was delivered. It
              carries the retired wordmark on its cover, which is the naming decision made visible: the
              most finished thing in the project is the thing that has to change.
            </p>
            <div className={styles.deckGrid}>
              {slides.map((s) => (
                <figure key={s.file} className={styles.slideFigure}>
                  <img
                    src={`${IMG}/${s.file}`}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    className={styles.slideImg}
                  />
                  <figcaption className={styles.figCaption}>{s.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          {/* Key design moments — full-bleed band 2 of 2 */}
          <div className={styles.momentsBand}>
            <div className={styles.momentsInner}>
              <p className={styles.eyebrow}>Key design moments</p>
              {moments.map((m) => (
                <div key={m.num} className={styles.moment}>
                  <p className={styles.momentNum}>{m.num}</p>
                  <div>
                    <h4 className={styles.momentTitle}>{m.title}</h4>
                    <p className={styles.momentBody}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 · What became possible — live, unresolved. Body weight only. */}
        <section className={styles.possible}>
          <p className={styles.eyebrow}>What became possible</p>
          <div className={`${styles.prose} ${styles.proseOffset}`}>
            <p>The pitch landed. The deck went out and there are conversations continuing off the back of it.</p>
            <p>
              That&rsquo;s the honest ceiling of what I can claim right now. Nothing is signed, no money
              has moved, and no vehicle has driven anywhere. Every figure in the plan is a projection built
              to make an argument about the future, not a record of anything that happened. I&rsquo;m not
              going to dress a live conversation up as a closed round.
            </p>
            <p>
              What I can point at is why the room stayed. The plan a founder walks in with has its own
              weakest scenario printed inside it, a market claim that survives a five-minute check, a
              funding structure resting on sources the company is actually eligible for, and a compliance
              architecture that answers the first question any regulator on this corridor is going to ask.
              The brand made all of that look like a company instead of an idea. But the reason the numbers
              held up under questioning is that they had already been taken apart once, by me, before
              anyone else got the chance.
            </p>
            <p>
              The four corrections were the deliverable. Three of them would have surfaced later
              regardless, in a lender&rsquo;s diligence or an enrollment denial, which is a considerably
              more expensive room to find out in.
            </p>
          </div>
        </section>

        {/* 7 · Reflection */}
        <section className={styles.reflection}>
          <div className={styles.reflectionInner}>
            <p className={styles.eyebrow}>Reflection</p>
            <div className={`${styles.prose} ${styles.proseOffset}`}>
              <p>
                I was hired to build a brand and spent most of the engagement writing documentation. That
                turned out to be the job. You can&rsquo;t make something look trustworthy on top of a plan
                that a lender will take apart in ten minutes, and the parts of this that will matter most
                to the founder are the four corrections, not the color ramp.
              </p>
              <p>
                It also showed me where design work ends. A brand can make a company legible before it
                exists. It can&rsquo;t make it exist, and it can&rsquo;t fix a funding structure resting on
                a grant the company isn&rsquo;t eligible for. Knowing which problem you&rsquo;re actually
                looking at is most of the value.
              </p>
              <p>
                The name is still open, and it&rsquo;s the right kind of open. The canvas already calls it
                a placeholder. That decision belongs to the founder and to the community the name refers
                to, not to the person who drew the wordmark.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Curated prev/next from the design, rather than the order-based default. */}
      <CaseNav
        prevHref="/work"
        prevKicker="Back to index"
        prevTitle="The full archive — nine problems"
        nextHref="/work/vmc-aesthetics"
        nextTitle="VMC Aesthetics — a clinic rebuilt around one system"
      />
    </div>
  );
}
