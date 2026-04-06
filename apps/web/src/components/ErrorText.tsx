import type React from "react";

export default function ErrorText({children}:{children: string | React.JSX.Element}) {
  return (
   <span className="text-red-600 text-xs ml-1">{children}</span>
  )
}
