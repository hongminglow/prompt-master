import { Container } from '../components/Container'
import { Divider } from '../components/Divider'
import { landing } from '../content/landing'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="pb-12">
      <Container>
        <Divider className="mb-10" />
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-[13px] font-medium tracking-[0.18em] text-[color:var(--text)]">
              {landing.brand.name}
            </div>
            <p className="mt-2 text-[13px] text-[color:var(--muted-2)]">
              {landing.brand.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {landing.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-[color:var(--muted)] transition-colors hover:text-[color:var(--text)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <p className="mt-10 text-[12px] text-[color:var(--muted-2)]">
          © {year} {landing.brand.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}

