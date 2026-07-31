import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";

// ─── Palette — Adobe Color "Celeste" ─────────────────────────────────────────
// #4D7A8C  slate teal (primary)
// #DCE6F2  light periwinkle (secondary)
// #BDE8F2  sky cyan (light accent / em on dark)
// #D9A577  warm sand (cta warm accent)
// #0D2028  near-black
// #2E5A6B  deep teal (dark section bg)
// Hero bg: sky gradient #BDE8F2 → #F0F7FA

const NAV_LINKS = [
  { label: "Sobre mí", href: "#about" },
  { label: "Proyectos", href: "#projects" },
  { label: "Habilidades", href: "#skills" },
  { label: "Contacto", href: "#contact" },
];

const SKILLS = [
  {
    category: "UX Research",
    items: [
      "Entrevistas",
      "Benchmarking",
      "Usability Testing",
      "Personas",
      "Journey Maps",
    ],
  },
  {
    category: "Diseño UI",
    items: [
      "Wireframes",
      "Prototipos Hi-Fi",
      "Design Systems",
      "Arquitectura IA",
      "Motion UI",
    ],
  },
  {
    category: "Herramientas",
    items: [
      "Figma",
      "Adobe XD",
      "Adobe Suite",
      "VS Code",
      "Google Analytics",
    ],
  },
  {
    category: "Front-End",
    items: [
      "HTML",
      "CSS",
      "Bootstrap",
      "Accesibilidad WCAG",
      "Diseño Responsivo",
    ],
  },
];

const PROJECTS = [
  {
    id: 1,
    tag: "EdTech",
    title: "Auloria",
    description:
      "Rediseño de interfaz para plataforma educativa. Evaluación heurística, wireframes y prototipo hi-fi que redujo la tasa de abandono en un 40%.",
    methods: ["Heurística", "Wireframes", "Prototipo Hi-Fi"],
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 2,
    tag: "IA · Arquitectura",
    title: "Aula Digital",
    description:
      "Card sorting, site mapping y tree testing para reestructurar la arquitectura de información de una plataforma con +10.000 usuarios activos.",
    methods: ["Card Sorting", "Tree Testing", "Site Map"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
  },
  {
    id: 3,
    tag: "UX Research · Accesibilidad",
    title: "Aula Digital Research",
    description:
      "Investigación centrada en accesibilidad con personas con discapacidad visual. Personas, journey maps y recomendaciones WCAG 2.1 AA.",
    methods: ["Personas", "Journey Map", "WCAG 2.1"],
    img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&h=500&fit=crop&auto=format",
  },
];

const F_SERIF = "'Zilla Slab', serif";
const F_SANS = "'Ubuntu Sans', sans-serif";
const F_MONO = "'Ubuntu Sans Mono', monospace";

// Palette constants
const C = {
  PRIMARY: "#4D7A8C", // slate teal
  PRIMARY_DK: "#2E5A6B", // deep teal (dark section / strip)
  ACCENT_DK: "#3A6275", // slightly darker teal
  NEAR_BLACK: "#0D2028", // near-black for headings
  BODY_DARK: "#1A3540", // body text dark
  MUTED: "#5E8A98", // muted teal
  SECONDARY: "#DCE6F2", // light periwinkle
  SKY: "#BDE8F2", // sky cyan
  BG: "#F0F7FA", // near-white bg
  SAND: "#D9A577", // warm sand — large decorative / glows
  TERRA: "#8C4318", // terracotta — contrast 7:1 on white, used for tags/labels
  WHITE: "#ffffff",
};

const scrollTo = (href: string) =>
  document
    .querySelector(href)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-50px",
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({
  children,
  onDark = false,
}: {
  children: React.ReactNode;
  onDark?: boolean;
}) {
  return (
    <p
      style={{
        fontFamily: F_MONO,
        color: onDark ? "#A8D4E0" : C.PRIMARY,
        fontSize: "0.72rem",
        letterSpacing: "0.2em",
        marginBottom: "1.25rem",
      }}
      className="uppercase"
    >
      {children}
    </p>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const onNav = (href: string) => {
    setOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(240,247,250,0.96)"
          : "rgba(189,232,242,0.72)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid rgba(77,122,140,0.15)`,
      }}
    >
      <nav
        className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            fontFamily: F_SERIF,
            color: C.TERRA,
            fontSize: "1.15rem",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
          aria-label="Volver al inicio"
        >
          CD
        </a>

        <ul
          className="hidden md:flex items-center gap-7"
          role="list"
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => onNav(l.href)}
                style={{
                  fontFamily: F_SANS,
                  color: C.NEAR_BLACK,
                  fontSize: "0.875rem",
                }}
                className="bg-transparent border-none cursor-pointer hover:opacity-50 transition-opacity duration-200"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onNav("#contact");
          }}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: C.PRIMARY,
            color: C.WHITE,
            fontFamily: F_SANS,
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Trabajemos juntos
        </a>

        <button
          className="md:hidden p-2 flex flex-col gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: C.PRIMARY,
                transform:
                  i === 0 && open
                    ? "rotate(45deg) translate(3px,3px)"
                    : i === 2 && open
                      ? "rotate(-45deg) translate(3px,-3px)"
                      : "",
                opacity: i === 1 && open ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      <motion.div
        id="mobile-menu"
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="md:hidden overflow-hidden"
        style={{
          background: "rgba(240,247,250,0.98)",
          backdropFilter: "blur(14px)",
        }}
        aria-hidden={!open}
      >
        <ul
          className="px-5 pb-6 pt-2 flex flex-col gap-1"
          role="list"
        >
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => onNav(l.href)}
                style={{
                  fontFamily: F_SANS,
                  color: C.NEAR_BLACK,
                  fontSize: "1rem",
                }}
                className="w-full text-left bg-transparent border-none cursor-pointer py-2.5"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li className="pt-2">
            <button
              onClick={() => onNav("#contact")}
              className="w-full py-3 rounded-full"
              style={{
                background: C.PRIMARY,
                color: C.WHITE,
                fontFamily: F_SANS,
                fontSize: "0.9rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Trabajemos juntos
            </button>
          </li>
        </ul>
      </motion.div>
    </header>
  );
}

// ─── Hero — sky gradient background ──────────────────────────────────────────

function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{
        background:
          "linear-gradient(175deg, #BDE8F2 0%, #D2EEF6 28%, #E6F5F9 55%, #F0F7FA 100%)",
        paddingTop: "6rem",
        paddingBottom: "3.5rem",
      }}
      aria-label="Presentación"
    >
      {/* Atmospheric depth glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Top-right warm horizon glow — sand */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            right: "-5%",
            width: "60vw",
            maxWidth: "700px",
            aspectRatio: "1",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(217,165,119,0.22) 0%, transparent 68%)",
          }}
        />
        {/* Center atmospheric haze */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "70vw",
            maxWidth: "800px",
            height: "60%",
            background:
              "radial-gradient(ellipse, rgba(189,232,242,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Bottom-left deep teal pool */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-8%",
            width: "40vw",
            maxWidth: "450px",
            aspectRatio: "1",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(77,122,140,0.10) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 flex flex-col gap-10">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          style={{
            fontFamily: F_MONO,
            color: C.PRIMARY,
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
          }}
          className="uppercase"
        >
          Portfolio · UX/UI Designer · 2026
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            fontFamily: F_SERIF,
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
          }}
          aria-label="Diseño que conecta personas con productos"
        >
          <span
            style={{
              display: "block",
              fontSize: "clamp(3.5rem, 15vw, 10.5rem)",
              fontWeight: 700,
              color: C.NEAR_BLACK,
            }}
          >
            Diseño
          </span>
          <span
            style={{
              display: "block",
              fontSize: "clamp(2.8rem, 12vw, 8.5rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: C.PRIMARY,
              lineHeight: 1.05,
              paddingLeft: "clamp(0.8rem, 4vw, 5rem)",
            }}
          >
            que conecta.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.42 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <p
            style={{
              fontFamily: F_SANS,
              color: C.BODY_DARK,
              fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
              lineHeight: 1.65,
              maxWidth: "500px",
              fontWeight: 300,
            }}
          >
            Soy{" "}
            <strong
              style={{ fontWeight: 600, color: C.NEAR_BLACK }}
            >
              Coca Diez
            </strong>
            , Product Designer especializada en UX Research,
            diseño de interfaces y desarrollo front-end. Creo
            productos digitales que las personas realmente
            disfrutan usar.
          </p>

          <div className="flex flex-row sm:flex-col gap-3 sm:items-end shrink-0">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#projects");
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{
                background: C.PRIMARY,
                color: C.WHITE,
                fontFamily: F_SANS,
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
              aria-label="Ver mis proyectos"
            >
              Ver proyectos
              <svg
                width="13"
                height="13"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M1 7h12M7 1l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full transition-all duration-200 active:scale-95"
              style={{
                background: "transparent",
                color: C.TERRA,
                fontFamily: F_SANS,
                fontSize: "0.875rem",
                fontWeight: 500,
                border: `1.5px solid ${C.SAND}`,
              }}
              aria-label="Ir a la sección de contacto"
            >
              Conversemos
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="grid grid-cols-3 gap-4 pt-7"
          style={{
            borderTop: `1px solid rgba(77,122,140,0.18)`,
          }}
          aria-label="Estadísticas"
        >
          {[
            { num: "+15", label: "Proyectos" },
            { num: "3+", label: "Años de experiencia" },
            { num: "AA", label: "WCAG · Accesibilidad" },
          ].map((s) => (
            <div key={s.label}>
              <dt
                style={{
                  fontFamily: F_SERIF,
                  color: C.SAND,
                  fontSize: "clamp(1.5rem, 5vw, 2.8rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {s.num}
              </dt>
              <dd
                style={{
                  fontFamily: F_SANS,
                  color: C.MUTED,
                  fontSize: "0.72rem",
                  marginTop: "5px",
                  letterSpacing: "0.04em",
                }}
              >
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-5 right-5"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut",
          }}
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: `1.5px solid rgba(77,122,140,0.3)` }}
        >
          <div
            className="w-1 h-2 rounded-full"
            style={{ background: C.PRIMARY }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── About — deep teal background ────────────────────────────────────────────

function About() {
  return (
    <section
      id="about"
      className="px-4 sm:px-6 py-20 md:py-28"
      style={{ background: C.PRIMARY }}
      aria-label="Sobre mí"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <FadeIn>
          <SectionLabel onDark>01 — Sobre mí</SectionLabel>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          <FadeIn delay={0.08}>
            <h2
              style={{
                fontFamily: F_SERIF,
                color: C.WHITE,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
              }}
            >
              Donde la empatía{" "}
              <em style={{ fontStyle: "italic", color: C.SKY }}>
                se convierte en interfaz.
              </em>
            </h2>
          </FadeIn>

          <FadeIn delay={0.18} className="flex flex-col gap-5">
            <p
              style={{
                fontFamily: F_SANS,
                color: C.SECONDARY,
                lineHeight: 1.78,
                fontSize: "0.98rem",
              }}
            >
              Soy diseñadora UX/UI con formación sólida en
              investigación de usuarios, diseño de interfaces y
              desarrollo front-end. Mi trabajo integra
              metodología rigurosa con sensibilidad visual para
              crear productos digitales que funcionan <em>y</em>{" "}
              emocionan.
            </p>
            <p
              style={{
                fontFamily: F_SANS,
                color: C.SECONDARY,
                lineHeight: 1.78,
                fontSize: "0.98rem",
              }}
            >
              Trabajo de forma independiente profundizando
              continuamente en metodologías UX/UI. Me interesan
              los equipos donde el diseño tiene un rol claro en
              la experiencia de usuario y en los objetivos del
              negocio.
            </p>

            <div
              className="flex flex-wrap gap-2 pt-1"
              role="list"
              aria-label="Áreas de especialización"
            >
              {[
                "UX Research",
                "Product Design",
                "Front-End",
                "Accesibilidad",
                "Figma",
              ].map((t) => (
                <span
                  key={t}
                  role="listitem"
                  style={{
                    fontFamily: F_SANS,
                    background: "rgba(255,255,255,0.12)",
                    color: C.SECONDARY,
                    fontSize: "0.78rem",
                    padding: "4px 13px",
                    borderRadius: "999px",
                    fontWeight: 500,
                    border: "1px solid rgba(220,230,242,0.25)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 pt-1 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{
                fontFamily: F_SANS,
                color: C.SKY,
                fontSize: "0.9rem",
                fontWeight: 600,
                width: "fit-content",
              }}
              aria-label="Descargar CV de Coca Diez"
            >
              Descargar CV
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7 1v9M3 7l4 4 4-4M1 13h12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Projects — light background ─────────────────────────────────────────────

function Projects() {
  const [active, setActive] = useState<number | null>(null);
  const toggle = (id: number) =>
    setActive((p) => (p === id ? null : id));

  return (
    <section
      id="projects"
      className="px-4 sm:px-6 py-20 md:py-28"
      style={{ background: C.BG }}
      aria-label="Proyectos"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <FadeIn>
          <SectionLabel>02 — Proyectos</SectionLabel>
          <h2
            style={{
              fontFamily: F_SERIF,
              color: C.NEAR_BLACK,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
            }}
          >
            Case Studies{" "}
            <em
              style={{ fontStyle: "italic", color: C.PRIMARY }}
            >
              seleccionados
            </em>
          </h2>
        </FadeIn>

        <div className="flex flex-col gap-3">
          {PROJECTS.map((p, i) => {
            const isOpen = active === p.id;
            return (
              <FadeIn key={p.id} delay={i * 0.07}>
                <article
                  className="rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                  style={{
                    background: C.WHITE,
                    border: isOpen
                      ? `1px solid rgba(77,122,140,0.35)`
                      : `1px solid rgba(77,122,140,0.14)`,
                  }}
                  onClick={() => toggle(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(p.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`${p.title} — ${p.tag}. ${isOpen ? "Contraer" : "Expandir"} detalles`}
                >
                  <div className="flex items-center justify-between gap-4 p-5 md:p-7">
                    <div className="flex items-center gap-4 md:gap-6 min-w-0">
                      <span
                        style={{
                          fontFamily: F_MONO,
                          color: C.TERRA,
                          fontSize: "0.72rem",
                          flexShrink: 0,
                          opacity: 0.7,
                        }}
                        aria-hidden="true"
                      >
                        0{i + 1}
                      </span>
                      <div className="min-w-0">
                        <p
                          style={{
                            fontFamily: F_MONO,
                            color: C.TERRA,
                            fontSize: "0.68rem",
                            letterSpacing: "0.1em",
                            marginBottom: "3px",
                          }}
                          className="uppercase truncate"
                        >
                          {p.tag}
                        </p>
                        <h3
                          style={{
                            fontFamily: F_SERIF,
                            color: C.NEAR_BLACK,
                            fontSize:
                              "clamp(1.1rem, 3.5vw, 1.65rem)",
                            fontWeight: 700,
                            lineHeight: 1.1,
                          }}
                        >
                          {p.title}
                        </h3>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(77,122,140,0.1)",
                        color: C.PRIMARY,
                      }}
                      aria-hidden="true"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M7 1v12M1 7h12"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.32,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 md:px-7 md:pb-8 grid md:grid-cols-2 gap-6">
                      <img
                        src={p.img}
                        alt={`Captura del proyecto ${p.title}`}
                        className="w-full h-48 md:h-52 object-cover rounded-xl"
                        style={{ background: C.SECONDARY }}
                        loading="lazy"
                      />
                      <div className="flex flex-col justify-center gap-4">
                        <p
                          style={{
                            fontFamily: F_SANS,
                            color: C.BODY_DARK,
                            lineHeight: 1.72,
                            fontSize: "0.92rem",
                          }}
                        >
                          {p.description}
                        </p>
                        <div
                          className="flex flex-wrap gap-2"
                          role="list"
                          aria-label="Metodologías aplicadas"
                        >
                          {p.methods.map((m) => (
                            <span
                              key={m}
                              role="listitem"
                              style={{
                                fontFamily: F_MONO,
                                background: C.SECONDARY,
                                color: C.PRIMARY,
                                fontSize: "0.7rem",
                                padding: "4px 10px",
                                borderRadius: "999px",
                                border: `1px solid rgba(77,122,140,0.18)`,
                              }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Skills — deep teal background ───────────────────────────────────────────

function Skills() {
  return (
    <section
      id="skills"
      className="px-4 sm:px-6 py-20 md:py-28"
      style={{ background: C.PRIMARY }}
      aria-label="Habilidades"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <FadeIn>
          <SectionLabel onDark>03 — Habilidades</SectionLabel>
          <h2
            style={{
              fontFamily: F_SERIF,
              color: C.WHITE,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
            }}
          >
            Lo que traigo{" "}
            <em style={{ fontStyle: "italic", color: C.SKY }}>
              al equipo
            </em>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILLS.map((group, i) => (
            <FadeIn key={group.category} delay={i * 0.07}>
              <div
                className="flex flex-col gap-4 p-6 rounded-2xl h-full"
                style={{
                  background: C.WHITE,
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <p
                  style={{
                    fontFamily: F_MONO,
                    color: C.TERRA,
                    fontSize: "0.68rem",
                    letterSpacing: "0.15em",
                  }}
                  className="uppercase"
                >
                  {group.category}
                </p>
                <ul
                  className="flex flex-col gap-2.5"
                  role="list"
                >
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5"
                      style={{
                        fontFamily: F_SANS,
                        color: C.BODY_DARK,
                        fontSize: "0.875rem",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: C.SAND,
                          flexShrink: 0,
                          display: "block",
                        }}
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Process strip */}
        <FadeIn delay={0.28}>
          <div
            className="rounded-2xl p-7 md:p-10"
            style={{ background: C.PRIMARY_DK }}
          >
            <p
              style={{
                fontFamily: F_MONO,
                color: "#A8D4E0",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                marginBottom: "1.5rem",
              }}
              className="uppercase"
            >
              Mi proceso de diseño
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  step: "01",
                  label: "Descubrir",
                  desc: "Research cualitativo y cuantitativo",
                },
                {
                  step: "02",
                  label: "Definir",
                  desc: "Síntesis, personas, journey maps",
                },
                {
                  step: "03",
                  label: "Diseñar",
                  desc: "Wireframes, prototipos, sistema de diseño",
                },
                {
                  step: "04",
                  label: "Entregar",
                  desc: "Handoff, testing e iteración continua",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  className="flex flex-col gap-1"
                >
                  <p
                    style={{
                      fontFamily: F_MONO,
                      color: C.SAND,
                      fontSize: "0.68rem",
                      opacity: 0.85,
                    }}
                  >
                    {s.step}
                  </p>
                  <p
                    style={{
                      fontFamily: F_SERIF,
                      color: C.WHITE,
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      lineHeight: 1.15,
                    }}
                  >
                    {s.label}
                  </p>
                  <p
                    style={{
                      fontFamily: F_SANS,
                      color: C.SECONDARY,
                      fontSize: "0.8rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Contact — light background ───────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("El email no tiene un formato válido.");
      return;
    }
    setError("");
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    fontFamily: F_SANS,
    background: C.WHITE,
    border: `1.5px solid rgba(77,122,140,0.2)`,
    borderRadius: "12px",
    color: C.NEAR_BLACK,
    fontSize: "0.95rem",
    padding: "13px 15px",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: F_SANS,
    color: C.PRIMARY,
    fontSize: "0.8rem",
    display: "block",
    marginBottom: "7px",
    fontWeight: 500,
  };

  return (
    <section
      id="contact"
      className="px-4 sm:px-6 py-20 md:py-28"
      style={{ background: C.BG }}
      aria-label="Contacto"
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <FadeIn>
          <SectionLabel>04 — Contacto</SectionLabel>
          <h2
            style={{
              fontFamily: F_SERIF,
              color: C.NEAR_BLACK,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              fontSize: "clamp(1.9rem, 5vw, 3.2rem)",
              marginBottom: "0.4rem",
            }}
          >
            Empecemos{" "}
            <em
              style={{ fontStyle: "italic", color: C.PRIMARY }}
            >
              algo nuevo.
            </em>
          </h2>
          <p
            style={{
              fontFamily: F_SANS,
              color: C.BODY_DARK,
              fontSize: "1rem",
              lineHeight: 1.65,
            }}
          >
            ¿Tienes un proyecto en mente o quieres conversar
            sobre una oportunidad? Escríbeme.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <FadeIn delay={0.1}>
            <form
              onSubmit={submit}
              className="flex flex-col gap-4"
              noValidate
              aria-label="Formulario de contacto"
            >
              <div>
                <label htmlFor="c-name" style={labelStyle}>
                  Nombre <span aria-hidden="true">*</span>
                </label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor =
                      C.PRIMARY)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(77,122,140,0.2)")
                  }
                  autoComplete="name"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="c-email" style={labelStyle}>
                  Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="tu@email.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor =
                      C.PRIMARY)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(77,122,140,0.2)")
                  }
                  autoComplete="email"
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <label htmlFor="c-msg" style={labelStyle}>
                  Mensaje <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="c-msg"
                  placeholder="Cuéntame sobre tu proyecto o la oportunidad..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  rows={5}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor =
                      C.PRIMARY)
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(77,122,140,0.2)")
                  }
                  required
                  aria-required="true"
                />
              </div>

              {error && (
                <p
                  role="alert"
                  style={{
                    fontFamily: F_SANS,
                    color: "#B91C1C",
                    fontSize: "0.85rem",
                  }}
                >
                  {error}
                </p>
              )}

              {sent ? (
                <div
                  role="status"
                  className="py-3.5 px-4 rounded-xl text-center"
                  style={{
                    background: C.SECONDARY,
                    border: `1px solid rgba(77,122,140,0.2)`,
                  }}
                >
                  <p
                    style={{
                      fontFamily: F_SANS,
                      color: C.PRIMARY,
                      fontSize: "0.95rem",
                      fontWeight: 500,
                    }}
                  >
                    ¡Gracias por escribirme! Te responderé
                    pronto ✦
                  </p>
                </div>
              ) : (
                <button
                  type="submit"
                  className="py-3.5 rounded-full mt-1 transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{
                    background: C.PRIMARY,
                    color: C.WHITE,
                    fontFamily: F_SANS,
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    border: "none",
                  }}
                >
                  Enviar mensaje
                </button>
              )}
            </form>
          </FadeIn>

          <FadeIn delay={0.18} className="flex flex-col gap-7">
            <blockquote
              style={{
                borderLeft: `3px solid ${C.SAND}`,
                paddingLeft: "1.2rem",
              }}
            >
              <p
                style={{
                  fontFamily: F_SERIF,
                  color: C.PRIMARY,
                  fontSize: "1.05rem",
                  fontStyle: "italic",
                  lineHeight: 1.65,
                }}
              >
                "Diseñar es escuchar primero y trazar después."
              </p>
            </blockquote>

            <p
              style={{
                fontFamily: F_SANS,
                color: C.BODY_DARK,
                fontSize: "0.88rem",
                lineHeight: 1.78,
              }}
            >
              Estoy disponible para proyectos freelance,
              colaboraciones y posiciones full-time. Mi
              ubicación es flexible y trabajo de forma remota
              con equipos internacionales.
            </p>

            <div className="flex flex-col gap-2">
              <p
                style={{
                  fontFamily: F_MONO,
                  color: C.PRIMARY,
                  fontSize: "0.68rem",
                  letterSpacing: "0.16em",
                }}
                className="uppercase"
              >
                Disponibilidad
              </p>
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: "#16A34A",
                    boxShadow: "0 0 6px #16A34A",
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontFamily: F_SANS,
                    color: C.NEAR_BLACK,
                    fontSize: "0.9rem",
                  }}
                >
                  Disponible para nuevos proyectos
                </span>
              </div>
            </div>

            <div
              className="pt-5 mt-auto"
              style={{
                borderTop: `1px solid rgba(77,122,140,0.12)`,
              }}
            >
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver perfil de LinkedIn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-200 active:scale-95"
                style={{
                  background: C.SECONDARY,
                  color: C.PRIMARY,
                  border: `1px solid rgba(77,122,140,0.18)`,
                  fontFamily: F_SANS,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="px-4 sm:px-6 py-7"
      style={{
        background: C.SECONDARY,
        borderTop: `1px solid rgba(77,122,140,0.15)`,
      }}
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p
          style={{
            fontFamily: F_SANS,
            color: C.PRIMARY,
            fontSize: "0.8rem",
            fontWeight: 500,
          }}
        >
          © 2026 Coca Diez · Product Designer
        </p>
        <p
          style={{
            fontFamily: F_MONO,
            color: C.MUTED,
            fontSize: "0.7rem",
            letterSpacing: "0.06em",
          }}
        >
          Diseñado con intención. Construido con cuidado.
        </p>
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg"
        style={{
          background: C.PRIMARY,
          color: C.WHITE,
          fontFamily: F_SANS,
          fontSize: "0.875rem",
          fontWeight: 700,
        }}
      >
        Saltar al contenido principal
      </a>
      <Nav />
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}