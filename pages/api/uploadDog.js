// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { supabase } from "@/components/supabaseClient";

export default async function handler(req, res) {
  const dog = req.body.dog;

  const breed = dog.breed;

  const allDogs = await supabase
    .from("topdawgs")
    .select("*")
    .eq("breed", breed);

  console.log(allDogs);

  if (allDogs.data.length > 0) {
    const update = await supabase
      .from("topdawgs")
      .update({ breed_hits: allDogs.data[0].breed_hits + 1 })
      .eq("breed", breed);

    console.log(update);
    res.status(200).json({ data: update });
  } else {
    const insert = await supabase.from("topdawgs").insert([
      {
        breed: breed,
        breed_hits: 1,
      },
    ]);

    res.status(200).json({ data: insert });
  }
}
