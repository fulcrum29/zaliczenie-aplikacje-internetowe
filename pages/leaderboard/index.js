import Navbar from "@/components/Navbar";
import { supabase } from "@/components/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart } from "lucide-react";

import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Pies(params) {
  const [viewGraph, setViewGraph] = useState(false);
  const [data, setData] = useState();

  const fetchImage = async (dog) => {
    const correctedBreed = dog.breed.replace(/-/g, "/");
    const res = await axios.get(
      `https://dog.ceo/api/breed/${correctedBreed}/images/random`
    );
    return res.data.message;
  };

  const fetchTopDawg = async () => {
    const res = await supabase
      .from("topdawgs")
      .select("*")
      .order("breed_hits", { ascending: false })
      .limit(5);

    const dogs = await Promise.all(
      res.data.map(async (dog) => {
        const breedNoDash = dog.breed.replace("-", " ");
        const capitalizedName = breedNoDash.replace(/\b\w/g, (char) =>
          char.toUpperCase()
        );

        const img = await fetchImage(dog);
        console.log(img);

        return {
          ...dog,
          capitalizedName: capitalizedName,
          img: img,
        };
      })
    );

    return dogs;
  };

  useEffect(() => {
    fetchTopDawg().then((data) => {
      setData(data);
    });
  }, []);

  const RenderList = () => {
    return (
      <div className="md:w-1/2 w-full flex flex-col mx-auto items-center justify-center">
        {data?.map((dog, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-between w-full p-4 my-4 bg-card text-white rounded-lg"
          >
            <div className="flex items-center shrink-0">
              <img
                className="w-20 h-20 object-cover rounded-md "
                src={dog.img}
              />
              <p className="text-lg  shrink-0 ml-2">{dog.capitalizedName}</p>
            </div>
            <p className="text-lg shrink-0">{dog.breed_hits}</p>
          </div>
        ))}
      </div>
    );
  };

  const RenderGraph = () => {
    return (
      <div className="md:w-1/2 w-full mt-16 h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}

          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="capitalizedName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="breed_hits" name={"Liczba głosów"} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <main className="min-h-screen w-full pt-20 md:px-0 px-4 bg-black">
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="md:w-1/2 w-full flex items-center justify-between">
          <h1 className="text-4xl font-bold text-start text-white">
            Top 5 dawgs
          </h1>
          <div className="flex items-center">
            <p className="text-white text-lg font-semibold mr-2">{viewGraph ? 'Pokaż listę' :"Pokaż graf"}</p>
            <div
              onClick={() => {
                setViewGraph(!viewGraph);
              }}
              className="border cursor-pointer p-1 rounded-md"
            >
              <AreaChart className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
        {viewGraph ? <RenderGraph /> : <RenderList />}
      </div>
    </main>
  );
}
