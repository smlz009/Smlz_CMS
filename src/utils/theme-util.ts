// 设置主题色值
export const setTheme = () => {
  const html: any = document

  if (html.startViewTransition) {
    html.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
    })
  } else {
    document.documentElement.classList.toggle('dark')
  }
}
