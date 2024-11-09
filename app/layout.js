import AuthProvider from "@/context/authContext";
import DataProvider from "@/context/dataContext";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <script src="https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js"></script>

      <body>
        <AuthProvider>
          <DataProvider>{children}</DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
