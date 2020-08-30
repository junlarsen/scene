import React, { useEffect, useRef } from 'react'
import useAudioFeed from '../hooks/useAudioFeed'
import { TweenMax } from 'gsap'

// TODO: Refactor into React state
const barConfiguration = {
  height: 450,
  spacing: 4,
  color: '#22AED1'
}

const peaks = {
  total: { value: 0 },
  left: { value: 0 },
  right: { value: 0 }
}

const stream: { value: number }[] = []

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const onTick = (canvas: HTMLCanvasElement) => {
    const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = barConfiguration.color

    const width = Math.round(1 / 63 * canvas.width)

    for (let i = 0; i < 64; i++) {
      if (stream[i]) {
        const height = barConfiguration.height * window.devicePixelRatio * stream[i].value
        context.fillRect((width * i) + (barConfiguration.spacing / 2), (canvas.height - height), width - barConfiguration.spacing, height)
        context.fillRect((width * i) + (barConfiguration.spacing / 2), 0, width - barConfiguration.spacing, height)
      }
    }
  }

  useAudioFeed((feed) => {
    const averages = []

    for (let i = 0; i < feed.length; ++i) {
      if (i % 2) {
        averages.push((feed[i - 1] + feed[i]) / 2)
      }
    }

    const left = feed.slice(0, Math.floor(feed.length / 2))
    const right = feed.slice(Math.floor(feed.length / 2), feed.length)

    TweenMax.to(peaks.total, 0.2, { value: Math.max(...feed) })
    TweenMax.to(peaks.left, 0.2, { value: Math.max(...left) })
    TweenMax.to(peaks.right, 0.2, { value: Math.max(...right) })

    for (let j = 0; j < averages.length; ++j) {
      if (!stream[j]) {
        stream.push({ value: averages[j] })
      } else {
        TweenMax.to(stream[j], 0.2, { value: averages[j] })
      }
    }
  })

  useEffect(() => {
    const canvas = canvasRef!.current!

    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    setInterval(() => {
      onTick(canvas)
    }, 1000 / 60)
  }, [])

  return (
    <canvas ref={canvasRef} className="app__canvas" />
  )
}