import React from 'react'
import Clock from './components/Clock'
import Canvas from './components/Canvas'

export default function App() {
  return (
    <div className="app">
      <Clock twentyFourHourFormat={true} />
      <Canvas />
    </div>
  )
}
