import supabase from "./supabase";

export async function getSuppliers() {
  let { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch suppliers");
  }

  return data;
}
