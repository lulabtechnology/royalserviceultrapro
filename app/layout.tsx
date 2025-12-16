import "./globals.css";

export const metadata = {
  title: "Royal Service | Catálogo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
