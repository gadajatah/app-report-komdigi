import { Button } from "@/components/ui/button"
import { FieldError, Label } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ModalBody, ModalClose, ModalFooter } from "@/components/ui/modal"
import { TextField } from "@/components/ui/text-field"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "@inertiajs/react"
import { Form } from "react-aria-components"

export default function ReportCreate({ setOpenModal, report, roles }: any) {
  const { data, setData, post, patch, errors, processing, recentlySuccessful, reset } = useForm({
    title: report?.title ?? "",
    where_is: report?.where_is ?? "",
    phone: report?.phone ?? "",
    report: report?.report ?? "",
  })

  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (report) {
      patch(route("report.update", report), {
        onSuccess: () => {
          console.log("success edited")
          setOpenModal(false)
          reset()
        },
      })
    } else {
      post(route("report.store"), {
        onSuccess: () => {
          console.log("success store")
          setOpenModal(false)
          reset()
        },
        onError: (e) => console.log(e),
      })
    }
  }

  return (
    <>
      <Form validationErrors={errors} onSubmit={submit}>
        <ModalBody>
          <div className="space-y-2">
            <TextField
              aria-label="Name"
              value={data.title}
              onChange={(v) => setData("title", v)}
              autoComplete="name"
              isRequired
            >
              <Label>Masalah</Label>
              <Input placeholder="Enter a name" />
              <FieldError className={"text-xs"} />
              {errors.title && <span className="text-danger text-xs">{errors.title}</span>}
            </TextField>
            <TextField
              aria-label="Where"
              value={data.where_is}
              onChange={(v) => setData("where_is", v)}
              autoComplete="where_is"
              isRequired
            >
              <Label>Lokasi</Label>
              <Input placeholder="Enter a problem" />
              <FieldError className={"text-xs"} />
              {errors.where_is && <span className="text-danger text-xs">{errors.where_is}</span>}
            </TextField>
            <TextField
              aria-label="Phone"
              value={data.phone}
              onChange={(v) => setData("phone", v)}
              autoComplete="phone"
              isRequired
            >
              <Label>No. Hp</Label>
              <Input placeholder="Enter a phone" />
              <FieldError className={"text-xs"} />
              {errors.phone && <span className="text-danger text-xs">{errors.phone}</span>}
            </TextField>
            <TextField
              name="report"
              aria-label="report"
              value={data.report}
              onChange={(v) => setData("report", v)}
              autoComplete="report"
              isRequired
            >
              <Label>Laporan</Label>
              <Textarea />
            </TextField>
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose>Cancel</ModalClose>
          <Button type="submit" isDisabled={processing} intent="primary">
            Submit.
          </Button>
        </ModalFooter>
      </Form>
    </>
  )
}
