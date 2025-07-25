import { DOCS_PATH, http } from "@/lib/constants";
import { readDocFile } from "@/lib/server-utils";
import path from "path";

export async function GET(
  request: Request,
  context: { params: { slug: string[] } }
) {
  const { slug = [] } = await context.params;

  const filePath = path.join(DOCS_PATH, ...slug);
  const fileContent = await readDocFile(filePath);

  if (fileContent === null) {
    return new Response('File not found', { status: http.NOT_FOUND });
  }

  return new Response(fileContent, {
    status: http.OK,
    headers: { 'Content-Type': 'text/plain' },
  });
}