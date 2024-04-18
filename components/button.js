import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function Button(params) {
  const fetchRandomDog = async () => {
    const res = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(res);
    return res;
  };

  const { data } = useQuery({
    queryKey: ["pies"],
    queryFn: async () => {
      const data = await fetchRandomDog();
      return data;
    },
  });

  useEffect(() => {
    fetchRandomDog();
  }, []);

  console.log(data);

  return (
    <button onClick={fetchRandomDog} className="p-5 bg-blue-700 rounded-lg">
      Fetch
    </button>
  );
}
