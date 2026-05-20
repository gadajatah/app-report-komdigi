import { Button } from "@/components/ui/button"
import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal"
import { useForm } from "@inertiajs/react"

export default function ReportDelete({
  openModalDelete,
  setOpenModalDelete,
  onOpenChange,
  data,
}: any) {
  const { delete: destroy } = useForm()

  function DataDelete(data: any) {
    destroy(route("user.destroy", data), {
      onSuccess: () => {
        setOpenModalDelete(false)
      },
      onError: (e) => {
        console.log(e)
      },
    })
  }

  return (
    <div>
      <Modal isOpen={openModalDelete} onOpenChange={setOpenModalDelete}>
        <ModalContent role="alertdialog">
          <ModalHeader>
            <ModalTitle>Do Your Want to delete?</ModalTitle>
            <ModalDescription>
              This will immediately remove all contents of [ {data?.name ?? ""} ]. This action is
              permanent and cannot be undone.
            </ModalDescription>
          </ModalHeader>
          <ModalFooter>
            <ModalClose type="button">Cancel</ModalClose>
            <Button
              onPress={() => {
                DataDelete(data)
              }}
              intent="danger"
            >
              Ya, Delete.
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
