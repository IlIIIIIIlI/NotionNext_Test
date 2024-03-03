// import * as ThemeComponents from '@theme-components'

// import { getQueryVariable } from '../lib/utils'

// import BLOG from '@/blog.config'
// import cookie from 'react-cookies'
// import dynamic from 'next/dynamic'
// import getConfig from 'next/config'
// import { useEffect } from 'react'
// // import { useRouter } from 'next/router';

// // 所有主题在next.config.js中扫描
// export const { THEMES = [] } = getConfig().publicRuntimeConfig
// /**
//  * 加载主题文件
//  * 如果是
//  * @param {*} router
//  * @returns
//  */

// // Ensure useRouter is imported at the beginning of the file.

// // ... (other imports and code)

// export const getLayoutByTheme = router => {
//   const currentPath = router.asPath // Current URL path.
//   const layout = getLayoutNameByPath(router.pathname)
//   // Check if it's the homepage based on the provided URL.
//   const isHomePage = currentPath === '/'
//   const isZhHomePage = currentPath === '/zh'
//   const is404 = currentPath === '/404'
//   console.log('------------------------------------', currentPath)

//   useEffect(() => {
//     function jump() {
//       const path = window.location.hash
//       if (path && path.includes('#')) {
//         const id = path.replace('#', '')
//         const el = window.document.getElementById(id)
//         if (el) {
//           const r = el.getBoundingClientRect()

//           window.scrollTo({
//             top: r.top,
//             behavior: 'smooth'
//           })
//         }
//       }
//     }

//     window.addEventListener('hashchange', jump)

//     return () => {
//       window.removeEventListener('hashchange', jump)
//     }
//   }, [])

//   // Choose the theme based on the page.
//   if (isHomePage || isZhHomePage) {
//     // If it's the homepage, use the 'landing' theme (or whatever your homepage theme is called).
//     console.log('this is home page')
//     return dynamic(() => import('@/themes/landing').then(m => m.LayoutIndex), {
//       ssr: true
//     })
//   } else if (is404) {
//     return ThemeComponents[layout]
//   } else {
//     // For other pages, use the 'gitbook' theme (or your alternative theme for other pages).
//     return dynamic(
//       () =>
//         import('@/themes/gitbook').then(m => {
//           return m.LayoutSlug
//         }),
//       { ssr: true }
//     )
//     // return ThemeComponents[layout]
//   }
// }

// /**
//  * 根据路径 获取对应的layout
//  * @param {*} path
//  * @returns
//  */
// export const getLayoutNameByPath = path => {
//   switch (path) {
//     case '/':
//       return 'LayoutIndex'
//     case '/archive':
//       return 'LayoutArchive'
//     case '/page/[page]':
//     case '/category/[category]':
//     case '/category/[category]/page/[page]':
//     case '/tag/[tag]':
//     case '/tag/[tag]/page/[page]':
//       return 'LayoutPostList'
//     case '/search':
//     case '/search/[keyword]':
//     case '/search/[keyword]/page/[page]':
//       return 'LayoutSearch'
//     case '/404':
//       return 'Layout404'
//     case '/tag':
//       return 'LayoutTagIndex'
//     case '/category':
//       return 'LayoutCategoryIndex'
//     default:
//       return 'LayoutSlug'
//   }
// }

// /**
//  * 初始化主题 , 优先级 query > cookies > systemPrefer
//  * @param isDarkMode
//  * @param updateDarkMode 更改主题ChangeState函数
//  * @description 读取cookie中存的用户主题
//  */
// export const initDarkMode = updateDarkMode => {
//   // 查看用户设备浏览器是否深色模型
//   let newDarkMode = isPreferDark()

//   // 查看cookie中是否用户强制设置深色模式
//   const cookieDarkMode = loadDarkModeFromCookies()
//   if (cookieDarkMode) {
//     newDarkMode = JSON.parse(cookieDarkMode)
//   }

//   // url查询条件中是否深色模式
//   const queryMode = getQueryVariable('mode')
//   if (queryMode) {
//     newDarkMode = queryMode === 'dark'
//   }

//   updateDarkMode(newDarkMode)
//   saveDarkModeToCookies(newDarkMode)
//   document
//     .getElementsByTagName('html')[0]
//     .setAttribute('class', newDarkMode ? 'dark' : 'light')
// }

// /**
//  * 是否优先深色模式， 根据系统深色模式以及当前时间判断
//  * @returns {*}
//  */
// export function isPreferDark() {
//   if (BLOG.APPEARANCE === 'dark') {
//     return true
//   }
//   if (BLOG.APPEARANCE === 'auto') {
//     // 系统深色模式或时间是夜间时，强行置为夜间模式
//     const date = new Date()
//     const prefersDarkMode = window.matchMedia(
//       '(prefers-color-scheme: dark)'
//     ).matches
//     return (
//       prefersDarkMode ||
//       (BLOG.APPEARANCE_DARK_TIME &&
//         (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
//           date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
//     )
//   }
//   return false
// }

// /**
//  * 读取深色模式
//  * @returns {*}
//  */
// export const loadDarkModeFromCookies = () => {
//   return cookie.load('darkMode')
// }

// /**
//  * 保存深色模式
//  * @param newTheme
//  */
// export const saveDarkModeToCookies = newTheme => {
//   cookie.save('darkMode', newTheme, { path: '/' })
// }

// /**
//  * 读取默认主题
//  * @returns {*}
//  */
// export const loadThemeFromCookies = () => {
//   return cookie.load('theme')
// }

// /**
//  * 保存默认主题
//  * @param newTheme
//  */
// export const saveThemeToCookies = newTheme => {
//   cookie.save('theme', newTheme, { path: '/' })
// }

// tangly's theme
// -------------------------------------------------------
// -------------------------------------------------------

// import BLOG, { LAYOUT_MAPPINGS } from '@/blog.config'
// import { getQueryParam, getQueryVariable, isBrowser } from '../lib/utils'
// import dynamic from 'next/dynamic'
// import getConfig from 'next/config'
// import * as ThemeComponents from '@theme-components'

// // 在next.config.js中扫描所有主题
// export const { THEMES = [] } = getConfig().publicRuntimeConfig

// /**
//  * 加载全局布局
//  * @param {*} themeQuery
//  * @returns
//  */
// export const getGlobalLayoutByTheme = themeQuery => {
//   if (themeQuery !== BLOG.THEME) {
//     return dynamic(
//       () =>
//         import(`@/themes/${themeQuery}`).then(m => m[getLayoutNameByPath(-1)]),
//       { ssr: true }
//     )
//   } else {
//     return ThemeComponents[getLayoutNameByPath('-1')]
//   }
// }

// /**
//  * 加载主题文件
//  * 如果是
//  * @param {*} router
//  * @returns
//  */
// export const getLayoutByTheme = ({ router, theme }) => {
//   const themeQuery = getQueryParam(router.asPath, 'theme') || theme
//   if (themeQuery !== BLOG.THEME) {
//     return dynamic(
//       () =>
//         import(`@/themes/${themeQuery}`).then(m => {
//           setTimeout(() => {
//             checkThemeDOM()
//           }, 500)

//           const components =
//             m[getLayoutNameByPath(router.pathname, router.asPath)]
//           if (components) {
//             return components
//           } else {
//             return m.LayoutSlug
//           }
//         }),
//       { ssr: true }
//     )
//   } else {
//     setTimeout(() => {
//       checkThemeDOM()
//     }, 100)
//     const components =
//       ThemeComponents[getLayoutNameByPath(router.pathname, router.asPath)]
//     if (components) {
//       return components
//     } else {
//       return ThemeComponents.LayoutSlug
//     }
//   }
// }

// /**
//  * 根据路径 获取对应的layout
//  * @param {*} path
//  * @returns
//  */
// const getLayoutNameByPath = path => {
//   if (LAYOUT_MAPPINGS[path]) {
//     return LAYOUT_MAPPINGS[path]
//   } else {
//     // 没有特殊处理的路径返回默认layout名称
//     return 'LayoutSlug'
//   }
// }

// /**
//  * 切换主题时的特殊处理
//  */
// const checkThemeDOM = () => {
//   if (isBrowser) {
//     const elements = document.querySelectorAll('[id^="theme-"]')
//     if (elements?.length > 1) {
//       elements[elements.length - 1].scrollIntoView()
//       // 删除前面的元素，只保留最后一个元素
//       for (let i = 0; i < elements.length - 1; i++) {
//         elements[i].parentNode.removeChild(elements[i])
//       }
//     }
//   }
// }

// /**
//  * 初始化主题 , 优先级 query > cookies > systemPrefer
//  * @param isDarkMode
//  * @param updateDarkMode 更改主题ChangeState函数
//  * @description 读取cookie中存的用户主题
//  */
// export const initDarkMode = updateDarkMode => {
//   // 查看用户设备浏览器是否深色模型
//   let newDarkMode = isPreferDark()

//   // 查看cookie中是否用户强制设置深色模式
//   const cookieDarkMode = loadDarkModeFromLocalStorage()
//   if (cookieDarkMode) {
//     newDarkMode = JSON.parse(cookieDarkMode)
//   }

//   // url查询条件中是否深色模式
//   const queryMode = getQueryVariable('mode')
//   if (queryMode) {
//     newDarkMode = queryMode === 'dark'
//   }

//   updateDarkMode(newDarkMode)
//   saveDarkModeToLocalStorage(newDarkMode)
//   document
//     .getElementsByTagName('html')[0]
//     .setAttribute('class', newDarkMode ? 'dark' : 'light')
// }

// /**
//  * 是否优先深色模式， 根据系统深色模式以及当前时间判断
//  * @returns {*}
//  */
// export function isPreferDark() {
//   if (BLOG.APPEARANCE === 'dark') {
//     return true
//   }
//   if (BLOG.APPEARANCE === 'auto') {
//     // 系统深色模式或时间是夜间时，强行置为夜间模式
//     const date = new Date()
//     const prefersDarkMode = window.matchMedia(
//       '(prefers-color-scheme: dark)'
//     ).matches
//     return (
//       prefersDarkMode ||
//       (BLOG.APPEARANCE_DARK_TIME &&
//         (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
//           date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
//     )
//   }
//   return false
// }

// /**
//  * 读取深色模式
//  * @returns {*}
//  */
// export const loadDarkModeFromLocalStorage = () => {
//   return localStorage.getItem('darkMode')
// }

// /**
//  * 保存深色模式
//  * @param newTheme
//  */
// export const saveDarkModeToLocalStorage = newTheme => {
//   localStorage.setItem('darkMode', newTheme)
// }

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------

import BLOG, { LAYOUT_MAPPINGS } from '@/blog.config'
import { getQueryParam, getQueryVariable, isBrowser } from '../lib/utils'
import dynamic from 'next/dynamic'
import getConfig from 'next/config'
import * as ThemeComponents from '@theme-components'
// 在next.config.js中扫描所有主题
export const { THEMES = [] } = getConfig().publicRuntimeConfig
// import { useEffect } from 'react'

// /**
//  * 加载主题文件
//  * @param {*} router
//  * @returns
//  */
// export const getLayoutByTheme = ({ router, theme }) => {
//   const currentPath = router.asPath // 当前URL路径。
//   const isHomePage = currentPath === '/' // 判断是否是主页
//   const isZhHomePage = currentPath === '/zh' // 判断是否是中文主页
//   const is404 = currentPath === '/404' // 判断是否是404页面
//   const themeQuery = getQueryParam(currentPath, 'theme') || theme // 获取主题查询参数

//   // 优化：在确定主题前先进行DOM检查，减少切换时的闪烁
//   setTimeout(() => {
//     checkThemeDOM()
//   }, 100)

//   // 根据页面选择主题
//   if (isHomePage || isZhHomePage) {
//     // 如果是主页，使用'landing'主题
//     console.log('This is home page')
//     return dynamic(() => import('@/themes/landing').then(m => m.LayoutIndex), {
//       ssr: true
//     })
//   } else if (is404) {
//     // 如果是404页面，使用对应的布局
//     return ThemeComponents[getLayoutNameByPath(currentPath)]
//   } else {
//     // 对于其他所有页面，根据主题查询参数或默认使用'gitbook'主题
//     const effectiveTheme = themeQuery !== BLOG.THEME ? themeQuery : 'gitbook'
//     return dynamic(
//       () =>
//         import(`@/themes/${effectiveTheme}`).then(m => {
//           // 如果找到对应的组件则返回，否则返回默认LayoutSlug
//           const layout = getLayoutNameByPath(router.pathname)
//           return m[layout] || m.LayoutSlug
//         }),
//       { ssr: true }
//     )
//   }
// }

/**
 * 加载主题文件，优化后
 * @param {*} router
 * @returns
 */
export const getLayoutByTheme = ({ router, theme }) => {
  const currentPath = router.asPath // 当前URL路径。
  const themeQuery = getQueryParam(currentPath, 'theme') || theme // 获取主题查询参数

  // 立即执行DOM检查，尽可能减少延迟和闪烁
  checkThemeDOM()

  const isHomePage = currentPath === '/' // 判断是否是主页
  const isZhHomePage = currentPath === '/zh' // 判断是否是中文主页
  const is404 = currentPath === '/404' // 判断是否是404页面
  let themeToLoad = 'gitbook' // 默认主题

  if (isHomePage || isZhHomePage) {
    console.log('This is home page')
    themeToLoad = 'landing'
  } else if (is404) {
    console.log('This is 404 page')
    themeToLoad = getLayoutNameByPath(currentPath)
  } else if (themeQuery && themeQuery !== BLOG.THEME) {
    themeToLoad = themeQuery
  }

  // 动态导入主题，并在完成后执行DOM检查
  return dynamic(
    () =>
      import(`@/themes/${themeToLoad}`).then(m => {
        const layout = getLayoutNameByPath(router.pathname) || 'LayoutSlug'
        return m[layout] || m.LayoutSlug
      }),
    { ssr: true }
  )
}

/**
 * 加载全局布局
 * @param {*} themeQuery
 * @returns
 */
export const getGlobalLayoutByTheme = themeQuery => {
  if (themeQuery !== BLOG.THEME) {
    return dynamic(
      () =>
        import(`@/themes/${themeQuery}`).then(m => m[getLayoutNameByPath(-1)]),
      { ssr: true }
    )
  } else {
    return ThemeComponents[getLayoutNameByPath('-1')]
  }
}

/**
 * 根据路径获取对应的layout
 * @param {*} path
 * @returns
 */
const getLayoutNameByPath = path => {
  if (LAYOUT_MAPPINGS[path]) {
    return LAYOUT_MAPPINGS[path]
  } else {
    // 没有特殊处理的路径返回默认layout名称
    return 'LayoutSlug'
  }
}

/**
 * 切换主题时的特殊处理
 */
const checkThemeDOM = () => {
  if (isBrowser) {
    const elements = document.querySelectorAll('[id^="theme-"]')
    if (elements?.length > 1) {
      elements[elements.length - 1].scrollIntoView()
      // 删除前面的元素，只保留最后一个元素
      for (let i = 0; i < elements.length - 1; i++) {
        elements[i].parentNode.removeChild(elements[i])
      }
    }
  }
}

/**
 * 初始化主题，优先级 query > cookies > systemPrefer
 * @param updateDarkMode 更改主题ChangeState函数
 */
export const initDarkMode = updateDarkMode => {
  let newDarkMode = isPreferDark()

  const localDarkMode = loadDarkModeFromLocalStorage()
  if (localDarkMode) {
    newDarkMode = JSON.parse(localDarkMode)
  }

  const queryMode = getQueryVariable('mode')
  if (queryMode) {
    newDarkMode = queryMode === 'dark'
  }

  updateDarkMode(newDarkMode)
  saveDarkModeToLocalStorage(newDarkMode)
  document
    .getElementsByTagName('html')[0]
    .setAttribute('class', newDarkMode ? 'dark' : 'light')
}

export function isPreferDark() {
  if (BLOG.APPEARANCE === 'dark') {
    return true
  }
  if (BLOG.APPEARANCE === 'auto') {
    const date = new Date()
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    return (
      prefersDarkMode ||
      (BLOG.APPEARANCE_DARK_TIME &&
        (date.getHours() >= BLOG.APPEARANCE_DARK_TIME[0] ||
          date.getHours() < BLOG.APPEARANCE_DARK_TIME[1]))
    )
  }
  return false
}

export const loadDarkModeFromLocalStorage = () => {
  return localStorage.getItem('darkMode')
}

export const saveDarkModeToLocalStorage = newTheme => {
  localStorage.setItem('darkMode', JSON.stringify(newTheme))
}
