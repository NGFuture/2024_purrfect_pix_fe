import "../scss/index.scss";

export const metadata = {
  title: "Purrfect Pix",
  description: "Tons of adorable cats to look at!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
