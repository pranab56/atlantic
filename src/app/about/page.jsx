import TeamProfile from "../../components/About/TeamProfile";
import { Team } from "../../utils/CustomData";
import Head from "next/head";
import Image from "next/image";

export default function About() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>Industrial Equipment | Heavy Machinery Solutions</title>
        <meta
          name="description"
          content="Leading provider of industrial equipment and machinery"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Banner - Darkened background image with machinery */}
      <div className="relative flex items-center justify-center overflow-hidden bg-gray-950 h-[200px] sm:h-[340px]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/coverPhoto.png"
            alt="Industrial Machinery"
            layout="fill"
            objectFit="cover"
            className="opacity-30" // Set opacity of the image
          />
        </div>
        <h3 className="relative z-10 text-3xl font-bold text-primary">
          About
        </h3>
      </div>

      {/* About Section */}
      <div className="py-16 bg-[#292929]">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 mx-auto md:flex-row">
          {/* Left side - Image gallery */}
          <div className="w-full md:w-2/5">
            <div className="relative">
              <div className="absolute z-0 w-full h-full bg-amber-400 -top-4 -left-4"></div>
              <div className="relative z-10">
                <Image
                  src="/images/aboutpage2.png"
                  alt="Excavator"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Right side - About content */}
          <div className="w-full text-white md:w-3/5">
            <div className="mb-4">
              <span className="flex items-center">
                <Image
                  src={"/icons/aboutLogo.png"}
                  width={33}
                  height={33}
                  alt="About logo"
                />
                <span className="text-[22px] font-medium leading-[22px] text-[#DA9E1F]">
                  About
                </span>
              </span>
            </div>
            <h3 className="mb-4 text-3xl font-bold">
              Powering <span className="text-amber-400">Industries</span> with
              Innovation
            </h3>
            <p className="mb-8 text-gray-300">
              Alphron Machinery & Equipment provides all the latest machinery
              solutions, enhancing today's industries. Constantly at the
              forefront of technology and serving industries globally, we've
              built long-lasting relationships with countless partners globally,
              all while maintaining a commitment to excellence.
            </p>

            {/* Services Grid */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-start">
                <Image
                  src={"/icons/arrow.png"}
                  height={24}
                  width={24}
                  alt="arrow icons"
                />
                <div>
                  <h4 className="ml-1 font-semibold">Worldwide Service</h4>
                </div>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/icons/arrow.png"}
                  height={24}
                  width={24}
                  alt="arrow icons"
                />
                <div>
                  <h4 className="ml-1 font-semibold">Machinery Experts</h4>
                </div>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/icons/arrow.png"}
                  height={24}
                  width={24}
                  alt="arrow icons"
                />
                <div>
                  <h4 className="ml-1 font-semibold">Reliable Performance</h4>
                </div>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/icons/arrow.png"}
                  height={24}
                  width={24}
                  alt="arrow icons"
                />
                <div>
                  <h4 className="ml-1 font-semibold">Engineering Strength</h4>
                </div>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/icons/arrow.png"}
                  height={24}
                  width={24}
                  alt="arrow icons"
                />
                <div>
                  <h4 className="ml-1 font-semibold">Dedicated Support</h4>
                </div>
              </div>
              <div className="flex items-start">
                <Image
                  src={"/icons/arrow.png"}
                  height={24}
                  width={24}
                  alt="arrow icons"
                />
                <div>
                  <h4 className="ml-1 font-semibold">Precision Engineering</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-8 bg-amber-400">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-4">
            <div className="py-4">
              <h2 className="text-4xl font-bold">1.2K</h2>
              <p className="text-gray-800">Total Products</p>
            </div>
            <div className="py-4">
              <h2 className="text-4xl font-bold">160+</h2>
              <p className="text-gray-800">Total Countries</p>
            </div>
            <div className="py-4">
              <h2 className="text-4xl font-bold">88+</h2>
              <p className="text-gray-800">Brand Partners</p>
            </div>
            <div className="py-4">
              <h2 className="text-4xl font-bold">20+</h2>
              <p className="text-gray-800">Build Awards</p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-[#292929]">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Image
              src={"/icons/aboutLogo.png"}
              width={33}
              height={33}
              alt="About logo"
            />
            <h2 className="text-xl text-amber-400">Our Team</h2>
          </div>
          <h3 className="mb-12 text-3xl font-bold text-center text-white">
            Meet <span className="text-amber-400">Our</span> Team
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            {Team.map((teamProfile) => (
              <TeamProfile
                key={teamProfile.id}
                imageUrl={teamProfile.image}
                name={teamProfile.name}
                instagramUrl={"prof"}
                linkedinUrl={"linkeding"}
                title={teamProfile.destination}
                twitterUrl={"twitterUrl"}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}