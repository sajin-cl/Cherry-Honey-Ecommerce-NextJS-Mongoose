import AdminLayout from "../../components/layouts/(admin)/AdminLayout";

export const metadata = {
  title: "Admin | Cherrys Honey",
  description: "Cherrys Honey Admin Dashboard",

  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
