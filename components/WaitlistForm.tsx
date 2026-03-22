'use client'

import { useState, useRef } from 'react'

type FormState = 'default' | 'loading' | 'success' | 'error'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default function WaitlistForm() {
  const [state, setState] = useState<FormState>('default')
  const [email, setEmail] = useState('')
  const [fadeOut, setFadeOut] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit() {
    if (state === 'loading') return

    const trimmed = email.trim()
    if (!isValidEmail(trimmed)) {
      setState('error')
      return
    }

    setState('loading')

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      })

      if (!res.ok) throw new Error('Server error')

      // Fade out form, then show success
      setFadeOut(true)
      setTimeout(() => setState('success'), 300)
    } catch {
      setState('error')
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  if (state === 'success') {
    return (
      <div className="success-msg">
        <p
          style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontSize: '24px',
            fontWeight: 400,
            color: '#EDE8DF',
            marginBottom: '12px',
          }}
        >
          You&rsquo;re on the list.
        </p>
        <p
          style={{
            fontFamily: 'var(--font-lora), Georgia, serif',
            fontStyle: 'italic',
            fontSize: '17px',
            color: '#886030',
            lineHeight: 1.7,
          }}
        >
          The first question arrives when the app is ready.
          <br />
          Until then — follow{' '}
          <span style={{ color: '#C4A35A' }}>@recallapp</span> on X.
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        transition: 'opacity 300ms ease',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          maxWidth: '520px',
        }}
      >
        <input
          ref={inputRef}
          type="email"
          placeholder="Your email address"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state === 'error') setState('default')
          }}
          onKeyDown={handleKeyDown}
          disabled={state === 'loading'}
          className="email-input-glow"
          style={{
            flex: 1,
            minWidth: '240px',
            background: 'transparent',
            border: '1px solid #2A1A08',
            color: '#EDE8DF',
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '14px',
            padding: '16px 20px',
            outline: 'none',
            transition: 'border-color 200ms ease, box-shadow 400ms ease',
            borderRadius: 0,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#C4A35A'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#2A1A08'
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={state === 'loading'}
          className="waitlist-btn"
          style={{
            background: 'transparent',
            border: '1px solid #C4A35A',
            color: '#C4A35A',
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '12px',
            letterSpacing: '0.2em',
            padding: '16px 32px',
            cursor: state === 'loading' ? 'not-allowed' : 'pointer',
            transition: 'color 300ms ease',
            whiteSpace: 'nowrap',
            opacity: state === 'loading' ? 0.5 : 1,
            borderRadius: 0,
          }}
        >
          <span>{state === 'loading' ? '...' : 'JOIN THE WAITLIST'}</span>
        </button>
      </div>
      {state === 'error' && (
        <p
          style={{
            fontFamily: 'var(--font-poppins), system-ui, sans-serif',
            fontWeight: 300,
            fontSize: '13px',
            color: '#886030',
            fontStyle: 'italic',
            marginTop: '12px',
            animation: 'fadeUp 0.3s ease both',
          }}
        >
          Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}
