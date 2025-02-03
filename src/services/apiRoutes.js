import supabase from "./supabase";

export async function getRoutes() {
  let { data, error } = await supabase
    .from("routes")
    .select("*")
    .order("id", { ascending: 1 });

  if (error) {
    console.error(error);
    throw new Error("Couldn't fetch routes");
  }

  return data;
}

export async function getRoute(id) {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Route not found");
  }

  return data;
}

export async function addRoute({ newRoute }) {
  const { data, error } = await supabase
    .from("routes")
    .insert(newRoute)
    .select()
    .single();

  if (error) {
    console.error(error);
    console.log(newRoute);
    throw new Error("Couldn't create route");
  }
  return data;
}

export async function updateRoute({ id, updated_route }) {
  const { data, error } = await supabase
    .from("routes")
    .update(updated_route)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    console.log(updated_route);
    throw new Error("Couldn't update route");
  }
  return data;
}

export async function deleteRoute({ id }) {
  const { data, error } = await supabase
    .from("routes")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't delete route");
  }
  return data;
}
