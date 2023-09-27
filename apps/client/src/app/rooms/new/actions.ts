"use server"

export async function createCampaign(form: FormData) {
  const response = await fetch("http://localhost:3005/api/room", {
    method: "POST",
    body: JSON.stringify({
      id: Math.random().toString(36).substring(7),
      name: form.get("name") || "New Campaign",
      description: form.get("description") || "",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  return await response
    .json()
    .then((res) => res.id)
    .catch((e) => console.error(e))
}
