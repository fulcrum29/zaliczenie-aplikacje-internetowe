import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [currentDog, setCurrentDog] = useState([]);

  const uploadDawg = async (dog) => {
    const res = await axios.post("/api/uploadDog", { dog: dog });
    console.log(res);
  };

  const fetchRandomDog = async () => {
    const res = await axios.get("https://dog.ceo/api/breeds/image/random/3");
    console.log(res);

    const obj = [];

    for (let i = 0; i < res.data.message.length; i++) {
      const url = res.data.message[i];
      const parts = url.split("/");
      const breedPart = parts[parts.length - 2]; // This will give "elkhound-norwegian"

      const breedNoDash = breedPart.replace(/-/g, " "); // This will give "elkhound norwegian"
      const capitalizedName = breedNoDash.replace(/\b\w/g, (char) =>
        char.toUpperCase()
      ); // This will give "Elkhound Norwegian"

      obj.push({
        img: url,
        breed: breedPart,
        capitalizedName: capitalizedName,
      });
    }

    setCurrentDog(obj);
    return res;
  };

  // const { data } = useQuery({
  //   queryKey: ["pies"],
  //   queryFn: async () => {
  //     const data = await fetchRandomDog();
  //     return data;
  //   },
  // });

  useEffect(() => {
    fetchRandomDog();
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center bg-background  px-2 md:p-24 ${inter.className}`}
    >
      <Navbar />
      <h1 className="text-white text-4xl font-bold">Top Dawgs Ranking</h1>

      <div className="w-full flex justify-between flex-col md:flex-row h-full mt-16 px-2 md:space-y-0 space-y-4 md:px-32">
        {currentDog.map((dog) => (
          <div
            onClick={() => {
              uploadDawg(dog);
              fetchRandomDog();
            }}
            className="flex flex-col  bg-card p-5 ring-blue-500 hover:ring-2 rounded-xl transition-all cursor-pointer items-center justify-center"
          >
            <h1 className="text-2xl text-white mb-5 font-bold">{dog.capitalizedName}</h1>
            <img
              src={dog.img}
              alt="dog"
              className="rounded-lg w-96 h-96 object-cover"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
