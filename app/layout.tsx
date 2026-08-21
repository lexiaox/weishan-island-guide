import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '微山岛游览图｜一岛一湖一段传奇',
  description: '微山岛互动景点地图，浏览景点故事与推荐游览路线。',
  openGraph: {
    title: '微山岛游览图｜一岛一湖一段传奇',
    description: '点击景点印章，探索微山岛故事与推荐游览路线。',
    images: [{ url: 'https://raw.githubusercontent.com/lexiaox/weishan-island-guide/main/public/og.png', width: 1200, height: 630, alt: '微山岛游览图' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '微山岛游览图｜一岛一湖一段传奇',
    description: '点击景点印章，探索微山岛故事与推荐游览路线。',
    images: ['https://raw.githubusercontent.com/lexiaox/weishan-island-guide/main/public/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
