import AppLayout from "@/layouts/app-layout"

import { Head } from "@inertiajs/react"
import { CardHeader } from "@/components/ui/card"
import { Container } from "@/components/ui/container"

export default function Home() {
  return (
    <>
      <Head title="Inertia Laravel Starter kit" />
      <Container className="py-12">
        <CardHeader
          title="Laravel Starter Kit"
          description="Kamu ada page sekarang"
        />
      </Container>
    </>
  )
}

Home.layout = (page: any) => <AppLayout children={page} />
