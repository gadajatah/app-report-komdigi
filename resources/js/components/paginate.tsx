import type { PaginatorItem } from "momentum-paginator"
import {
  Pagination,
  PaginationFirst,
  PaginationLabel,
  PaginationLast,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
  PaginationSection,
} from "./ui/pagination"

interface Props {
  first: PaginatorItem
  last: PaginatorItem
  previous: PaginatorItem
  pages: PaginatorItem[]
  next: PaginatorItem
}

export default function Paginate({ first, last, previous, next, pages }: Props) {
  const currentPage = pages.find((p) => p.isCurrent)?.label ?? 1

  return (
    <Pagination>
      <PaginationList>
        <PaginationFirst href={first.url ?? ""} routerOptions={{ preserveScroll: true }} />
        <PaginationPrevious href={previous.url ?? ""} routerOptions={{ preserveScroll: true }} />
        <PaginationSection className="rounded-(--section-radius) border px-3 *:min-w-4">
          <PaginationLabel>{currentPage}</PaginationLabel>
          <PaginationLabel className="text-muted-fg">/</PaginationLabel>
          <PaginationLabel>{pages.length}</PaginationLabel>
        </PaginationSection>
        <PaginationNext href={next.url ?? ""} routerOptions={{ preserveScroll: true }} />
        <PaginationLast href={last.url ?? ""} routerOptions={{ preserveScroll: true }} />
      </PaginationList>
    </Pagination>
  )
}
