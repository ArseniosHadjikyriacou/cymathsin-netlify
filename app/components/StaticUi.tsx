import Navbar from "./Navbar"
import Footer from "./Footer"
import { Outlet } from "react-router";


export default function StaticUi() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}