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

export async function getSupplier(id) {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Supplier not found");
  }

  return data;
}

export async function addSupplier({ newSupplier }) {
  const { data, error } = await supabase
    .from("suppliers")
    .insert(newSupplier)
    .select()
    .single();

  if (error) {
    console.error(error);
    console.log(newSupplier);
    throw new Error("Couldn't create supplier");
  }
  return data;
}

export async function updateSupplier({ id, updated_supplier }) {
  const { data, error } = await supabase
    .from("suppliers")
    .update(updated_supplier)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    console.log(updated_supplier);
    throw new Error("Couldn't update supplier");
  }
  return data;
}

export async function deleteSupplier({ id }) {
  const { data, error } = await supabase
    .from("suppliers")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't delete supplier");
  }
  return data;
}
