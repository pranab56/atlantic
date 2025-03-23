import Category from "../../components/Home/Category";
import Image from "next/image";

export default function category() {
  return (
    <div>
       <div className="relative flex items-center justify-center overflow-hidden bg-gray-950 h-[340px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/coverPhoto.png"
            alt="Industrial Machinery"
            layout="fill"
            objectFit="cover"
            className="opacity-30"  // Set opacity of the image
          />
        </div>
        <h3 className="relative z-10 text-primary text-3xl font-bold">All Category Products</h3>
      </div>

      <Category />
    </div>
  );
}
