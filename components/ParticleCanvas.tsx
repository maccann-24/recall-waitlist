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
  r: number
  a: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function draw() {
      const W = canvas!.width
      const H = canvas!.height

      ctx!.clearRect(0, 0, W, H)

      // Generate particles with seeded random
      const rng = seededRandom(CONFIG.seed)
      const particles: Particle[] = []

      for (let i = 0; i < CONFIG.count; i++) {
        particles.push({
          x: 0.03 * W + rng() * 0.94 * W,
          y: 0.03 * H + rng() * 0.94 * H,
          r: CONFIG.minRadius + rng() * (CONFIG.maxRadius - CONFIG.minRadius),
          a: CONFIG.minOpacity + rng() * (1 - CONFIG.minOpacity),
        })
      }

      const maxD = Math.min(W, H) * CONFIG.linkDistance

      // Draw links
      const [lr, lg, lb] = CONFIG.linkColor
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < maxD) {
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(${lr},${lg},${lb},${((1 - d / maxD) * CONFIG.linkAlpha) / 255})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      // Draw gold cluster
      const rng2 = seededRandom(42)
      const bx = W * CONFIG.clusterPos[0]
      const by = H * CONFIG.clusterPos[1]
      const [cr, cg, cb] = CONFIG.clusterColor

      for (let i = 0; i < CONFIG.clusterCount; i++) {
        const cx = bx + (rng2() - 0.5) * W * 0.1
        const cy = by + (rng2() - 0.5) * H * 0.1
        const cr2 = 1 + rng2() * 2.8
        const ca = 0.35 + rng2() * 0.65
        ctx!.beginPath()
        ctx!.arc(cx, cy, cr2, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${cr},${cg},${cb},${ca})`
        ctx!.fill()
      }

      // Draw gold cluster links
      for (let i = 0; i < 12; i++) {
        const lx = bx + (rng2() - 0.5) * W * 0.1
        const ly = by + (rng2() - 0.5) * H * 0.1
        ctx!.beginPath()
        ctx!.moveTo(bx, by)
        ctx!.lineTo(lx, ly)
        ctx!.strokeStyle = `rgba(${cr},${cg},${cb},${0.15 + rng2() * 0.2})`
        ctx!.lineWidth = 0.5
        ctx!.stroke()
      }

      // Draw dots
      const [dr, dg, db] = CONFIG.dotColor
      for (const p of particles) {
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${dr},${dg},${db},${p.a})`
        ctx!.fill()
      }
    }

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
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
