import Providers from "@/components/Providers";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import UserButton from "@/components/Userbutton";
import Bot from "@/components/bot/Bot";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <Providers>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <div className=" px-20">
          <Bot />
          <UserButton />
          {children}
        </div>
        <Toaster />
      </ThemeProvider>

    </Providers>
  );
}
