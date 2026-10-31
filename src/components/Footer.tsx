export default function Footer() {
  const linkClass =
    "text-[#a9d9d1] transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd9cf]";

  return (
    <footer
      className="text-[#f2fbf9]"
      style={{
        fontFamily:
          "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
        backgroundColor: "#041b1c",
      }}
    >
       <div className="mx-auto w-[calc(100%-40px)] max-w-[1380px] pt-14 md:w-[calc(100%-96px)] lg:pt-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.2fr] lg:gap-12">
          {/* BRAND */}
          <div>
            <a
              href="https://www.seo-growup.com/"
              aria-label="GrowUp homepage"
              className="inline-block rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd9cf]"
            >
              <img
                src="/images/growupblacklogotransparent.png"
                alt="GrowUp"
                width={180}
                height={48}
                className="h-11 w-auto"
                loading="lazy"
              />
            </a>

            <p className="mt-6 max-w-[310px] text-[18px] font-semibold leading-[1.55] tracking-[-0.02em]">
              Clear SEO priorities.
              <br />
              Built around your buyers.
            </p>

            <p className="mt-4 max-w-[310px] text-[14px] leading-[1.8] text-[#a9d9d1]">
              B2B SaaS content, SEO and AI search visibility focused on
              qualified demand and pipeline.
            </p>
          </div>

          {/* THIS PAGE */}
          <nav aria-label="Footer page navigation">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fd9cf]">
              Your free SEO plan
            </h2>

            <ul className="mt-6 space-y-4 text-[14px] leading-[1.6]">
              <li>
                <a href="#whats-inside" className={linkClass}>
                  What’s included
                </a>
              </li>

              <li>
                <a href="#request-plan" className={linkClass}>
                  Request your plan
                </a>
              </li>

              <li>
                <a href="#seo-plan-content" className={linkClass}>
                  Back to the overview
                </a>
              </li>
            </ul>
          </nav>

 

          {/* PAGE-SPECIFIC CTA */}
          <div className="border-t border-[#cdeee8]/15 pt-8 md:border-t-0 md:pt-0 lg:border-l lg:pl-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8fd9cf]">
              Start with a clear plan
            </p>

            <h2 className="mt-5 max-w-[350px] text-[25px] font-bold leading-[1.3] tracking-[-0.025em]">
              Know which pages deserve your team’s time.
            </h2>

            <p className="mt-4 max-w-[350px] text-[14px] leading-[1.8] text-[#a9d9d1]">
              Get a tailored keyword shortlist, recommended pages and
              a proposed 90-day roadmap.
            </p>

            <a
              href="#request-plan"
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-4 rounded-[5px] bg-[#167273] px-5 py-3 text-[13px] font-semibold text-[#fafafa] transition-colors duration-200 hover:bg-[#1b8181] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8fd9cf]"
            >
              Build my free SEO plan

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-[18px] w-[18px] shrink-0"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>

            <p className="mt-3 text-[11px] leading-[1.7] text-[#a9d9d1]">
              Free. Tailored to your business. No obligation.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#cdeee8]/15 py-7 text-[12px] leading-[1.7] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[#a9d9d1]">
            &copy; {new Date().getFullYear()} GrowUp. All rights reserved.
          </p>

          <a
            href="https://www.seo-growup.com/privacy-policy"
            className={linkClass}
          >
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}