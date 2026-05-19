import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle } from "./ui/modal"

export function DialogModal({
  openModal,
  onOpenChange,
  children,
  title,
  description,
  size,
  isBlurred = false,
}: any) {
  return (
    <>
      <Modal>
        <ModalContent
          isOpen={openModal}
          onOpenChange={onOpenChange}
          size={size ?? "2xl"}
          shouldCloseOnInteractOutside={(e: Element) => false}
        >
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <ModalDescription>{description ?? ""}</ModalDescription>
          </ModalHeader>
          {children}
        </ModalContent>
      </Modal>
    </>
  )
}
