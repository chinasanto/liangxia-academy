import { neon } from '@neondatabase/serverless'

let sqlClient: ReturnType<typeof neon> | null = null

export function getDatabaseUrl() {
  return process.env.DATABASE_URL?.trim() ?? ''
}

export function isNeonConfigured() {
  return getDatabaseUrl().length > 0
}

export function getNeonClient() {
  const databaseUrl = getDatabaseUrl()

  if (!databaseUrl) {
    return null
  }

  if (!sqlClient) {
    sqlClient = neon(databaseUrl)
  }

  return sqlClient
}

export async function executeNeonQuery<T>(
  query: string,
  params: unknown[] = [],
): Promise<T[]> {
  const client = getNeonClient()

  if (!client) {
    throw new Error('DATABASE_URL 未配置')
  }

  const result = await client.query(query, params)
  return result as T[]
}
