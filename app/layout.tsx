import {Nunito} from "next/font/google";
import './globals.css';
import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "./components/ClientOnly/clientOnly";
import RegisterModal from "./components/Modals/RegisterModal/registerModal";
import LoginModal from "./components/Modals/LoginModal/loginModal";
import ToasterProviders from "./providers/ToasterProvider";
import getCurrentUser from './actions/getCurrentUser';


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Projeto',
}

const font  = Nunito({
  subsets: ['latin']
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProviders/>
          <LoginModal/>
          <RegisterModal/>
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
