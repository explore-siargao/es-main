import { getGuideBlogs } from "@/common/helpers/getGuideBlogs"
import Blog from "@/module/Blog"
import GlobalError from "@/module/Error/global-error"
import React from "react"

type T_Props = {
  params: {
    blogName: string
  }
}

const BlogPage = async ({ params: { blogName } }: T_Props) => {
  const content = await getGuideBlogs(blogName, "general")

  if (!content) {
    return <GlobalError />
  }

  return <Blog data={content} />
}

export default BlogPage
