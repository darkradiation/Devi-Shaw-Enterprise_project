import supabase, { supabaseUrl } from "./supabase";

export async function getStockLevel() {
  let { data, error } = await supabase
    .from("stock_level")
    .select("*")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch stock level");
  }

  return data;
}

export async function addStockLevel({ entry }) {
  // console.log(entry);
  const { data, error } = await supabase
    .from("stock_level")
    .insert(entry)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't add stock level");
  }
  return data;
}
