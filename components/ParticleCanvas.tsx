'use client'

import { useEffect, useRef } from 'react'

const CONFIG = {
  count: 52,
  seed: 7,
  dotColor: [74, 123, 157] as const,
  linkColor: [42, 74, 96] as const,
  minOpacity: 0.3,
  maxRadius: 4.0,
  minRadius: 1.8,
  linkDistance: 0.26,
  linkAlpha: 90,
  clusterPos: [0.78, 0.42] as const,
  clusterColor: [196, 163, 90] as const,
  clusterCount: 16,
  // Motion — unhurried, barely perceptible
  driftSpeed: 0.08,        // px per frame — glacial
  clusterBreathRate: 0.0008, // radians per frame for pulse
  clusterBreathDepth: 0.15,  // opacity amplitude
}

function seededRandom(seed: number) {
  let s = seed | 0
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) | 0
    return (s >>> 0) / 4294967296
  }
}

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  r: number
  a: number
  vx: number
  vy: number
  phase: number // for individual breathing
}

interface ClusterDot {
  offsetX: number // relative to cluster center
  offsetY: number
  r: number
  baseAlpha: number
  phase: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<{
    particles: Particle[]
    clusterDots: ClusterDot[]
    clusterLinks: { ox: number; oy: number; baseAlpha: number }[]
    W: number
    H: number
    frame: number
    raf: number
  } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function initState(W: number, H: number) {
      const rng = seededRandom(CONFIG.seed)
      const particles: Particle[] = []

      for (let i = 0; i < CONFIG.count; i++) {
        const x = 0.03 * W + rng() * 0.94 * W
        const y = 0.03 * H + rng() * 0.94 * H
        const angle = rng() * Math.PI * 2
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          r: CONFIG.minRadius + rng() * (CONFIG.maxRadius - CONFIG.minRadius),
          a: CONFIG.minOpacity + rng() * (1 - CONFIG.minOpacity),
          vx: Math.cos(angle) * CONFIG.driftSpeed * (0.5 + rng()),
          vy: Math.sin(angle) * CONFIG.driftSpeed * (0.5 + rng()),
          phase: rng() * Math.PI * 2,
        })
      }

      // Gold cluster
      const rng2 = seededRandom(42)
      const clusterDots: ClusterDot[] = []
      for (let i = 0; i < CONFIG.clusterCount; i++) {
        clusterDots.push({
          offsetX: (rng2() - 0.5) * W * 0.1,
          offsetY: (rng2() - 0.5) * H * 0.1,
          r: 1 + rng2() * 2.8,
          baseAlpha: 0.35 + rng2() * 0.65,
          phase: rng2() * Math.PI * 2,
        })
      }

      const clusterLinks: { ox: number; oy: number; baseAlpha: number }[] = []
      for (let i = 0; i < 12; i++) {
        clusterLinks.push({
          ox: (rng2() - 0.5) * W * 0.1,
          oy: (rng2() - 0.5) * H * 0.1,
          baseAlpha: 0.15 + rng2() * 0.2,
        })
      }

      stateRef.current = { particles, clusterDots, clusterLinks, W, H, frame: 0, raf: 0 }
    }

    function draw() {
      const state = stateRef.current
      if (!state || !ctx) return

      const { particles, clusterDots, clusterLinks, W, H, frame } = state
      ctx.clearRect(0, 0, W, H)

      const t = frame * 0.01 // slow time

      // Update particle positions — glacial drift with soft boundaries
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        // Soft boundary — reverse near edges with dampening
        const margin = 30
        if (p.x < margin) p.vx = Math.abs(p.vx)
        if (p.x > W - margin) p.vx = -Math.abs(p.vx)
        if (p.y < margin) p.vy = Math.abs(p.vy)
        if (p.y > H - margin) p.vy = -Math.abs(p.vy)
      }

      // Draw links — with subtle shimmer
      const maxD = Math.min(W, H) * CONFIG.linkDistance
      const [lr, lg, lb] = CONFIG.linkColor
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxD) {
            const baseAlpha = ((1 - d / maxD) * CONFIG.linkAlpha) / 255
            // Subtle shimmer — links breathe slightly
            const shimmer = 1 + 0.15 * Math.sin(t * 0.8 + i * 0.3 + j * 0.2)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${lr},${lg},${lb},${baseAlpha * shimmer})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Draw gold cluster — with breathing pulse
      const bx = W * CONFIG.clusterPos[0]
      const by = H * CONFIG.clusterPos[1]
      const [cr, cg, cb] = CONFIG.clusterColor
      const breathPhase = frame * CONFIG.clusterBreathRate

      // Cluster glow — soft radial behind the dots
      const glowAlpha = 0.04 + 0.02 * Math.sin(breathPhase * 0.7)
      const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, W * 0.08)
      gradient.addColorStop(0, `rgba(${cr},${cg},${cb},${glowAlpha})`)
      gradient.addColorStop(1, `rgba(${cr},${cg},${cb},0)`)
      ctx.fillStyle = gradient
      ctx.fillRect(bx - W * 0.1, by - H * 0.1, W * 0.2, H * 0.2)

      // Cluster dots — individual breathing
      for (const dot of clusterDots) {
        const pulse = CONFIG.clusterBreathDepth * Math.sin(breathPhase + dot.phase)
        const alpha = Math.max(0.1, Math.min(1, dot.baseAlpha + pulse))
        ctx.beginPath()
        ctx.arc(bx + dot.offsetX, by + dot.offsetY, dot.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
        ctx.fill()
      }

      // Cluster links — subtle pulse
      for (const link of clusterLinks) {
        const pulse = 0.08 * Math.sin(breathPhase * 0.5 + link.ox * 0.01)
        ctx.beginPath()
        ctx.moveTo(bx, by)
        ctx.lineTo(bx + link.ox, by + link.oy)
        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${link.baseAlpha + pulse})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // Draw dots — with individual opacity breathing
      const [dr, dg, db] = CONFIG.dotColor
      for (const p of particles) {
        const breath = 0.08 * Math.sin(t * 0.5 + p.phase)
        const alpha = Math.max(CONFIG.minOpacity, Math.min(1, p.a + breath))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${dr},${dg},${db},${alpha})`
        ctx.fill()
      }

      state.frame++
      state.raf = requestAnimationFrame(draw)
    }

    function resize() {
      const W = (canvas!.width = window.innerWidth)
      const H = (canvas!.height = window.innerHeight)
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.raf)
      }
      initState(W, H)
      draw()
    }

    resize()

    let timer: ReturnType<typeof setTimeout>
    function handleResize() {
      clearTimeout(timer)
      timer = setTimeout(resize, 150)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.raf)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
