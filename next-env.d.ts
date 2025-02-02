/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/compat/navigation" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare module 'next/font/local' {
  const localFont: (options: {
    src: Array<{
      path: string
      weight: string
      style: string
    }>
    display?: string
    preload?: boolean
    variable?: string
  }) => {
    style: { fontFamily: string }
    variable: string
  }
  export default localFont
}
