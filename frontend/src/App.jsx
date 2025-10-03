import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Header />

      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />

      {/* small popup messages in the corner of the screen. It lets you easily show non-blocking messages to the user*/}
      <ToastContainer />
    </>
  );
}

export default App;
