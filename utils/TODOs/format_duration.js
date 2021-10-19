import kleur from "kleur"

export function format_duration(duration) {
  if (!duration) {
    throw new Error(kleur.red("format_duration requires an ISO 8601 time string as an argument"))
  }

  let hours = 0
  let minutes = 0
  let seconds = 0

  // Remove PT from string ref: https://developers.google.com/youtube/v3/docs/videos#contentDetails.duration
  duration = duration.replace("PT", "")

  // If the string contains hours parse it and remove it from our duration string
  if (duration.indexOf("H") > -1) {
    const hours_split = duration.split("H")
    hours = parseInt(hours_split[0])
    duration = hours_split[1]
  }

  // If the string contains minutes parse it and remove it from our duration string
  if (duration.indexOf("M") > -1) {
    const minutes_split = duration.split("M")
    minutes = parseInt(minutes_split[0])
    duration = minutes_split[1]
  }

  // If the string contains seconds parse it and remove it from our duration string
  if (duration.indexOf("S") > -1) {
    const seconds_split = duration.split("S")
    seconds = parseInt(seconds_split[0])
  }

  // This is the parsed time in seconds
  duration = hours * 60 * 60 + minutes * 60 + seconds

  // This is the time in clock format
  const mins = Math.floor(duration / 60)
  let secs = duration - minutes * 60
  if (secs.toString().length === 1) secs = `0${secs}`
  duration = `${mins}:${secs}`

  // Math the values to return seconds
  return duration
}
