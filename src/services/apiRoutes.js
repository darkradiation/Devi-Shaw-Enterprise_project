import supabase from "./supabase";

export async function getRoutes() {
  let { data, error } = await supabase.from("routes").select("*").order("id", {
    ascending: 1,
  });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch routes");
  }

  return data;
}
