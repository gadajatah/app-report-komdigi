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
    <Modal isOpen={openModal} onOpenChange={onOpenChange}>
      <ModalContent
        size={size ?? "2xl"}
        isBlurred={isBlurred}
        shouldCloseOnInteractOutside={() => false}
      >
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description ?? ""}</ModalDescription>
        </ModalHeader>
        {children}
      </ModalContent>
    </Modal>
  )
}
