import supabase from "./supabase";

export async function getSchemes1() {
  let { data, error } = await supabase
    .from("schemes_1")
    .select("*,stock(id,item_name)")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes 1");
  }

  return data;
}

export async function getScheme1ByItemId({ item_id }) {
  let { data, error } = await supabase
    .from("schemes_1")
    .select("*,stock(id,item_name)")
    .eq("item_id", item_id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes 1");
  }

  return data;
}

export async function updateScheme1({ item_id, new_scheme }) {
  // console.log(item_id, new_scheme);

  const { data, error } = await supabase
    .from("schemes_1")
    .update(new_scheme)
    .eq("item_id", item_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't update scheme 1");
  }
  return data;
}

// -----------------------------------------------------------------

export async function getSchemes2() {
  let { data, error } = await supabase
    .from("schemes_2")
    .select("*,stock(id,item_name)")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes 2");
  }

  return data;
}

export async function getScheme2ByItemId({ item_id }) {
  let { data, error } = await supabase
    .from("schemes_2")
    .select("*,stock(id,item_name)")
    .eq("item_id", item_id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch scheme 2");
  }

  return data;
}

export async function updateScheme2({ item_id, new_scheme }) {
  // console.log(item_id, new_scheme);

  const { data, error } = await supabase
    .from("schemes_2")
    .update(new_scheme)
    .eq("item_id", item_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't update scheme 2");
  }
  return data;
}

//------------------------------------------------------------------------------------

export async function getSchemes3() {
  let { data, error } = await supabase
    .from("schemes_3")
    .select("*,stock(id,item_name)")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes 3");
  }

  return data;
}

export async function getScheme3ByItemId({ item_id }) {
  let { data, error } = await supabase
    .from("schemes_3")
    .select("*,stock(id,item_name)")
    .eq("item_id", item_id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch schemes 3");
  }

  return data;
}

export async function updateScheme3({ item_id, new_scheme }) {
  // console.log(item_id, new_scheme);

  const { data, error } = await supabase
    .from("schemes_3")
    .update(new_scheme)
    .eq("item_id", item_id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't update scheme 3");
  }
  return data;
}
