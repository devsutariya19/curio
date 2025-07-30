# App Observations

- Caching vs Fetching from Supabase
  - Takes about 11s to get file path list from supabase
  - About 1-3s after it gets cached using node-cache
  - **Ideas**:
    - Can trigger a function when GitHub push happens to get a list of file paths and use that as a read since docs only update when GitHub is updated. Saves overhead and can still use file-based routing