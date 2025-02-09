import '@/../faust.config'
import React from 'react'
import { useRouter } from 'next/router'
import { FaustProvider } from '@faustwp/core'
import '@/styles/globals.css'
import '@/styles/index.scss'
import { AppProps } from 'next/app'
import { WordPressBlocksProvider, fromThemeJson } from '@faustwp/blocks'
import blocks from '@/wp-blocks'
import localFont from 'next/font/local'
import SiteWrapperProvider from '@/container/SiteWrapperProvider'
import { Toaster } from 'react-hot-toast'
import NextNProgress from 'nextjs-progressbar'
import themeJson from '@/../theme.json'
import { GoogleAnalytics } from 'nextjs-google-analytics'

const notoSerif = localFont({
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
		},
	],
	display: 'swap',
	variable: '--font-noto-serif',
})

export default function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	return (
		<>
			<GoogleAnalytics trackPageViews />

			<FaustProvider pageProps={pageProps}>
				<WordPressBlocksProvider
					config={{
						blocks,
						theme: fromThemeJson(themeJson),
					}}
				>
					<SiteWrapperProvider {...pageProps}>
						<style jsx global>{`
							html {
								font-family: ${notoSerif.style.fontFamily};
							}
						`}</style>
						<NextNProgress color="#818cf8" />
						<Component {...pageProps} key={router.asPath} />
						<Toaster
							position="bottom-left"
							toastOptions={{
								style: {
									fontSize: '14px',
									borderRadius: '0.75rem',
								},
							}}
							containerClassName="text-sm"
						/>
					</SiteWrapperProvider>
				</WordPressBlocksProvider>
			</FaustProvider>
		</>
	)
}
