import "@/global.css";
import { UrqlProvider } from "@/components/Provider/UrqlProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Next.js GraphQL Sample | Prisma & Pothos",
  description: "Next.js GraphQL with Prisma and Pothos, powered by URQL and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
        <UrqlProvider endpoint="/graphql">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </UrqlProvider>
      </body>
    </html>
  );
}
