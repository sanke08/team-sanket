import { getUser } from "@/actions"
import Home from "@/components/Home"
import { redirect } from "next/navigation"




const page = async () => {

  const user = await getUser()
  if (user) return redirect("/domain")


  return (
    <Home />
  )
}

export default page


