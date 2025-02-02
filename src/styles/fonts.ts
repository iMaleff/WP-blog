import localFont from 'next/font/local'

export const notoSerif = localFont({
  src: [
    {
      path: '../../public/fonts/noto-serif/NotoSerif-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/noto-serif/NotoSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/noto-serif/NotoSerif-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/noto-serif/NotoSerif-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/noto-serif/NotoSerif-Bold.woff2',
      weight: '700',
      style: 'normal',
    }
  ],
  display: 'swap',
  preload: true,
  variable: '--font-noto-serif',
}) 