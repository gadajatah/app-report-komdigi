import { router } from "@inertiajs/react"
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

  const navigate = (url: string) => {
    if (!url) return
    router.get(url, {}, { preserveScroll: true, preserveState: true })
  }

  return (
    <Pagination>
      <PaginationList>
        <PaginationFirst onPress={() => navigate(first.url ?? "")} />
        <PaginationPrevious onPress={() => navigate(previous.url ?? "")} />
        <PaginationSection className="rounded-(--section-radius) border px-3 *:min-w-4">
          <PaginationLabel>{currentPage}</PaginationLabel>
          <PaginationLabel className="text-muted-fg">/</PaginationLabel>
          <PaginationLabel>{pages.length}</PaginationLabel>
        </PaginationSection>
        <PaginationNext onPress={() => navigate(next.url ?? "")} />
        <PaginationLast onPress={() => navigate(last.url ?? "")} />
      </PaginationList>
    </Pagination>
  )
}
