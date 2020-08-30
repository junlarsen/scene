import { mockAudioFeed } from '../mock'
import { useEffect } from 'react'

export default function useAudioFeed(
  callback: (audioFeed: number[]) => void,
  mock: boolean = process.env.NODE_ENV === 'development'
) {
  useEffect(() => {
    if (mock) {
      // Call the mock at 30 fps
      const interval = setInterval(() => {
        callback(mockAudioFeed())
      }, 1000/30)

      return () => clearInterval(interval)
    } else {
      // @ts-ignore
      window?.wallpaperRegisterAudioListener(callback)

      // @ts-ignore
      return () => window?.wallpaperUnregisterAudioListener(callback)
    }
  }, [callback, mock])
}