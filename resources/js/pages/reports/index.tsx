import AppLayout from "@/layouts/app-layout"
import { Head, router } from "@inertiajs/react"
import { Container } from "@/components/ui/container"
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchField, SearchInput } from "@/components/ui/search-field"
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/ui/menu"
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { debounce } from "lodash"
import { usePaginator } from "momentum-paginator"
import Paginate from "@/components/paginate"
import { DialogModal } from "@/components/dialog-modal"
import ReportCreate from "./create"
import ReportView from "./view"

interface ReportResource {
  id: number
  title: string
  where_is: string
  phone: string
  image: string
  report: string
}
export default function ReportIndex({ reports, roles, filters = {} }: any) {
  console.log(reports)

  const { first, last, from, to, total, previous, next, pages } = usePaginator(reports)

  const [isForm, setIsForm] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalTitle, setModalTitle] = useState("Modal title")
  const [modalDesc, setModalDesc] = useState("Modal title")
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [selectedData, setSelectedData] = useState<ReportResource | null>(null)

  const [_search, setSearch] = useState(filters.search ?? "")

  const handleSearch = useCallback(
    debounce((value: string) => {
      router.get(
        "/report",
        { search: value },
        {
          preserveState: true,
          replace: true,
        },
      )
    }, 500),
    [],
  )

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    handleSearch(e.target.value)
  }

  return (
    <>
      <Head title="Reports" />
      <Container className="py-12">
        <div className="rounded-lg border p-4">
          <div className="flex justify-between">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>A list of plans with search functionality.</CardDescription>
            </CardHeader>
            <div className="flex">
              <SearchField aria-label="Search" className={"w-70"}>
                <SearchInput id="search" onInput={onSearchChange} placeholder="Search" />
              </SearchField>
              <div className="ml-2">
                <Button
                  onPress={() => {
                    setIsForm(true)
                    setOpenModal(true)
                    setSelectedData(null)
                    setModalTitle("Add New Report")
                    setModalDesc("Make sure all Report data is filled in correctly")
                  }}
                  intent="primary"
                >
                  New Report
                </Button>
              </div>
            </div>
          </div>
          <Table className="mt-4" aria-label="Tags">
            <TableHeader>
              <TableColumn isRowHeader>Masalah</TableColumn>
              <TableColumn>Alamat</TableColumn>
              <TableColumn>No.Ponsel</TableColumn>
              <TableColumn>Laporan</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn />
            </TableHeader>
            <TableBody items={reports.data}>
              {(item: any) => (
                <TableRow id={item.id}>
                  <TableCell
                    textValue={item.title}
                    onClick={() => {
                      setOpenModal(true)
                      setModalTitle("Details Plan")
                      setModalDesc("Here is a view for the plan details.")
                      setIsForm(false)
                      setSelectedData(item)
                    }}
                  >
                    {item.title}
                  </TableCell>
                  <TableCell textValue={item.where_is}>{item.where_is}</TableCell>
                  <TableCell
                    textValue={item.phone}
                    className={"text-gray-600 text-xs dark:text-gray-400"}
                  >
                    {item.phone}
                  </TableCell>
                  <TableCell
                    textValue={item.report}
                    className={"text-gray-600 text-xs capitalize dark:text-gray-400"}
                  >
                    {item.report ?? "-"}
                  </TableCell>
                  <TableCell textValue={item.status}>{item.status}</TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Menu>
                        <MenuTrigger className="size-6">
                          <EllipsisVerticalIcon />
                        </MenuTrigger>
                        <MenuContent aria-label="Actions" placement="left top">
                          <MenuItem
                            onAction={() => {
                              setOpenModal(true)
                              setModalTitle("Details Plan")
                              setModalDesc("Here is a view for the plan details.")
                              setIsForm(false)
                              setSelectedData(item)
                            }}
                            isDisabled
                          >
                            View
                          </MenuItem>
                          {/* <MenuItem
                            onAction={() => {
                              setOpenModal(true)
                              setSelectedData(item)
                              setModalTitle("Edit User")
                              setModalDesc("Make sure all user data is filled in correctly")
                              setIsForm(true)
                            }}
                          >
                            Edit
                          </MenuItem> */}
                          <MenuSeparator />
                          <MenuItem
                            intent="danger"
                            onAction={() => {
                              setOpenModalDelete(true)
                              setSelectedData(item)
                            }}
                            isDisabled
                          >
                            Delete
                          </MenuItem>
                        </MenuContent>
                      </Menu>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="mt-5">
            <Paginate first={first} last={last} previous={previous} next={next} pages={pages} />
          </div>
        </div>

        <DialogModal
          openModal={openModal}
          onOpenChange={setOpenModal}
          title={modalTitle}
          description={modalDesc}
        >
          {!isForm ? (
            <>
              <ReportView user={selectedData} />
            </>
          ) : (
            <>
              <ReportCreate setOpenModal={setOpenModal} user={selectedData} roles={roles} />
            </>
          )}
        </DialogModal>

        {/* <PlanDelete
          openModalDelete={openModalDelete}
          setOpenModalDelete={setOpenModalDelete}
          onOpenChange={setOpenModalDelete}
          data={selectedData}
        /> */}
      </Container>
    </>
  )
}

ReportIndex.layout = (page: any) => <AppLayout children={page} />
