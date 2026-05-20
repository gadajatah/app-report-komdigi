import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ModalBody, ModalClose, ModalFooter } from "@/components/ui/modal"
import { TextField } from "@/components/ui/text-field"
import { Form } from "react-aria-components"

export default function ReportView({ report }: any) {
  return (
    <Form>
      <ModalBody>
        <div className="space-y-2">
          <TextField aria-label="Name" value={report.title} isDisabled>
            <Label>Masalah</Label>
            <Input placeholder="Enter a name" />
          </TextField>
          <TextField
            aria-label="Where"
            value={report.where_is}
            isDisabled
            autoComplete="where_is"
            isRequired
          >
            <Label>Lokasi</Label>
            <Input placeholder="Enter a location" />
            <FieldError className={"text-xs"} />
          </TextField>
          <TextField
            aria-label="Phone"
            value={report.phone}
            isDisabled
            autoComplete="phone"
            isRequired
          >
            <Label>No. Ponsel</Label>
            <Input />
            <FieldError className={"text-xs"} />
          </TextField>
          <TextField
            aria-label="Phone"
            value={report.report}
            autoComplete="point"
            isDisabled
            isRequired
          >
            <Label>Report</Label>
            <Input placeholder="Enter a report" />
            <FieldError className={"text-xs"} />
          </TextField>
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalClose type="button">Cancel</ModalClose>
      </ModalFooter>
    </Form>
  )
}
