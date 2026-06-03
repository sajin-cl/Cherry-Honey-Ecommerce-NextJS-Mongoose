import AdminLayout from "../../components/layouts/(admin)/AdminLayout";

export const metadata = {
  title: "Admin | Honey Bee",
  description: "Honey Bee Admin Dashboard",
};

export default function AdminRootLayout({ children }) {
  return <AdminLayout>{children}</AdminLayout>;
}
