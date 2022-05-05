import React from "react"

declare global {
  type FC<P = {}> = React.FC<P>
  const ft: WechatMiniprogram.Wx
}
