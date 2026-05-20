import AdminLayoutClient from "./AdminLayoutClient";

export const metadata = {
  title: "Admin | Honey Bee",
  description: "Honey Bee Admin Dashboard",
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
