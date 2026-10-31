import { useEffect, useId, useRef, useState } from "react";

// Change this to "/free-seo-plan" if the plan lives on a separate route.
const PLAN_PATH = "/";
const LOGO_SRC = "/images/growupblacklogotransparent.png";
const LINKS = [
  { id: "whats-inside", label: "What’s included" },
  { id: "faq", label: "FAQ" },
];

function Arrow() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 800) close();
    };
    const onOutside = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        close();
    };
    const onFocus = (event: FocusEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      )
        close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    window.addEventListener("hashchange", close);
    document.addEventListener("pointerdown", onOutside);
    document.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", close);
      document.removeEventListener("pointerdown", onOutside);
      document.removeEventListener("focusin", onFocus);
    };
  }, [open]);

  const sectionHref = (id: string) => `${PLAN_PATH}#${id}`;

  return (
    <header ref={headerRef} className="growup-nav">
      <style>{NAV_CSS}</style>
      <div className="growup-nav__inner">
        <a
          href="https://www.seo-growup.com/"
          className="growup-nav__brand"
          aria-label="GrowUp home"
        >
          <img src={LOGO_SRC} alt="GrowUp" width="180" height="48" />
        </a>

        <nav className="growup-nav__desktop" aria-label="Main navigation">
          {LINKS.map(({ id, label }) => (
            <a key={id} href={sectionHref(id)}>
              {label}
            </a>
          ))}
          <a className="growup-nav__cta" href={sectionHref("request-plan")}>
            Get my free plan <Arrow />
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="growup-nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <path d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <nav
        id={menuId}
        className="growup-nav__mobile"
        aria-label="Mobile navigation"
        hidden={!open}
      >
        {LINKS.map(({ id, label }) => (
          <a key={id} href={sectionHref(id)} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="growup-nav__cta"
          href={sectionHref("request-plan")}
          onClick={() => setOpen(false)}
        >
          Get my free plan <Arrow />
        </a>
      </nav>
    </header>
  );
}

const NAV_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&display=swap');
.growup-nav { position:sticky; top:0; z-index:50; background:#052b2d; color:#fff; border-bottom:1px solid #ffffff12; font-family:'Montserrat',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; }
.growup-nav * { box-sizing:border-box; }
.growup-nav a { color:inherit; text-decoration:none; }
.growup-nav a:focus-visible,.growup-nav button:focus-visible { outline:3px solid #81d4c6; outline-offset:5px; }
.growup-nav__inner { width:min(1280px,calc(100% - 96px)); min-height:88px; margin-inline:auto; display:flex; align-items:center; justify-content:space-between; gap:24px; }
.growup-nav__brand { display:inline-flex; align-items:center; flex-shrink:0; }
.growup-nav__brand img { display:block; width:auto; height:43px; max-width:180px; object-fit:contain; }
.growup-nav__desktop { display:flex; align-items:center; gap:34px; font-size:12px; font-weight:600; }
.growup-nav__desktop>a { transition:color .2s,background .2s; }
.growup-nav__desktop>a:hover { color:#abdcd3; }
.growup-nav .growup-nav__cta { display:inline-flex; align-items:center; justify-content:center; gap:17px; min-height:46px; padding:11px 18px; border:1px solid #769c99; border-radius:3px; font-size:12px; font-weight:600; line-height:1.5; color:#fff; }
.growup-nav .growup-nav__cta:hover { background:#ffffff0c; border-color:#abdcd3; }
.growup-nav__toggle { display:none; align-items:center; justify-content:center; width:44px; height:44px; padding:10px; border:1px solid #769c99; border-radius:4px; color:#fff; background:transparent; cursor:pointer; }
.growup-nav__mobile { display:none; }
.growup-nav [hidden] { display:none!important; }
/* Keep in-page destinations below the sticky navigation. */
#whats-inside,#faq,#request-plan { scroll-margin-top:106px; }
@media(min-width:1600px) { .growup-nav__inner { width:min(1340px,calc(100% - 120px)); } }
@media(max-width:1100px) { .growup-nav__inner { width:calc(100% - 64px); } .growup-nav__desktop { gap:21px; } }
@media(max-width:799px) {
  .growup-nav__inner { width:calc(100% - 40px); min-height:76px; }
  .growup-nav__brand img { height:36px; max-width:155px; }
  .growup-nav__desktop { display:none; }
  .growup-nav__toggle { display:inline-flex; }
  .growup-nav__mobile { display:grid; gap:4px; padding:6px 20px 22px; max-height:calc(100dvh - 76px); overflow-y:auto; }
  .growup-nav__mobile>a { padding:13px 4px; border-bottom:1px solid #ffffff15; font-size:13px; font-weight:600; }
  .growup-nav__mobile>a:hover { color:#abdcd3; }
  .growup-nav__mobile .growup-nav__cta { margin-top:12px; padding:13px 18px; }
}
@media(prefers-reduced-motion:reduce) { .growup-nav * { transition:none!important; } }
`;
