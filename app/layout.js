import AuthProvider from "@/context/authContext";
import DataProvider from "@/context/dataContext";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
