import "./globals.css";

export const metadata = {
  title: "BlueX",
  description: "AI Resume Reviewer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/eruda"></script>
        <script>eruda.init();</script>
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
          defer
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.pdfjsWorkerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
