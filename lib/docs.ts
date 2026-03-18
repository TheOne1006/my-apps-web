import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'

export interface AppMeta {
  id: string
  name: string
  description: string
  icon: string
}

export interface DocMeta {
  title: string
  description: string
}

export interface DocInfo {
  slug: string[]
  meta: DocMeta
}

// 读取 APP 列表配置
export const getApps = cache(async (): Promise<AppMeta[]> => {
  const content = await fs.readFile(
    path.join(process.cwd(), 'content/apps.json'),
    'utf-8'
  )
  return JSON.parse(content)
})

// 获取单个 APP 信息
export const getApp = cache(async (appId: string): Promise<AppMeta | null> => {
  const apps = await getApps()
  return apps.find(app => app.id === appId) ?? null
})

// 获取 APP 下所有文档路径
export const getDocPaths = cache(async (appId: string): Promise<string[][]> => {
  const appDir = path.join(process.cwd(), 'content', appId)

  try {
    await fs.access(appDir)
  } catch {
    return []
  }

  const paths: string[][] = []

  async function scan(dir: string, segments: string[] = []) {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        await scan(path.join(dir, entry.name), [...segments, entry.name])
      } else if (entry.name.endsWith('.mdx') && entry.name !== '_index.mdx') {
        const slug = entry.name.replace(/\.mdx$/, '')
        paths.push([...segments, slug])
      }
    }
  }

  await scan(appDir)
  return paths
})

// 获取 APP 下所有文档信息
export const getDocs = cache(async (appId: string): Promise<DocInfo[]> => {
  const paths = await getDocPaths(appId)
  const docs: DocInfo[] = []

  for (const slug of paths) {
    try {
      const mod = await import(`@/content/${appId}/${slug.join('/')}.mdx`)
      docs.push({
        slug,
        meta: mod.metadata ?? { title: slug.at(-1) ?? '', description: '' },
      })
    } catch {
      // 忽略导入失败的文件
    }
  }

  return docs
})

// 读取文档内容
export const getDoc = cache(async (
  appId: string,
  slug: string[]
): Promise<{ meta: DocMeta; content: React.ComponentType } | null> => {
  try {
    const mod = await import(`@/content/${appId}/${slug.join('/')}.mdx`)
    return {
      meta: mod.metadata ?? { title: slug.at(-1) ?? '', description: '' },
      content: mod.default,
    }
  } catch {
    return null
  }
})
