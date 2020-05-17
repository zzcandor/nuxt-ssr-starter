import QRCode from 'qrcode'

export function makeQRSrc (url) {
  if (!url) return
  let qrcodeUrl = ''
  QRCode.toDataURL(url, {
    version: 4
  }, (errors, resurl) => (qrcodeUrl = resurl))
  return qrcodeUrl
}