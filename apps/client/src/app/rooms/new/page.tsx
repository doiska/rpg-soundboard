import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createCampaign } from "@/app/rooms/new/actions"

export default function CampaignsNewPage() {
  const handleCreation = async (formData: FormData) => {
    "use server"
    const newId = await createCampaign(formData)

    redirect(`/rooms/${newId}`)
  }

  return (
    <div className="container grid h-screen place-items-center">
      <form action={handleCreation} className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">New Campaign</h1>
        <Input name="room_name" type="text" placeholder="Nome da campanha" />
        <Input
          name="room_description"
          type="text"
          placeholder="Descrição da campanha"
        />

        <Button type="submit" variant="default">
          Tudo certo! Criar campanha
        </Button>
      </form>
    </div>
  )
}
