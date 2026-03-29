import { neon } from '@neondatabase/serverless'

let sqlClient: ReturnType<typeof neon> | null = null

export function getDbAdminDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() ?? ''
}

export function isDbAdminDatabaseConfigured() {
  return getDbAdminDatabaseUrl().length > 0
}

function getClient() {
  const databaseUrl = getDbAdminDatabaseUrl()

  if (!databaseUrl) {
    throw new Error('DATABASE_URL 未配置')
  }

  if (!sqlClient) {
    sqlClient = neon(databaseUrl)
  }

  return sqlClient
}

export async function dbAdminQuery<T>(
  query: string,
  params: unknown[] = [],
): Promise<T[]> {
  const client = getClient()
  const result = await client.query(query, params)
  return result as T[]
}
