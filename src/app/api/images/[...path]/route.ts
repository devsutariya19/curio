import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { DOCS_PATH, http } from '@/lib/constants'

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  const requestedPath = params.path.join('/')
  const filePath = path.join(DOCS_PATH, 'images', requestedPath)

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found' }, { status: http.NOT_FOUND })
  }

  const fileBuffer = await fs.promises.readFile(filePath)
  const ext = path.extname(filePath).slice(1)
  const contentType = `image/${ext === 'svg' ? 'svg+xml' : ext}`

  return new NextResponse(fileBuffer, {
    status: http.OK,
    headers: {
      'Content-Type': contentType,
    },
  })
}
