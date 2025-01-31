import supabase from "./supabase";

export async function getStockHistory() {
  let { data, error } = await supabase
    .from("stock_history")
    .select("*")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch stock history");
  }

  return data;
}

export async function addStockHistory({ entry }) {
  console.log(entry);
  const { data, error } = await supabase
    .from("stock_history")
    .insert(entry)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't add it to stock history");
  }
  return data;
}
