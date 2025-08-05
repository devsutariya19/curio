import path from "path";

// export const DOCS_FILE_PATH = path.join(process.cwd(), 'docs');
export const DOCS_FILE_PATH = '/Users/dev/Documents/Projects/mint/starter';
// export const DOCS_FILE_PATH = '/Users/dev/Documents/Projects/fern/docs-starter/fern/docs';
export const FILE_TYPES: string[] = ['mdx', 'md'];
export const FILE_IGNORE_PREFIX = '_';
export const FILE_IGNORE_PATHS: string[] = [`**/${FILE_IGNORE_PREFIX}*/**`, `**/${FILE_IGNORE_PREFIX}*`];

export const SUPABASE_BUCKET = 'docs';
export const DOCS_FOLDER = 'starter';
export const ASSETS_FOLDER = 'images';
// export const ASSETS_FOLDER = 'assets';

// HTTP status codes
export const http = {
  OK: 200,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
}