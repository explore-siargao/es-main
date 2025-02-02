import { getRequestCMS } from "@/common/helpers/getRequestCMS"
import Blog from "@/module/cms/blog"
import { notFound } from "next/navigation"
import React from "react"

type T_Props = {
  params: {
    blogName: string
  }
}

const BlogPage = async ({ params: { blogName } }: T_Props) => {
  const content = await getRequestCMS(`/blogs/general/${blogName}`)

  if (!content) {
    notFound()
  }

  return <Blog data={content} />
}

export default BlogPage
