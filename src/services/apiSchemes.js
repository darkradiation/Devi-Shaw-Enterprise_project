import supabase from "./supabase";

export async function getSchemesFar() {
  let { data, error } = await supabase
    .from("schemes_far")
    .select("*,stock(id,item_name)")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes far");
  }

  return data;
}

export async function getSchemeFarByItemId({ item_id }) {
  let { data, error } = await supabase
    .from("schemes_far")
    .select("*,stock(id,item_name)")
    .eq("item_id", item_id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch scheme far");
  }

  return data;
}

export async function updateSchemeFar({ item_id, new_scheme }) {
  // console.log(item_id, new_scheme);

  const { data, error } = await supabase
    .from("schemes_far")
    .update(new_scheme)
    .eq("item_id", item_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't update scheme far");
  }
  return data;
}

export async function addSchemeNear({ scheme }) {
  const { data, error } = await supabase
    .from("scheme_far")
    .insert(scheme)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't add scheme far.");
  }
  return data;
}

//------------------------------------------------------------------------------------

export async function getSchemesNear() {
  let { data, error } = await supabase
    .from("schemes_near")
    .select("*,stock(id,item_name)")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes near");
  }

  return data;
}

export async function getSchemeNearByItemId({ item_id }) {
  let { data, error } = await supabase
    .from("schemes_near")
    .select("*,stock(id,item_name)")
    .eq("item_id", item_id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes near");
  }

  return data;
}

export async function updateSchemeNear({ item_id, new_scheme }) {
  // console.log(item_id, new_scheme);

  const { data, error } = await supabase
    .from("schemes_near")
    .update(new_scheme)
    .eq("item_id", item_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't update scheme near");
  }
  return data;
}

export async function addSchemeFar({ scheme }) {
  const { data, error } = await supabase
    .from("scheme_near")
    .insert(scheme)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't add scheme near.");
  }
  return data;
}
