import { NextConfig } from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    unoptimized: true,
  },
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm'],
  },
})

export default withMDX(nextConfig)
