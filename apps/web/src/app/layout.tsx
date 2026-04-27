import { SessionProvider } from "next-auth/react";
import { WithProviderWrapper } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
          <WithProviderWrapper>
            {children}
          </WithProviderWrapper>
        </body>
      </html>
  );
}
