import Category from "../../components/Home/Category";
import Image from "next/image";
import ClubMap from "../../components/Map/ClubMap";

export default function category() {
  return (
    <div>
       <div className="relative flex items-center justify-center overflow-hidden bg-gray-950 sm:h-[400px] h-[250px]">
        <ClubMap />
      </div>

      <Category />
    </div>
  );
}
