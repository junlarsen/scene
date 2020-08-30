// Mock wallpaper engine's audio feed
// allowing us to design our entire wallpaper
// outside of wallpaper engine
export function mockAudioFeed(count: number = 128) {
  return [...Array(count)].map(_ => Math.random())
}