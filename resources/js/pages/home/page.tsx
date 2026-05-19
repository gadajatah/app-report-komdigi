import AppLayout from "@/layouts/app-layout"

import { Head } from "@inertiajs/react"
import { CardHeader } from "@/components/ui/card"
import { Container } from "@/components/ui/container"

export default function Home() {
  return (
    <>
      <Head title="LaporDigi" />
      <Container className="py-12">
        <CardHeader title="Laravel Inertia Typescript" description="Kamu ada page sekarang" />
      </Container>
    </>
  )
}

Home.layout = (page: any) => <AppLayout children={page} />
