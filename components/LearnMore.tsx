'use client'

import { useState } from 'react'

export default function LearnMore() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="hero-trigger"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          fontFamily: 'var(--font-lora), Georgia, serif',
          fontStyle: 'italic',
          fontSize: '16px',
          color: '#886030',
          cursor: 'pointer',
          marginBottom: '52px',
          border: 'none',
          background: 'none',
          padding: 0,
          transition: 'color 200ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#C4A35A'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#886030'
        }}
      >
        What is Recall exactly?{' '}
        <span
          style={{
            fontStyle: 'normal',
            fontSize: '14px',
            transition: 'transform 300ms ease',
            display: 'inline-block',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ↓
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? '2000px' : '0',
          overflow: 'hidden',
          opacity: open ? 1 : 0,
          transition: 'max-height 400ms ease, opacity 400ms ease',
          marginBottom: open ? '52px' : '0',
        }}
      >
        {/* Section: Daily Recall */}
        <div
          style={{
            padding: '40px 0',
            borderTop: '1px solid #141210',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-poppins), system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.38em',
              color: '#4A7B9D',
              marginBottom: '20px',
            }}
          >
            DAILY &middot; RECALL
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#C4A35A',
              marginBottom: '20px',
            }}
          />
          <h3
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#EDE8DF',
              marginBottom: '20px',
            }}
          >
            Every morning, a question.
            <br />
            The answer arrives tomorrow.
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#484030',
              maxWidth: '560px',
            }}
          >
            The question is not trivia. It is a provocation — a moment in history
            where the obvious explanation turns out to be wrong, where the real
            driver was something everyone overlooked. You sit with it for
            twenty-four hours. The next morning the answer arrives as a short
            story, drawing a parallel to something you&rsquo;d recognize today.
            The chain never breaks.
          </p>
        </div>

        {/* Section: Weekly Resolve */}
        <div
          style={{
            padding: '40px 0',
            borderTop: '1px solid #141210',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-poppins), system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.38em',
              color: '#4A7A6A',
              marginBottom: '20px',
            }}
          >
            WEEKLY &middot; RESOLVE
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#C4A35A',
              marginBottom: '20px',
            }}
          />
          <h3
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#4A7A6A',
              marginBottom: '20px',
            }}
          >
            Seven cards. One thread.
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#484030',
              maxWidth: '560px',
            }}
          >
            Every Sunday evening, a single sentence surfaces — the hidden thread
            running beneath that week&rsquo;s seven cards. Something they shared
            that wasn&rsquo;t visible at the level of individual questions. Not a
            summary. A frequency. The week held one signal. Resolve names it.
          </p>
        </div>

        {/* Section: Monthly Coherence */}
        <div
          style={{
            padding: '40px 0',
            borderTop: '1px solid #141210',
            borderBottom: '1px solid #141210',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-poppins), system-ui, sans-serif',
              fontWeight: 300,
              fontSize: '10px',
              letterSpacing: '0.38em',
              color: '#C4A35A',
              marginBottom: '20px',
            }}
          >
            MONTHLY &middot; COHERENCE
          </p>
          <div
            style={{
              width: '100%',
              height: '1px',
              background: '#C4A35A',
              marginBottom: '20px',
            }}
          />
          <h3
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 400,
              lineHeight: 1.3,
              color: '#C4A35A',
              marginBottom: '20px',
            }}
          >
            Thirty days. Four lenses.
            <br />
            Everything coheres.
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-lora), Georgia, serif',
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#484030',
              maxWidth: '560px',
            }}
          >
            At the end of each month, a directed experience reveals the hidden
            connections across all thirty cards — thematic, structural, causal,
            philosophical. The stories that arrived feeling disconnected are shown
            to have been circling the same truth from thirty different angles.
            You didn&rsquo;t see it coming. That was the point.
          </p>
        </div>
      </div>
    </div>
  )
}
