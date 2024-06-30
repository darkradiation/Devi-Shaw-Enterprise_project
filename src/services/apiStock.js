import supabase from "./supabase";

export async function getStock() {
  let { data, error } = await supabase.from("stock").select("*").order("id", {
    ascending: 1,
  });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch stock");
  }

  return data;
}

export async function getStockItem(id) {
  const { data, error } = await supabase
    .from("stock")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Stock item not found");
  }

  return data;
}

export async function addStockItem({ new_stock }) {
  const { data, error } = await supabase
    .from("stock")
    .insert(new_stock)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't add stock item");
  }
  return data;
}

export async function updateStockItem({ id, updated_stock }) {
  const { data, error } = await supabase
    .from("stock")
    .update(updated_stock)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't update stock");
  }
  return data;
}

export async function deleteStockItem({ id }) {
  const { data, error } = await supabase
    .from("stock")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't delete stock item");
  }
  return data;
}
