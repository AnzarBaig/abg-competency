// import Footer from './footer'
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
