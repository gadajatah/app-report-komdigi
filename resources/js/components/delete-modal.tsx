import {
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "./ui/modal"
import { Button } from "./ui/button"
import { useForm } from "@inertiajs/react"

export default function DeleteModal({
  openModalDelete,
  onOpenChange,
  data,
  route_del,
  setOpenModalDelete,
}: any) {
  const { delete: destroy } = useForm()

  function DataDelete(data: any) {
    destroy("/delete", {
      onSuccess: () => {
        setOpenModalDelete(false)
      },
    })
  }

  return (
    <Modal>
      <ModalContent
        isBlurred
        isOpen={openModalDelete}
        onOpenChange={onOpenChange}
        role="alertdialog"
      >
        <ModalHeader>
          <ModalTitle>Delete file</ModalTitle>
          <ModalDescription>
            This will permanently delete the selected file [{data?.name ?? ""}]. Continue?
          </ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <ModalClose>Cancel</ModalClose>
          <Button onPress={() => DataDelete(data)} intent="danger">
            Continue.
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
