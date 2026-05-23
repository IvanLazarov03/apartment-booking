import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ApartmentDetails from "./components/ApartmentDetails";
import Amenities from "./components/Amenities";
import CalendarPlaceholder from "./components/Calendar";
import BookingCard from "./components/BookingCard";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <div className="bg-[#fafaf8] text-[#1a1a18] font-sans">
      <Navbar />
      <Hero />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div>
          <BookingCard />
          <ApartmentDetails />
          <Amenities />
          <CalendarPlaceholder />

          {/* Map placeholder */}
          <div className="h-100 bg-[#e4ede0] rounded-xl flex items-center justify-center text-sm text-neutral-500">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12177.58292918582!2d22.585407013919028!3d40.26695869342177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135800332443d671%3A0x400bd2ce2b9ab40!2sParalia%20601%2000%2C%20Greece!5e0!3m2!1sen!2smk!4v1779550331750!5m2!1sen!2smk"
              title="Linden Apartment"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
