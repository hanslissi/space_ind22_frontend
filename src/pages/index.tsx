import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      </div>
    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Space Exhibition</title>
