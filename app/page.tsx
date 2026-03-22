import ParticleCanvas from '@/components/ParticleCanvas'
import WaitlistForm from '@/components/WaitlistForm'
import LearnMore from '@/components/LearnMore'
import ConceptCards from '@/components/ConceptCards'

export default function Home() {
  return (
    <>
      {/* Gold vertical bar — fixed left */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '4px',
          height: '100vh',
          background: '#C4A35A',
          zIndex: 20,
        }}
      />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Navigation */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: '28px 52px 28px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '13px',
            letterSpacing: '0.35em',
            color: '#C4A35A',
            opacity: 0.9,
            whiteSpace: 'nowrap',
          }}
        >
          RECALL
        </span>
        <div
          style={{
            flex: 1,
            height: '1px',
            background: '#141210',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.22em',
            color: '#2A1A08',
            whiteSpace: 'nowrap',
          }}
        >
          RECALL &middot; RESOLVE &middot; COHERENCE
        </span>
      </nav>

      {/* Hero section */}
      <section
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxWidth: '720px',
        }}
        className="hero-section"
      >
        {/* Eyebrow */}
        <p
          className="hero-eyebrow"
          style={{
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.35em',
            color: '#886030',
            marginBottom: '44px',
          }}
        >
          RECALL &middot; EARLY ACCESS
        </p>

        {/* Headline */}
        <h1
          className="hero-headline"
          style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontSize: 'clamp(52px, 7vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: '#EDE8DF',
            marginBottom: '32px',
          }}
        >
          History doesn&rsquo;t
          <br />
          repeat.{' '}
          <em style={{ fontStyle: 'italic', color: '#C4A35A' }}>
            It coheres.
          </em>
        </h1>

        {/* Tagline */}
        <p
          className="hero-tagline"
          style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '22px',
            color: '#886030',
            marginBottom: '40px',
          }}
        >
          One question. Every morning. The answer arrives tomorrow.
        </p>

        {/* Gold rule */}
        <div
          className="hero-rule"
          style={{
            width: '320px',
            height: '1px',
            background: '#C4A35A',
            marginBottom: '32px',
          }}
        />

        {/* Body paragraph */}
        <p
          className="hero-body"
          style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontSize: '18px',
            lineHeight: 1.8,
            color: 'rgba(237, 232, 223, 0.85)',
            maxWidth: '560px',
            marginBottom: '36px',
          }}
        >
          Recall is a daily practice in pattern recognition. Each morning a
          question arrives — a provocation drawn from history, from the moment a
          king erased his debts overnight, from the forger whose work fooled
          every expert alive. The answer comes the next day. At the end of each
          month, thirty apparently disconnected stories reveal they were never
          disconnected at all.
        </p>

        {/* Learn more */}
        <LearnMore />

        {/* Waitlist form */}
        <div className="hero-form">
          <WaitlistForm />
        </div>
      </section>

      {/* Concept cards section */}
      <ConceptCards />

      {/* Footer */}
      <footer
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '32px 52px',
          borderTop: '1px solid #141210',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="footer-section"
      >
        <span
          style={{
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#2A1A08',
          }}
        >
          RECALL &middot; RESOLVE &middot; COHERENCE
        </span>
        <span
          style={{
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.15em',
            color: '#2A1A08',
          }}
        >
          &copy; 2026 RECALL
        </span>
      </footer>

      {/* Responsive overrides */}
      <style>{`
        .hero-section {
          padding: 140px 52px 100px 80px;
        }
        .concepts-section {
          padding: 0 52px 160px 80px;
        }
        .concept-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          padding: 80px 0;
          border-top: 1px solid #141210;
          align-items: start;
        }
        .concept-grid:last-child {
          border-bottom: 1px solid #141210;
        }
        @media (max-width: 640px) {
          .hero-section {
            padding: 120px 32px 80px 32px;
          }
          .concepts-section {
            padding: 0 32px 100px 32px;
          }
          .concept-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer-section {
            padding: 28px 32px !important;
            flex-direction: column !important;
            gap: 12px;
            text-align: center;
          }
          nav {
            padding: 24px 28px !important;
          }
        }
      `}</style>
    </>
  )
}
