import { PropsWithChildren } from "react"

const SuffixText = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-sm text-text/40">{children}</p>
  )
}

export default SuffixText