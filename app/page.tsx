import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ApartmentDetails from "./components/ApartmentDetails";
import Amenities from "./components/Amenities";
import CalendarPlaceholder from "./components/Calendar";
import BookingCard from "./components/BookingCard";

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
          <div className="h-45 bg-[#e4ede0] rounded-xl flex items-center justify-center text-sm text-neutral-500">
            Map preview
          </div>
        </div>
      </div>
    </div>
  );
}
