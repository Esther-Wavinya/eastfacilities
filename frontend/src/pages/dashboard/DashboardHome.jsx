import SidebarLayout from "../../shared/Sidebar";
import Footer from "../../shared/Footer";

export default function DashboardHome() {
  return (
    <>
      <SidebarLayout>
        <h1>Welcome to Dashboard</h1>
        <p>This is your dashboard home page content.</p>
      </SidebarLayout>
      <Footer />
    </>
  );
}
