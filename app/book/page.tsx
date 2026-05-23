import Navbar from "../components/Navbar";
import BookingPage from "../components/BookingPage";
import Footer from "../components/Footer";
export default function Book() {
  return (
    <>
      <div className="bg-[#fafaf8] text-[#1a1a18] font-sans">
        <Navbar />
        <BookingPage />
        <Footer />
      </div>
    </>
  );
}
