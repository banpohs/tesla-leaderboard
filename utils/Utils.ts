export const authernate = (key: string) => {
  return process.env.KEY === key
}

export function serialize<T>(data: T): T {
  return JSON.parse(JSON.stringify(data))
}

export function formatSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secondsLeft = seconds - minutes * 60

  return `${minutes}분 ${secondsLeft}초`
}
