import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { parseTheme, THEME_COOKIE } from "@/lib/theme";
import { ThemeControl } from "@/components/theme-control";
import { LandingHeroForm } from "@/components/landing-hero-form";
import { SmoothScroll } from "@/components/smooth-scroll";

export default async function LandingPage() {
  const { userId } = await auth();

  const theme = parseTheme((await cookies()).get(THEME_COOKIE)?.value);

  return (
    <SmoothScroll>
      <div className="landing-page flex min-h-full flex-col">
      {/* ── Sticky header ─────────────────────────────────────── */}
      <header className="landing-header">
        <span className="landing-wordmark">RepoGraph</span>
        <nav className="landing-nav">
          <ThemeControl initial={theme} />
          {userId ? (
            <Link href="/dashboard" className="landing-signin-link">
              Dashboard
            </Link>
          ) : (
            <Link href="/sign-in" className="landing-signin-link">
              Sign in
            </Link>
          )}
        </nav>
      </header>

      <main className="landing-main">
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="landing-hero" aria-labelledby="hero-heading">
          <div className="landing-col">
            <h1 id="hero-heading" className="landing-h1">
              See the shape<br />
              of code you<br />
              didn&apos;t write.
            </h1>
            <p className="landing-lead">
              Paste a public GitHub repository. RepoGraph parses every
              TypeScript and JavaScript file and draws the imports between
              them. Every line on the map is an import it resolved to a real
              file.
            </p>
            <div className="landing-hero-form-wrap">
              <LandingHeroForm />
            </div>
          </div>
          <div className="landing-hero-figure" aria-hidden="true">
            <GraphIllustration />
          </div>
        </section>

        <hr className="landing-rule" />

        {/* ── A map you can ask questions of ────────────────────── */}
        <section className="landing-section landing-section--split" aria-labelledby="questions-heading">
          <div className="landing-section-text">
            <h2 id="questions-heading" className="landing-h2">
              A map you can<br />
              ask questions of.
            </h2>
            <div className="landing-features">
              <div className="landing-feature">
                <h3 className="landing-feature-title">The map</h3>
                <p className="landing-feature-body">
                  Folders are boxes and imports are the lines between them. Open a folder to see its files.
                </p>
              </div>
              <div className="landing-feature">
                <h3 className="landing-feature-title">A file&apos;s neighbours</h3>
                <p className="landing-feature-body">
                  Select a file to see what imports it, — in green, and what it imports, — in amber.
                </p>
              </div>
              <div className="landing-feature">
                <h3 className="landing-feature-title">Blast radius</h3>
                <p className="landing-feature-body">
                  Everything that depends on a file, two imports out, with a count of what lies further.
                </p>
              </div>
              <div className="landing-feature">
                <h3 className="landing-feature-title">Explanations</h3>
                <p className="landing-feature-body">
                  A paragraph on what a file does, written from its source and its real neighbours.
                </p>
              </div>
              <div className="landing-feature">
                <h3 className="landing-feature-title">Questions</h3>
                <p className="landing-feature-body">
                  Ask the repository something. Each lookup it makes is shown as it happens, above the answer.
                </p>
              </div>
            </div>
          </div>
          <div className="landing-section-figure" aria-hidden="true">
            <QuestionsIllustration />
          </div>
        </section>

        <hr className="landing-rule" />

        {/* ── How it works ──────────────────────────────────────── */}
        <section className="landing-section landing-section--full" aria-labelledby="how-heading">
          <h2 id="how-heading" className="landing-h2">How it works</h2>
          <p className="landing-body landing-body--wide">
            The parser decides what&apos;s connected. The AI explains what the parser found and labels files
            no convention could place, but it never adds a line to the map.
          </p>

          <div className="landing-steps">
            <div className="landing-step">
              <div className="landing-step-figure">
                <FetchIllustration />
              </div>
              <h3 className="landing-step-title">
                <span className="landing-step-num">1</span> Fetch
              </h3>
              <p className="landing-step-body">
                The repository is downloaded as one archive, at the commit that was latest when you asked.
                That commit is recorded with the map.
              </p>
            </div>

            <div className="landing-step">
              <div className="landing-step-figure">
                <ParseIllustration />
              </div>
              <h3 className="landing-step-title">
                <span className="landing-step-num">2</span> Parse
              </h3>
              <p className="landing-step-body">
                Every TypeScript and JavaScript file is parsed. Imports, re-exports, dynamic imports
                and require() calls are all read.
              </p>
            </div>

            <div className="landing-step">
              <div className="landing-step-figure">
                <ResolveIllustration />
              </div>
              <h3 className="landing-step-title">
                <span className="landing-step-num">3</span> Resolve
              </h3>
              <p className="landing-step-body">
                Each import is resolved to a file in the repository, through tsconfig paths and workspace
                packages. One that can&apos;t be is reported with the reason.
              </p>
            </div>

            <div className="landing-step">
              <div className="landing-step-figure">
                <DrawIllustration />
              </div>
              <h3 className="landing-step-title">
                <span className="landing-step-num">4</span> Draw
              </h3>
              <p className="landing-step-body">
                The map, the neighbours and the blast radius are arithmetic over that list of edges,
                worked out in your browser.
              </p>
            </div>
          </div>
        </section>

        <hr className="landing-rule" />

        {/* ── Frameworks ────────────────────────────────────────── */}
        <section className="landing-section landing-section--full" aria-labelledby="frameworks-heading">
          <h2 id="frameworks-heading" className="landing-h2">What it understands</h2>
          <p className="landing-body landing-body--wide">
            The parser handles TypeScript and JavaScript with any of these
            module systems and conventions. It reads them as they actually
            appear in the source — not from documentation about what they
            should look like.
          </p>
          <ul className="landing-frameworks">
            {FRAMEWORKS.map((f) => (
              <li key={f.name} className="landing-framework-item">
                <span className="landing-framework-dot" />
                <span className="landing-framework-name">{f.name}</span>
                <span className="landing-framework-note">{f.note}</span>
              </li>
            ))}
          </ul>
        </section>

        <hr className="landing-rule" />

        {/* ── What it doesn't do ────────────────────────────────── */}
        <section className="landing-section landing-section--full" aria-labelledby="limits-heading">
          <h2 id="limits-heading" className="landing-h2">What it deliberately doesn&apos;t do</h2>
          <p className="landing-body landing-body--wide">
            These are design decisions, not gaps. If you want a tool that does
            any of these things, this is not that tool.
          </p>
          <ul className="landing-limits">
            {LIMITS.map((l) => (
              <li key={l.title} className="landing-limit-item">
                <h3 className="landing-limit-title">{l.title}</h3>
                <p className="landing-limit-body">{l.body}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="landing-footer">
        <span className="landing-footer-wordmark">RepoGraph</span>
        <span className="landing-footer-note">
          Dependency maps for public GitHub repositories.
        </span>
      </footer>

      <style>{LANDING_CSS}</style>
    </div>
    </SmoothScroll>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────

const FRAMEWORKS = [
  { name: "TypeScript", note: "ES modules, CommonJS, path aliases, barrel exports" },
  { name: "JavaScript", note: "ESM and CJS; JSX and TSX treated as source files" },
  { name: "Next.js", note: "App Router and Pages Router file conventions" },
  { name: "React", note: "Component and hook files; context and provider patterns" },
  { name: "Node.js", note: "Server-side modules and built-in resolution rules" },
  { name: "Monorepos", note: "Workspace packages resolved across package boundaries" },
];

const LIMITS = [
  {
    title: "It doesn't grade your code",
    body: "There are no scores, no severity ratings, no \"issues found\". The map shows structure. What you make of it is yours.",
  },
  {
    title: "It doesn't guess unresolved imports",
    body: "If an import can't be resolved to a file, it's counted and reported. It is never added to the graph. Absent beats approximate.",
  },
  {
    title: "It doesn't work on private repositories",
    body: "Only public repositories. No OAuth token is stored. Nothing is read that GitHub wouldn't serve to any visitor.",
  },
  {
    title: "It doesn't support non-TypeScript languages",
    body: "Python, Go, Rust, Java — not yet. The parser is built on ts-morph. Adding a language means adding a real parser for it, not a regex.",
  },
];

// ── Illustrations ──────────────────────────────────────────────────────────

// 1. Hero Graph Illustration
function GraphIllustration() {
  return (
    <svg
      viewBox="0 0 540 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="landing-svg"
      aria-hidden="true"
    >
      <defs>
        <filter id="hero-blue-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* ── Connecting Bezier Splines ─────────────────────────── */}
      {/* Subtle background lines */}
      <path
        d="M 135 285 C 190 285, 200 235, 250 210"
        stroke="var(--line)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M 335 170 C 375 170, 380 270, 420 270"
        stroke="var(--line)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Incoming edges from left nodes into central node (Emerald green) */}
      <path
        d="M 135 80 C 185 80, 180 142, 230 142"
        stroke="#22c55e"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 135 205 C 185 205, 185 162, 230 162"
        stroke="#22c55e"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />

      {/* Outgoing edges from central node to right nodes (Golden amber) */}
      <path
        d="M 335 142 C 375 142, 375 92, 420 92"
        stroke="#fbbf24"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 335 160 C 375 160, 380 195, 420 195"
        stroke="#fbbf24"
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
      />

      {/* ── Left-side Nodes ───────────────────────────────────── */}
      {/* Top Left Card */}
      <g transform="translate(30, 58)">
        <rect width="105" height="44" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="12" y="12" width="24" height="4" rx="2" fill="var(--fg-muted)" opacity="0.6" />
        <rect x="12" y="22" width="60" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.3" />
        <rect x="12" y="29" width="40" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.2" />
      </g>

      {/* Middle Left Card */}
      <g transform="translate(25, 172)">
        <rect width="110" height="66" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="12" y="12" width="30" height="4" rx="2" fill="var(--fg-muted)" opacity="0.6" />
        {/* Row 1 with purple badge */}
        <rect x="12" y="24" width="6" height="6" rx="1.5" fill="#c084fc" />
        <rect x="23" y="25.5" width="56" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.45" />
        {/* Row 2 */}
        <rect x="23" y="36" width="48" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.3" />
        {/* Row 3 */}
        <rect x="23" y="46" width="36" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.2" />
      </g>

      {/* Bottom Left Card */}
      <g transform="translate(30, 264)" opacity="0.65">
        <rect width="105" height="42" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="12" y="12" width="22" height="4" rx="2" fill="var(--fg-muted)" opacity="0.4" />
        <rect x="12" y="22" width="52" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.2" />
        <rect x="12" y="29" width="35" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.15" />
      </g>

      {/* ── Central Focal Node ─────────────────────────────────── */}
      <g transform="translate(230, 108)" filter="url(#hero-blue-glow)">
        <rect width="105" height="84" rx="6" fill="var(--raised)" stroke="#3b82f6" strokeWidth="1.75" />
        {/* Card header */}
        <rect x="12" y="12" width="38" height="4.5" rx="2" fill="#60a5fa" opacity="0.8" />
        {/* Active line with purple badge & highlighted code */}
        <rect x="12" y="27" width="6" height="6" rx="1.5" fill="#a855f7" />
        <rect x="23" y="28" width="55" height="4" rx="2" fill="#60a5fa" opacity="0.9" />
        {/* Code lines */}
        <rect x="23" y="40" width="64" height="3.5" rx="1.75" fill="var(--fg-muted)" opacity="0.5" />
        <rect x="23" y="50" width="46" height="3.5" rx="1.75" fill="var(--fg-muted)" opacity="0.4" />
        <rect x="23" y="60" width="52" height="3.5" rx="1.75" fill="var(--fg-muted)" opacity="0.25" />
      </g>

      {/* ── Right-side Nodes ──────────────────────────────────── */}
      {/* Top Right Card */}
      <g transform="translate(420, 60)">
        <rect width="110" height="64" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="12" y="12" width="28" height="4" rx="2" fill="var(--fg-muted)" opacity="0.6" />
        {/* Purple badge line */}
        <rect x="12" y="24" width="6" height="6" rx="1.5" fill="#a855f7" />
        <rect x="23" y="25.5" width="54" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.5" />
        {/* Amber badge line */}
        <rect x="12" y="36" width="6" height="6" rx="1.5" fill="#fb923c" />
        <rect x="23" y="37.5" width="45" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.35" />
        {/* Regular line */}
        <rect x="23" y="48" width="36" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.2" />
      </g>

      {/* Middle Right Card */}
      <g transform="translate(420, 172)">
        <rect width="105" height="46" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="12" y="12" width="24" height="4" rx="2" fill="var(--fg-muted)" opacity="0.6" />
        <rect x="12" y="23" width="58" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.3" />
        <rect x="12" y="31" width="40" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.2" />
      </g>

      {/* Bottom Right Card */}
      <g transform="translate(420, 248)" opacity="0.65">
        <rect width="105" height="44" rx="6" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="12" y="12" width="26" height="4" rx="2" fill="var(--fg-muted)" opacity="0.4" />
        <rect x="12" y="22" width="48" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.25" />
        <rect x="12" y="30" width="34" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.15" />
      </g>
    </svg>
  );
}

// 2. Questions / Blast Radius Illustration
function QuestionsIllustration() {
  return (
    <svg viewBox="0 0 460 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-svg" aria-hidden="true">
      {/* ── Connecting Green Curves (Blast Radius / Incoming Edges) ── */}
      {/* Level 1 into Level 2 */}
      {/* Nodes 1 & 2 -> Mid Node 1 */}
      <path d="M 104 38 C 130 38, 130 58, 155 58" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 104 83 C 130 83, 130 58, 155 58" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Nodes 3 & 4 -> Mid Node 2 */}
      <path d="M 104 153 C 130 153, 130 173, 155 173" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 104 198 C 130 198, 130 173, 155 173" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Node 5 -> Mid Node 3 */}
      <path d="M 104 268 C 130 268, 130 253, 155 253" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Level 2 into Target Node on Right */}
      <path d="M 245 58 C 290 58, 290 158, 325 158" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 245 173 C 285 173, 285 158, 325 158" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 245 253 C 290 253, 290 158, 325 158" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* ── Column 1 (Far Left - 5 Nodes) ────────────────────────── */}
      {/* Node 1: Purple chip */}
      <g transform="translate(20, 25)">
        <rect width="84" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#a855f7" />
        <rect x="18" y="11.5" width="46" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* Node 2: Pink chip */}
      <g transform="translate(20, 70)">
        <rect width="84" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#ec4899" />
        <rect x="18" y="11.5" width="42" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* Node 3: Red chip */}
      <g transform="translate(20, 140)">
        <rect width="84" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#f43f5e" />
        <rect x="18" y="11.5" width="48" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* Node 4: Cyan chip */}
      <g transform="translate(20, 185)">
        <rect width="84" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#06b6d4" />
        <rect x="18" y="11.5" width="40" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* Node 5: Purple chip */}
      <g transform="translate(20, 255)">
        <rect width="84" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#a855f7" />
        <rect x="18" y="11.5" width="44" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* ── Column 2 (Middle - 3 Nodes) ─────────────────────────── */}
      {/* Mid Node 1: Pink chip */}
      <g transform="translate(160, 45)">
        <rect width="85" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#ec4899" />
        <rect x="18" y="11.5" width="46" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* Mid Node 2: Purple chip */}
      <g transform="translate(160, 160)">
        <rect width="85" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#a855f7" />
        <rect x="18" y="11.5" width="42" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* Mid Node 3: Cyan chip */}
      <g transform="translate(160, 240)">
        <rect width="85" height="26" rx="4" fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <rect x="8" y="10" width="6" height="6" rx="1.5" fill="#06b6d4" />
        <rect x="18" y="11.5" width="45" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.6" />
      </g>

      {/* ── Column 3 (Target Node on Far Right) ──────────────────── */}
      <g transform="translate(325, 145)">
        <rect width="102" height="28" rx="4" fill="var(--raised)" stroke="#3b82f6" strokeWidth="1.75" />
        <rect x="10" y="11" width="6" height="6" rx="1.5" fill="#a855f7" />
        <rect x="22" y="12" width="58" height="3.5" rx="1.75" fill="var(--fg)" opacity="0.9" />
      </g>
    </svg>
  );
}

// 3. How It Works Step 1: Fetch Illustration
function FetchIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-step-svg" aria-hidden="true">
      {/* Archive / folder box on left */}
      <rect x="16" y="32" width="56" height="52" rx="6" stroke="var(--line)" strokeWidth="1.25" fill="var(--canvas)" />
      <line x1="16" y1="46" x2="72" y2="46" stroke="var(--line)" strokeWidth="1.25" />

      {/* Connecting line */}
      <line x1="72" y1="58" x2="98" y2="58" stroke="var(--line)" strokeWidth="1.25" />

      {/* Stack of 3 file cards */}
      {/* Back card */}
      <rect x="122" y="20" width="46" height="52" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--canvas)" opacity="0.35" />
      <line x1="122" y1="32" x2="168" y2="32" stroke="var(--line)" strokeWidth="1" opacity="0.35" />

      {/* Middle card */}
      <rect x="112" y="30" width="46" height="52" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--canvas)" opacity="0.6" />
      <line x1="112" y1="42" x2="158" y2="42" stroke="var(--line)" strokeWidth="1" opacity="0.6" />

      {/* Front card */}
      <rect x="102" y="40" width="46" height="52" rx="4" stroke="var(--line)" strokeWidth="1.25" fill="var(--surface)" />
      <line x1="102" y1="52" x2="148" y2="52" stroke="var(--line)" strokeWidth="1.25" />
      <rect x="110" y="62" width="22" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.4" />
      <rect x="110" y="70" width="30" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.25" />
    </svg>
  );
}

// 4. How It Works Step 2: Parse Illustration
function ParseIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-step-svg" aria-hidden="true">
      <rect x="14" y="16" width="172" height="88" rx="6" stroke="var(--line)" strokeWidth="1.25" fill="var(--surface)" />

      {/* 3 yellow dashes on left gutter */}
      <rect x="26" y="32" width="3.5" height="7" rx="1.5" fill="#f59e0b" />
      <rect x="26" y="44" width="3.5" height="7" rx="1.5" fill="#f59e0b" />
      <rect x="26" y="56" width="3.5" height="7" rx="1.5" fill="#f59e0b" />

      {/* Code lines */}
      <rect x="38" y="33.5" width="68" height="4" rx="2" fill="var(--fg)" opacity="0.85" />
      <rect x="38" y="45.5" width="52" height="4" rx="2" fill="var(--fg-muted)" opacity="0.5" />
      <rect x="38" y="57.5" width="84" height="4" rx="2" fill="#93c5fd" opacity="0.85" />

      <rect x="38" y="74" width="42" height="3.5" rx="1.75" fill="var(--fg-muted)" opacity="0.3" />
      <rect x="38" y="83" width="76" height="3.5" rx="1.75" fill="var(--fg-muted)" opacity="0.2" />
    </svg>
  );
}

// 5. How It Works Step 3: Resolve Illustration
function ResolveIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-step-svg" aria-hidden="true">
      {/* Left blue-bordered node */}
      <rect x="16" y="42" width="52" height="34" rx="4" stroke="#3b82f6" strokeWidth="1.75" fill="var(--raised)" />
      <rect x="26" y="56" width="32" height="4" rx="2" fill="var(--fg)" opacity="0.85" />

      {/* Amber curves to right nodes */}
      <path d="M 68 53 C 98 53, 98 28, 126 28" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 68 62 C 98 62, 98 68, 126 68" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Dashed curve to unresolved import */}
      <path d="M 68 66 C 92 68, 96 92, 118 96" stroke="var(--fg-muted)" strokeWidth="1.25" strokeDasharray="3 3" fill="none" opacity="0.6" />

      {/* ✕ symbol */}
      <g transform="translate(122, 92)" stroke="var(--fg-muted)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
        <line x1="0" y1="0" x2="7" y2="7" />
        <line x1="7" y1="0" x2="0" y2="7" />
      </g>

      {/* Top right card */}
      <rect x="126" y="14" width="54" height="26" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--surface)" />
      <rect x="136" y="24" width="34" height="3.5" rx="1.75" fill="var(--fg-muted)" opacity="0.6" />

      {/* Bottom right card */}
      <rect x="126" y="55" width="54" height="26" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--surface)" />
      <rect x="136" y="65" width="34" height="3.5" rx="1.75" fill="var(--fg-muted)" opacity="0.6" />
    </svg>
  );
}

// 6. How It Works Step 4: Draw Illustration
function DrawIllustration() {
  return (
    <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-step-svg" aria-hidden="true">
      {/* Left cards */}
      <rect x="16" y="22" width="46" height="22" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--surface)" />
      <rect x="25" y="31" width="28" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.5" />

      <rect x="16" y="74" width="46" height="22" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--surface)" />
      <rect x="25" y="83" width="28" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.5" />

      {/* Connecting lines into Center card */}
      <line x1="62" y1="33" x2="80" y2="59" stroke="var(--line)" strokeWidth="1.25" />
      <line x1="62" y1="85" x2="80" y2="59" stroke="var(--line)" strokeWidth="1.25" />

      {/* Center card */}
      <rect x="80" y="48" width="46" height="22" rx="4" stroke="var(--line)" strokeWidth="1.25" fill="var(--raised)" />
      <rect x="89" y="57" width="28" height="3" rx="1.5" fill="var(--fg)" opacity="0.8" />

      {/* Connecting lines out of Center card */}
      <line x1="126" y1="59" x2="144" y2="33" stroke="var(--line)" strokeWidth="1.25" />
      <line x1="126" y1="59" x2="144" y2="85" stroke="var(--line)" strokeWidth="1.25" />

      {/* Right cards */}
      <rect x="144" y="22" width="46" height="22" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--surface)" />
      <rect x="153" y="31" width="28" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.5" />

      <rect x="144" y="74" width="46" height="22" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--surface)" />
      <rect x="153" y="83" width="28" height="3" rx="1.5" fill="var(--fg-muted)" opacity="0.5" />
    </svg>
  );
}

// ── Scoped CSS ─────────────────────────────────────────────────────────────

const LANDING_CSS = `
  .landing-page {
    background: var(--canvas);
    color: var(--fg);
  }

  .landing-header {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    padding: 0 1.75rem;
    background: var(--surface);
    border-bottom: 1px solid var(--line);
  }

  .landing-wordmark {
    font-family: var(--font-mono), monospace;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--fg);
  }

  .landing-nav {
    display: flex;
    align-items: center;
    gap: 1.25rem;
  }

  .landing-signin-link {
    font-size: 0.75rem;
    color: var(--fg-muted);
    text-decoration: none;
    transition: color 0.15s;
  }

  .landing-signin-link:hover {
    color: var(--fg);
  }

  .landing-main {
    flex: 1;
    width: 100%;
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .landing-rule {
    border: none;
    border-top: 1px solid var(--line);
    margin: 0;
  }

  /* Hero */
  .landing-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 4rem;
    min-height: calc(100svh - 3.5rem);
    padding: 6rem 0;
  }

  .landing-h1 {
    font-size: clamp(2.5rem, 4.5vw, 3.75rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.08;
    margin: 0 0 1.5rem;
    max-width: 14ch;
    color: var(--fg);
  }

  .landing-lead {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--fg-muted);
    max-width: 48ch;
    margin: 0 0 2rem;
  }

  .landing-hero-form-wrap {
    max-width: 460px;
    width: 100%;
  }

  .landing-hero-figure {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  /* Sections */
  .landing-section {
    padding: 8rem 0;
  }

  .landing-h2 {
    font-size: clamp(1.75rem, 2.75vw, 2.5rem);
    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.1;
    margin: 0 0 1.5rem;
    color: var(--fg);
  }

  .landing-body {
    font-size: 0.9375rem;
    line-height: 1.65;
    color: var(--fg-muted);
    max-width: 48ch;
    margin: 0 0 1rem;
  }

  .landing-body--wide {
    max-width: 68ch;
  }

  .landing-section--split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 5rem;
  }

  .landing-section-figure {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .landing-section--full {
    max-width: 1140px;
  }

  /* Features List (Questions Section) */
  .landing-features {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 2.5rem;
  }

  .landing-feature-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fg);
    margin: 0 0 0.375rem;
    line-height: 1.4;
  }

  .landing-feature-body {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--fg-muted);
    max-width: 44ch;
    margin: 0;
  }

  /* How It Works Steps */
  .landing-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2.5rem;
    margin-top: 4rem;
  }

  .landing-step-figure {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1.5rem;
  }

  .landing-step-svg {
    width: 100%;
    height: 100%;
    max-width: 200px;
  }

  .landing-step-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fg);
    margin: 0 0 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .landing-step-num {
    color: var(--fg-muted);
    font-weight: 500;
  }

  .landing-step-body {
    font-size: 0.8125rem;
    line-height: 1.6;
    color: var(--fg-muted);
    margin: 0;
  }

  /* Frameworks */
  .landing-frameworks {
    list-style: none;
    padding: 0;
    margin: 2.5rem 0 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 0;
  }

  .landing-framework-item {
    display: grid;
    grid-template-columns: 0.75rem 1fr;
    grid-template-rows: auto auto;
    column-gap: 0.75rem;
    padding: 1.25rem 0;
    border-top: 1px solid var(--line);
  }

  .landing-framework-dot {
    grid-row: 1 / 3;
    align-self: start;
    margin-top: 0.35rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0.7;
  }

  .landing-framework-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fg);
    line-height: 1.4;
  }

  .landing-framework-note {
    font-size: 0.8125rem;
    color: var(--fg-muted);
    line-height: 1.5;
  }

  /* Limits */
  .landing-limits {
    list-style: none;
    padding: 0;
    margin: 2.5rem 0 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2.5rem 4rem;
  }

  .landing-limit-title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--fg);
    margin: 0 0 0.5rem;
    line-height: 1.4;
  }

  .landing-limit-body {
    font-size: 0.8125rem;
    line-height: 1.65;
    color: var(--fg-muted);
    max-width: 46ch;
    margin: 0;
  }

  /* SVG */
  .landing-svg {
    width: 100%;
    height: auto;
    max-width: 480px;
  }

  /* Footer */
  .landing-footer {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    border-top: 1px solid var(--line);
    max-width: 1140px;
    margin: 0 auto;
    width: 100%;
  }

  .landing-footer-wordmark {
    font-family: var(--font-mono), monospace;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: var(--fg-muted);
  }

  .landing-footer-note {
    font-size: 0.75rem;
    color: var(--fg-muted);
    opacity: 0.6;
  }

  /* Responsive */
  @media (max-width: 960px) {
    .landing-steps {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem 2rem;
    }
  }

  @media (max-width: 768px) {
    .landing-hero {
      grid-template-columns: 1fr;
      min-height: auto;
      padding: 4rem 0;
      gap: 3rem;
    }

    .landing-hero-figure {
      order: -1;
    }

    .landing-h1 {
      max-width: 100%;
    }

    .landing-section--split {
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    .landing-section {
      padding: 4rem 0;
    }

    .landing-limits {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .landing-steps {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
  }
`;
