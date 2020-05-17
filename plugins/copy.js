/*
* 只在生成模式的客户端中使用
*/

if (process.env.NODE_ENV === 'production') {
  const copyText = () => {
    return [ '',
      '著作权归作者所有。',
      ''
    ].join('\n')
  }

  // 拼接成html
  const buildText = content => {
    return content + copyText()
  }

  // 拼接成html
  const buildHtml = content => {
    return content + copyText()
  }

  // document.addEventListener('copy', e => {
  //   if (!window.getSelection) return
  //   const content = window.getSelection().toString()
  //   e.clipboardData.setData('text/plain', buildText(content))
  //   e.clipboardData.setData('text/html', buildHtml(content))
  //   e.preventDefault()
  // })
}
