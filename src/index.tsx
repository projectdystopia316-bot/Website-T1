import type React from "react";
import type { JSX } from "react";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";

// === CONFIG ===
const ENDPOINT_URL: string | null = null; // safe to keep null for demo/localStorage

// ------------------------------------
// Tiny utilities
// ------------------------------------
function HashLink({ to, className = "", children }: { to: string; className?: string; children: React.ReactNode }) {
  const hash = to.startsWith("#") ? to : `#${to}`;
  return (
    <a
      href={hash}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        try {
          window.location.hash = hash;
        } catch {}
      }}
    >
      {children}
    </a>
  );
}

function scrollToSignup(e?: React.MouseEvent) {
  if (e) e.preventDefault();
  document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ------------------------------------
// Background FX
// ------------------------------------
function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[length:100%_3px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_70%)]" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-purple-600/30 blur-3xl" />
    </div>
  );
}

// ------------------------------------
// Inline Logo (SVG)
// ------------------------------------
function LogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-130 -130 260 260"
      role="img"
      aria-label="DystopiaOS logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="#00FFD1" strokeWidth="6">
        <polygon points="0,-120 103.9,-60 103.9,60 0,120 -103.9,60 -103.9,-60" />
        <polygon points="0,-86.4 74.8,-43.2 74.8,43.2 0,86.4 -74.8,43.2 -74.8,-43.2" strokeWidth="3" />
        <circle cx="0" cy="0" r="10" strokeWidth="4" />
        <line x1="0" y1="0" x2="0" y2="-120" />
        <line x1="0" y1="0" x2="103.9" y2="-60" />
        <line x1="0" y1="0" x2="103.9" y2="60" />
        <line x1="0" y1="0" x2="0" y2="120" />
        <line x1="0" y1="0" x2="-103.9" y2="60" />
        <line x1="0" y1="0" x2="-103.9" y2="-60" />
      </g>
      <g fill="#00FFD1">
        <circle cx="0" cy="-120" r="5" />
        <circle cx="103.9" cy="-60" r="5" />
        <circle cx="103.9" cy="60" r="5" />
        <circle cx="0" cy="120" r="5" />
        <circle cx="-103.9" cy="60" r="5" />
        <circle cx="-103.9" cy="-60" r="5" />
      </g>
    </svg>
  );
}

// ------------------------------------
// Header
// ------------------------------------
function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <HashLink to="#" className="flex items-center gap-2">
          <LogoMark className="h-5 w-5" />
          <span className="font-semibold tracking-wide">DystopiaOS</span>
        </HashLink>
        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-300">
          <HashLink to="#prototypes" className="hover:text-white">Product Prototypes</HashLink>
          <HashLink to="#features" className="hover:text-white">Features</HashLink>
          <HashLink to="#vision" className="hover:text-white">Vision</HashLink>
          <HashLink to="#colony" className="hover:text-white">Colony Logs</HashLink>
          <HashLink to="#swarm" className="hover:text-white">Swarm Portal</HashLink>
          <a href="#signup" className="hover:text-white" onClick={scrollToSignup}>Join</a>
        </nav>
      </div>
    </header>
  );
}

// ------------------------------------
// Hero
// ------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold leading-tight tracking-tight"
        >
          Life in <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-300">Dystopia</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-3 max-w-2xl text-lg text-zinc-300"
        >
          An AI-native operating layer that manages itself — installs repos, resolves conflicts, finds files, and rolls back mistakes.
        </motion.p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href="#signup"
            className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-fuchsia-600 hover:bg-fuchsia-500"
            onClick={scrollToSignup}
          >
            Join the waitlist
          </a>
          <HashLink to="#features" className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold bg-white/5 ring-1 ring-white/10 hover:bg-white/10">Explore features</HashLink>
        </div>
      </div>
    </section>
  );
}

// ------------------------------------
// Features
// ------------------------------------
function Features() {
  const items = [
    { title: "One‑line setup", body: "Turn any GitHub repo into a working environment with a single command." },
    { title: "Conflict‑proof", body: "Declarative devshells + snapshots mean rollbacks are instant and safe." },
    { title: "Semantic search", body: "Ask for intent, not filenames. Find configs, logs, and docs instantly." },
    { title: "Autonomous installs", body: "Complex apps & games handled automatically — launchers, tweaks included." },
  ];

  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold">Core features</h2>
        <p className="mt-2 text-zinc-400 max-w-2xl">DystopiaOS is an AI action engine fused with the system.</p>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.08] transition"
            >
              <h3 className="font-semibold mb-2">{it.title}</h3>
              <p className="text-sm text-zinc-300">{it.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------
// Vision
// ------------------------------------
function Vision() {
  return (
    <section id="vision" className="relative bg-gradient-to-b from-zinc-900/50 to-black/50 rounded-3xl border border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold">Our Vision</h2>
        <p className="mt-3 text-zinc-300 max-w-3xl">
          We’re rebuilding the human–computer pact. The OS should understand intent, plan safely, and manage itself. DystopiaOS embraces uncertainty, validates actions, and keeps receipts for every change.
        </p>
      </div>
    </section>
  );
}

// ------------------------------------
// Product Prototypes (renamed from Test Cases; content unchanged + expanded)
// ------------------------------------
function ProductPrototypes() {
  const cards = [
    // (keep originals — do not modify)
    {
      title: "Find tax returns (3 yrs)",
      lines: [
        { user: true, text: '$ ai find "tax returns from last 3 years"' },
        { text: "Scanning 124,381 files with semantic index…" },
        { success: true, text: "✅ Opening 2024/2023/2022 returns. Created bundle folder: ~/Found/Taxes_3yrs" },
      ],
    },
    {
      title: "Clean downloads (30 days)",
      lines: [
        { user: true, text: '$ ai clean "Downloads older than 30 days"' },
        { success: true, text: "✅ Cleanup complete. Freed 2.3 GB." },
      ],
    },

    // (new, realistic and process-oriented scenarios)
    {
      title: "Bootstrap repo (Python + Node)",
      lines: [
        { user: true, text: '$ ai setup "github.com/acme/xyz"' },
        { text: "Cloning repository… ✔" },
        { text: "Detected: Python 3.11 · Node 20" },
        { text: "Creating Python venv .venv and activating… ✔" },
        { text: "Checking environment variables…" },
        { text: "• GITHUB_TOKEN ✅  • OPENAI_API_KEY ⚠ missing (will prompt when needed)" },
        { text: "Installing Python dependencies: pip install -r requirements.txt" },
        { text: "Resolved version pin conflict: requests 2.31.0 → 2.32.3 (compatible)" },
        { text: "Installing Node dependencies: npm ci" },
        { text: "Running linters & unit tests… ✔" },
        { success: true, text: "✅ Ready. Enter shell: ai shell xyz  ·  Run app: ai run xyz" },
      ],
    },
    {
      title: "Verify cloud creds (AWS CLI)",
      lines: [
        { user: true, text: '$ ai check "cloud creds"' },
        { text: "Reading env: AWS_ACCESS_KEY_ID ✅  AWS_SECRET_ACCESS_KEY ✅  AWS_DEFAULT_REGION ⚠ missing" },
        { text: "Suggest: export AWS_DEFAULT_REGION=us-west-2" },
        { text: "Running: aws sts get-caller-identity" },
        { text: "Account: 123456789012 · User: dev/your-name" },
        { success: true, text: "✅ Credentials valid. Region set to us-west-2 for this session." },
      ],
    },
    {
      title: "GPU setup (CUDA 12.1 + PyTorch)",
      lines: [
        { user: true, text: '$ ai gpu-setup "cuda 12.1 + pytorch"' },
        { text: "Detecting GPU: NVIDIA RTX 3070 · Driver 550.xx" },
        { text: "Verifying CUDA toolkit compatibility… ✔" },
        { text: "Creating isolated env: .venv (Python 3.11)" },
        { text: "Installing: torch torchvision --index-url https://download.pytorch.org/whl/cu121" },
        { text: "Checking: nvidia-smi · nvcc --version · torch.cuda.is_available() = True" },
        { success: true, text: "✅ GPU acceleration enabled. Sample benchmark: 21.3 TFLOPS FP16" },
      ],
    },
    {
      title: "Service env check (.env & secrets)",
      lines: [
        { user: true, text: '$ ai env-check "web service"' },
        { text: "Loading .env, .env.local, shell env…" },
        { text: "Required: DATABASE_URL ✅  REDIS_URL ✅  STRIPE_SECRET_KEY ⚠ missing" },
        { text: "Created .env.template with missing keys and safe defaults." },
        { text: "Added preflight script: npm run prestart → validates env before boot." },
        { success: true, text: "✅ Environment sane. Run: ai start web" },
      ],
    },
    {
      title: "Install game via Steam + Proton",
      lines: [
        { user: true, text: '$ ai game "Hades"' },
        { text: "Steam not detected → installing Steam (flatpak)" },
        { text: "Enabling Proton Experimental…" },
        { text: "Downloading Hades (3.2 GB)…" },
        { text: "Creating desktop entry + controller profile" },
        { success: true, text: "✅ Installed. Launch from Applications → Games → Hades" },
      ],
    },
  ];

  return (
    <section id="prototypes" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold">Product Prototypes</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.div
              key={i}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-black/80 overflow-hidden"
            >
              <div className="px-4 py-2 border-b border-white/10 bg-zinc-900/60">{c.title}</div>
              <div className="p-4 font-mono text-sm leading-relaxed text-zinc-200">
                {c.lines.map((ln, j) => (
                  <div key={j} className={ln.success ? "text-emerald-300" : ln.user ? "text-zinc-100" : "text-zinc-300"}>{ln.text}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------
// Colony Logs (expandable blog preview with guards for missing slugs)
// ------------------------------------

type Post = {
  slug?: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
};

function BlogPreview({ posts }: { posts: Post[] }) {
  const [open, setOpen] = useState<string | null>(null);

  // guard against undefined/null posts
  const safePosts: Array<Post & { _slug: string }> = (posts || []).map((p, idx) => {
    const base = p?.title ? slugify(p.title) : `post-${idx + 1}`;
    const _slug = (p?.slug && String(p.slug).trim()) || base || `post-${idx + 1}`;
    return { ...(p || { title: `Post ${idx + 1}`, date: "", tag: "", excerpt: "" }), _slug };
  });

  const toggle = (slug: string) => setOpen((prev) => (prev === slug ? null : slug));

  const bodyBySlug: Record<string, JSX.Element> = {
    "why-dystopiaos": (
      <article className="prose prose-invert max-w-none">
        <h3 className="mt-0">From Passive UI to Active OS</h3>
        <p>
          Traditional desktops react to clicks. DystopiaOS treats intent as the primary input and
          executes plans safely with receipts (diffs, logs, rollbacks). This turns routine ops—
          installs, cleanups, migrations—into one‑liners you can trust.
        </p>
        <h4>What this unlocks</h4>
        <ul>
          <li>Fewer context switches: one place to ask, plan, and run.</li>
          <li>Determinism by default: reproducible shells, testable changes.</li>
          <li>Human override: every step is inspectable and undoable.</li>
        </ul>
      </article>
    ),
    "mvp-washing-machine": (
      <article className="prose prose-invert max-w-none">
        <h3 className="mt-0">MVP: The Computer Washing Machine</h3>
        <p>
          Press <em>Clean</em> and the system organizes Downloads, deduplicates media, closes zombie
          processes, reclaims space, and verifies updates—with a full preview and one‑click rollback.
        </p>
        <ul>
          <li>Detects and archives installers/ISOs</li>
          <li>Unifies duplicate photos/docs with content hashes</li>
          <li>Summarizes what changed in a human log</li>
        </ul>
      </article>
    ),
    "case-studies": (
      <article className="prose prose-invert max-w-none">
        <h3 className="mt-0">What We Borrow from NeXTSTEP & BeOS</h3>
        <p>
          We adopt strong system services (devtools, search, automation) and a cohesive UX contract.
          Where they couldn’t, we add modern isolation (containers/devshells) and AI planning.
        </p>
        <ul>
          <li>Composable services instead of app silos</li>
          <li>Intents &gt; paths: search and act by description</li>
          <li>Logs & snapshots as first‑class artifacts</li>
        </ul>
      </article>
    ),
  };

  return (
    <section id="colony" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold">Colony Logs</h2>
        <p className="mt-2 text-zinc-300 max-w-3xl">
          Dispatches from the edge — deep dives into our vision, MVP experiments, and lessons from
          history.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {safePosts.slice(0, 3).map((p, idx) => {
            const slug = p._slug || `post-${idx + 1}`;
            const isOpen = open === slug;
            return (
              <div
                key={slug}
                className={cx(
                  "rounded-2xl border border-white/10 bg-white/5 transition",
                  isOpen ? "bg-white/10" : "hover:bg-white/10"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(slug)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5"
                >
                  <div className="text-xs text-zinc-400">{p.date} · {p.tag}</div>
                  <div className="mt-2 font-semibold">{p.title}</div>
                  <div className="mt-3 text-sm text-zinc-400 leading-relaxed">{p.excerpt}</div>
                  <div className="mt-3 text-xs text-fuchsia-400">{isOpen ? "Collapse ↑" : "Expand ↓"}</div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  style={{ overflow: "hidden" }}
                  className="px-5 pb-5"
                >
                  {isOpen && (bodyBySlug[slug] || (
                    <article className="prose prose-invert max-w-none">
                      <p>Full log coming soon.</p>
                    </article>
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------
// Swarm Portal (formerly Community)
// ------------------------------------
function Community() {
  const links = [
    { label: "X / Twitter", href: "https://x.com/", hint: "@yourhandle" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", hint: "Company Page" },
    { label: "GitHub", href: "https://github.com/", hint: "Code & Issues" },
  ];
  return (
    <section id="swarm" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl md:text-3xl font-bold">Swarm Portal</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition block">
              <div className="font-medium">{l.label}</div>
              <div className="text-xs text-zinc-400">{l.hint}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------
// Signup
// ------------------------------------
// Extend ImportMeta type for VITE env support
interface ImportMeta {
  env: {
    VITE_FORMSPREE_ENDPOINT?: string;
    [key: string]: any;
  };
}

console.log("FORMSPREE", (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT);
function Signup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{ type: string; msg?: string } | null>(null);

  const handleSubmit = async (ev: FormEvent) => {
  ev.preventDefault();

  const endpoint = (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT || "";
  console.log("[signup] endpoint:", endpoint);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setStatus({ type: "error", msg: "Please enter a valid email." });
    return;
  }

  setStatus({ type: "loading" });

  try {
    if (endpoint) {
      const fd = new FormData();
      fd.append("email", email);        // required field name for reply-to
      fd.append("_replyto", email);     // optional, also sets reply-to
      fd.append("_subject", "DystopiaOS Waitlist"); // older APIs prefer _subject
      fd.append("source", "dystopiaos");
      fd.append("ts", String(Date.now()));

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      const text = await res.text();
      console.log("[signup] status:", res.status, "body:", text);

      if (!res.ok) throw new Error(`Remote store failed (${res.status})`);
      setStatus({ type: "ok", msg: "You're on the list. Welcome to Dystopia." });
    } else {
      // local demo fallback
      const raw = localStorage.getItem("dystopiaos_waitlist");
      const arr = raw ? JSON.parse(raw) : [];
      if (!arr.includes(email)) arr.push(email);
      localStorage.setItem("dystopiaos_waitlist", JSON.stringify(arr));
      setStatus({ type: "ok", msg: "Signed up locally (demo)." });
    }

    setEmail("");
  } catch (e: any) {
    console.error("[signup] error:", e);
    setStatus({ type: "error", msg: e?.message || "Something went wrong." });
  }
};

  return (
    <section id="signup" className="relative">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-2xl">
          <h3 className="text-xl md:text-2xl font-bold">Join the Waitlist</h3>
          <form onSubmit={handleSubmit} className="mt-6 grid sm:grid-cols-[1fr_auto] gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="w-full rounded-2xl bg-black/60 border border-white/10 px-4 py-3"
            />
            <button type="submit" className="rounded-2xl px-5 py-3 bg-fuchsia-600 hover:bg-fuchsia-500 font-semibold">Get Early Access</button>
          </form>
          {status && (
            <div className={cx(
              "mt-4 text-sm",
              status.type === "error" ? "text-red-400" :
              status.type === "loading" ? "text-zinc-400" :
              "text-emerald-400"
            )}>
              {status.msg || ""}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ------------------------------------
// Footer
// ------------------------------------
function Footer() {
  return (
    <footer className="relative border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-400 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} DystopiaOS. Built for the brave.</p>
        <div className="flex items-center gap-4">
          <HashLink to="#vision" className="hover:text-white">Vision</HashLink>
          <HashLink to="#features" className="hover:text-white">Features</HashLink>
          <HashLink to="#prototypes" className="hover:text-white">Product Prototypes</HashLink>
          <HashLink to="#colony" className="hover:text-white">Colony Logs</HashLink>
          <HashLink to="#swarm" className="hover:text-white">Swarm Portal</HashLink>
          <a href="#signup" className="hover:text-white" onClick={scrollToSignup}>Join</a>
        </div>
      </div>
    </footer>
  );
}

// ------------------------------------
// Main App
// ------------------------------------
export default function DystopiaOS() {
  const posts: Post[] = [
    { slug: "why-dystopiaos", title: "Why DystopiaOS?", date: "Aug 2025", tag: "Vision", excerpt: "The OS should act with you — plan, verify, and roll back, not just wait for clicks." },
    { slug: "mvp-washing-machine", title: "MVP: Washing Machine for Computers", date: "Aug 2025", tag: "MVP", excerpt: "Press one button: the system cleans, organizes, and makes your machine sane again." },
    { slug: "case-studies", title: "Case Studies: NeXTSTEP, BeOS, and Beyond", date: "Aug 2025", tag: "History", excerpt: "What past OS waves got right — and what we’re adapting for an AI‑native world." },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-zinc-100">
      <BackgroundFX />
      <Header />
      <main className="relative z-10">
        <Hero />
        <ProductPrototypes />
        <Features />
        <Vision />
        <BlogPreview posts={posts} />
        <Community />
        <Signup />
      </main>
      <Footer />
    </div>
  );
}
