import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="appLayout">
      <Sidebar />
      <main className="appLayout__content">
        <div className="appLayout__inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
