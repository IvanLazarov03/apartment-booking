import { Wifi, AirVent, Key, WashingMachine, Coffee, Star } from "lucide-react";

const amenities = [
  { label: "Wi-Fi", icon: Wifi },
  { label: "Air conditioning", icon: AirVent },
  { label: "Self check-in", icon: Key },
  { label: "Washing machine", icon: WashingMachine },
  { label: "Coffee machine", icon: Coffee },
  { label: "Superhost", icon: Star },
];

export default function Amenities() {
  return (
    <div id="amenities">
      <h2 className="font-serif text-2xl mb-4">Amenities</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {amenities.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="flex items-center gap-3 bg-[#f0f0ea] p-3 rounded-lg text-lg hover:bg-[#e6e6de] transition"
            >
              <div className="w-7 h-7 bg-[#2d4a3e] rounded-md flex items-center justify-center">
                <Icon size={16} className="text-white" />
              </div>
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
