import type { Metadata } from "next";
import { Inter, Exo_2 } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import Header from "@/components/shared/Header";
import "./global.css";
import Footer from "@/components/shared/Footer";
import ReactQuery from "@/context/ReactQuery";

const exo2 = Exo_2({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pokemon Cards",
  description: "Discover the multifaceted world of Pokémon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={exo2.className}>
        <ReactQuery>
          <StyledComponentsRegistry>
            <Header />
            {children}
            <Footer />
          </StyledComponentsRegistry>
        </ReactQuery>
      </body>
    </html>
  );
}
