export interface ParsedWeddingDate {
  month: string
  day: string
  year: string
  dayOfWeek: string
}

function formatParsedDate(date: Date): ParsedWeddingDate {
  return {
    month: date.toLocaleDateString("en-US", { month: "long" }).toUpperCase(),
    day: String(date.getDate()),
    year: String(date.getFullYear()),
    dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
  }
}

export function normalizeWeddingDateString(dateStr: string | undefined): string {
  const trimmed = dateStr?.trim()
  if (!trimmed) return ""

  const longFormMatch = trimmed.match(/^(\w+)\s+(\d{1,2}),?\s+(\d{4})$/)
  if (longFormMatch) {
    return `${longFormMatch[1]} ${longFormMatch[2]}, ${longFormMatch[3]}`
  }

  const parsed = new Date(trimmed)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
  }

  return trimmed
}

export function parseWeddingDate(
  dateStr: string | undefined,
  fallback?: ParsedWeddingDate,
): ParsedWeddingDate {
  const normalized = normalizeWeddingDateString(dateStr)
  if (!normalized) {
    return (
      fallback ?? {
        month: "OCTOBER",
        day: "4",
        year: "2026",
        dayOfWeek: "Sunday",
      }
    )
  }

  const longFormMatch = normalized.match(/^(\w+)\s+(\d{1,2}),\s+(\d{4})$/)
  if (longFormMatch) {
    const parsed = new Date(`${longFormMatch[1]} ${longFormMatch[2]}, ${longFormMatch[3]}`)
    if (!Number.isNaN(parsed.getTime())) {
      return formatParsedDate(parsed)
    }
  }

  const parsed = new Date(normalized)
  if (!Number.isNaN(parsed.getTime())) {
    return formatParsedDate(parsed)
  }

  return (
    fallback ?? {
      month: "OCTOBER",
      day: "4",
      year: "2026",
      dayOfWeek: "Sunday",
    }
  )
}
