import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo({
  page,
  totalPages,
  search
}: {
  page: number
  totalPages: number
  search: string
}) {
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <>
            <PaginationItem>
              <PaginationPrevious href={`/community?page=${page - 1}&search=${search}`} />
            </PaginationItem>

            {page > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

          <PaginationItem>
            <PaginationLink href={`/community?page=${page - 1}&search=${search}`} isActive={false}>
              {page - 1}
            </PaginationLink>
          </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationLink href={`/community?page=${page}`} isActive={true}>
            {page}
          </PaginationLink>
        </PaginationItem>
        
        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationLink href={`/community?page=${page + 1}&search=${search}`} isActive={false}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>

            {page < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext href={`/community?page=${page + 1}&search=${search}`} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}
