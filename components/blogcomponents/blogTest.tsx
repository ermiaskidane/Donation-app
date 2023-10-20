import { getBlogData } from '@/app/actions/get-blog-data'
interface BlogTestProps {
  page: number,
  cat: string
}

const BlogTest = async({
  page,
  cat,
}: BlogTestProps) => {
  const blogData = await getBlogData(page = 1, cat = "monastery")
  console.log("££££££££££££££", blogData)
  return (
    <div>BlogTest</div>
  )
}

export default BlogTest