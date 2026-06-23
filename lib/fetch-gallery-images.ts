import fs from "fs"
import path from "path"

const GALLERY_FOLDERS = ["desktop-background", "mobile-background"] as const

function sortByNumericSuffix(paths: string[]): string[] {
  return [...paths].sort((a, b) => {
    const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || "0", 10)
    const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || "0", 10)
    return numA - numB
  })
}

function readGalleryImagesFromPublic(): string[] {
  const images: string[] = []

  for (const folder of GALLERY_FOLDERS) {
    const dir = path.join(process.cwd(), "public", folder)
    if (!fs.existsSync(dir)) continue

    const files = fs
      .readdirSync(dir)
      .filter((file) => /\.webp$/i.test(file))
      .map((file) => `/${folder}/${file}`)

    images.push(...sortByNumericSuffix(files))
  }

  return images
}

/** Loads gallery images from public/desktop-background and public/mobile-background. */
export async function fetchGalleryImages(): Promise<string[]> {
  return readGalleryImagesFromPublic()
}
