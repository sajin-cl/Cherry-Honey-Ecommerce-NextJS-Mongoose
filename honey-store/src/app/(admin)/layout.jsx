import AdminLayout from "../../components/layouts/(admin)/AdminLayout";

export const metadata = {
  title: "Admin | Cherrys Honey",
  description: "Cherrys Honey Admin Dashboard",
};

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
