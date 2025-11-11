import { Client } from '@notionhq/client'
import { env } from './env'
import { logger } from './logger'

export const notion = new Client({
  auth: env.NOTION_API_KEY,
  notionVersion: '2025-09-03',
})

export async function getNotionPage(pageId: string) {
  try {
    return await notion.pages.retrieve({ page_id: pageId })
  } catch (error) {
    logger.error('Notion API 오류', {
      pageId,
    })
    throw error
  }
}

/**
 * 데이터베이스의 data_source_id를 조회하고 캐싱합니다.
 * Notion API v5에서는 database_id 대신 data_source_id를 사용해야 합니다.
 */
let cachedDataSourceId: string | null = null

export async function getDataSourceId(): Promise<string> {
  // 이미 캐싱된 경우 바로 반환
  if (cachedDataSourceId) {
    return cachedDataSourceId
  }

  try {
    const response = await notion.databases.retrieve({
      database_id: env.NOTION_DATABASE_ID,
    })

    // v5에서 database는 data_sources 배열을 반환
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataSources = (response as any).data_sources

    if (!dataSources || dataSources.length === 0) {
      throw new Error('데이터베이스에 data source가 없습니다')
    }

    // 첫 번째 data_source 사용 (일반적인 케이스)
    const dataSourceId = dataSources[0].id
    cachedDataSourceId = dataSourceId
    logger.info('Data Source ID 캐싱 완료', {
      dataSourceId,
    })

    return dataSourceId
  } catch (error) {
    logger.error('Data Source ID 조회 실패', {
      databaseId: env.NOTION_DATABASE_ID,
      error,
    })
    throw error
  }
}
