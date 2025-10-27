import SessionWrapper from "./components/SessionWrapper";
import "./globals.css";

export const metadata = {
  title: "Lead Management System",
  description: "Manage your leads effectively with our Lead Management System.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
