import "../components/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex items-center justify-center min-h-screen text-white bg-black">
        {children}
      </body>
    </html>
  );
}
