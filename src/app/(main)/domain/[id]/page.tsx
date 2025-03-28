import { getUser } from "@/actions"
import DomainId from "@/components/DomainId"
import DomainIdHeader from "@/components/DomainIdHeader"
import { db } from "@/lib/prisma"
import { redirect } from "next/navigation"

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params

    const user = await getUser()

    if (!user)
        return (
            <div>not logged in</div>
        )

    const domain = await db.domain.findFirst({
        where: { id }
    })

    if (!domain) return redirect("/domain")

    let snippet = `
      const iframe = document.createElement("iframe");
      
      const iframeStyles = (styleString) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
      }
      
      iframeStyles('
          .chat-frame {
              position: fixed;
              bottom: 50px;
              right: 50px;
              border: none;
          }
      ')
      
      iframe.src = "http://localhost:3000/chatbot"
      iframe.classList.add('chat-frame')
      document.body.appendChild(iframe)
      
      window.addEventListener("message", (e) => {
          if(e.origin !== "http://localhost:3000") return null
          let dimensions = JSON.parse(e.data)
          iframe.width = dimensions.width
          iframe.height = dimensions.height
          iframe.contentWindow.postMessage("${id}", "http://localhost:3000/")
      }) 
`


    return (
        <div className=" space-y-5 py-10">
            <DomainIdHeader domain={domain.domain} id={domain.id} prompt={domain.prompt} />
            <DomainId snippet={snippet} />
        </div>
    )
}

export default page





