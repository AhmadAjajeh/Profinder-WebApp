import { useEffect } from "react";
import { getToken } from "../util/http";
import { Outlet, redirect, useLocation, useNavigate } from "react-router-dom";
import SmallScreenHeader from "../components/header-components/SmallScreenHeader";
import MediumScreenHeader from "../components/header-components/MediumScreenHeader";
import AlertModal from "../components/alert/AlertModal";

export default function MainLayout() {
  useEffect(() => {
    document.body.classList.add("dark:bg-darkBackground");
    document.body.classList.add("bg-lightBackground");

    return () => {
      document.body.classList.remove("dark:bg-darkBackground");
      document.body.classList.remove("bg-lightBackground");
    };
  }, []);

  return (
    <>
      <header className="bg-white dark:bg-elementBlack border-b-1 dark:border-0 shadow-md transition-all duration-300 fixed z-20 w-full">
        <SmallScreenHeader />
        <MediumScreenHeader />
      </header>
      <Outlet />
    </>
  );
}

export function mainLoader() {
  try {
    const { token, expires_at } = getToken();
    if (!token || !expires_at || new Date(expires_at) < new Date()) {
      return redirect("/auth/login");
    }
    return null;
  } catch (error) {
    console.error("Error loading token:", error);
    return redirect("/auth/login");
  }
}
