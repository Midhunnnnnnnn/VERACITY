"use client"; // This directive marks the file as a client component

import { useEffect } from "react";
import { Auth0Provider } from '@auth0/auth0-react'; // Import Auth0Provider
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/ui/footer";

const domain = "dev-ls80eb1gscgkkic1.us.auth0.com";
const clientId = "NdmBf6GG7iqmcOa4AWRBg55LSorTsD08";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  }, []); // Added dependency array to avoid multiple calls

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      }}
    >
      <>
        <main className="relative flex grow flex-col">{children}</main>
        <Footer />
      </>
    </Auth0Provider>
  );
}
