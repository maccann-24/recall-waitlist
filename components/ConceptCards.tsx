'use client'

import { useEffect, useRef } from 'react'

const concepts = [
  {
    label: 'DAILY \u00B7 RECALL',
    labelColor: '#4A7B9D',
    num: '01',
    heading: (
      <>
        The question
        <br />
        arrives. <em>Sit with it.</em>
      </>
    ),
    headingColor: '#EDE8DF',
    tag: 'EVERY MORNING \u00B7 8AM',
    tagBorder: '#2A4A60',
    tagColor: '#4A7B9D',
    body: (
      <>
        A provocation drawn from the full breadth of human civilization —
        biblical times forward. Power and betrayal. Art and forgery. Science
        suppressed. The moment before something changed forever.
        <br />
        <br />
        You don&rsquo;t answer it. You carry it. The answer arrives the next
        morning as a short story, a modern parallel, and an implication that
        will stay with you.
      </>
    ),
  },
  {
    label: 'WEEKLY \u00B7 RESOLVE',
    labelColor: '#4A7A6A',
    num: '02',
    heading: (
      <>
        Seven cards.
        <br />
        <em style={{ color: '#4A7A6A' }}>One frequency.</em>
      </>
    ),
    headingColor: '#EDE8DF',
    tag: 'EVERY SUNDAY \u00B7 EVENING',
    tagBorder: '#4A7A6A',
    tagColor: '#4A7A6A',
    body: (
      <>
        The week held something beneath its surface. A thread running through
        seven apparently disconnected stories — a shared human impulse, a
        repeated structure, a single question none of them directly asked.
        <br />
        <br />
        Resolve surfaces it. One sentence. The frequency the week was
        broadcasting without announcing itself.
      </>
    ),
  },
  {
    label: 'MONTHLY \u00B7 COHERENCE',
    labelColor: '#C4A35A',
    num: '03',
    heading: (
      <>
        Thirty days.
        <br />
        <em style={{ color: '#C4A35A' }}>Everything coheres.</em>
      </>
    ),
    headingColor: '#EDE8DF',
    tag: 'FIRST OF MONTH \u00B7 THE VAULT',
    tagBorder: '#6B4E1A',
    tagColor: '#C4A35A',
    body: (
      <>
        A directed visual experience — ninety seconds — that reveals the hidden
        connections across all thirty cards. Thematic. Structural. Causal.
        Philosophical.
        <br />
        <br />
        Thirty particles. Each one a story. At the end of the month they
        organize into a constellation. The geometry is derived from the content
        itself. You watch the month cohere in real time.
      </>
    ),
  },
]

export default function ConceptCards() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="concepts-section"
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '720px',
      }}
    >
      {concepts.map((concept, i) => (
        <div
          key={i}
          className="concept-grid reveal"
        >
          <div>
            <p
              style={{
                fontFamily: 'var(--font-poppins), system-ui, sans-serif',
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.38em',
                color: concept.labelColor,
                marginBottom: '24px',
              }}
            >
              {concept.label}
            </p>
            <span
              style={{
                fontSize: 'clamp(80px, 10vw, 140px)',
                fontFamily: 'var(--font-lora), Georgia, serif',
                fontWeight: 400,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                opacity: 0.06,
                color: '#EDE8DF',
                marginBottom: '-20px',
                display: 'block',
              }}
            >
              {concept.num}
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-lora), Georgia, serif',
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 400,
                lineHeight: 1.2,
                color: concept.headingColor,
                marginBottom: '24px',
              }}
            >
              {concept.heading}
            </h2>
            <span
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-poppins), system-ui, sans-serif',
                fontWeight: 300,
                fontSize: '10px',
                letterSpacing: '0.3em',
                padding: '8px 16px',
                border: `1px solid ${concept.tagBorder}`,
                color: concept.tagColor,
              }}
            >
              {concept.tag}
            </span>
          </div>
          <div>
            <p
              style={{
                fontFamily: 'var(--font-lora), Georgia, serif',
                fontSize: '16px',
                lineHeight: 1.9,
                color: 'rgba(237, 232, 223, 0.72)',
              }}
            >
              {concept.body}
            </p>
          </div>
        </div>
      ))}
    </section>
  )
}
