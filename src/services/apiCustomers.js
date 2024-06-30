import supabase, { supabaseUrl } from "./supabase";

export async function getCustomers() {
  let { data, error } = await supabase
    .from("customers")
    .select("*,routes(*)")
    .order("id", {
      ascending: 1,
    });

  if (error) {
    console.log(error);
    throw new Error("Couldn't fetch customers");
  }

  return data;
}

export async function getCustomerById({ id }) {
  const { data, error } = await supabase
    .from("customers")
    .select("* ,routes(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("No customer found with id " + id);
  }

  return data;
}

export async function getCustomerByStoreName({ store_name }) {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .eq("store_name", store_name)
    .single();

  if (error) {
    console.error(error);
    throw new Error("No customer found  with store name " + store_name);
  }

  return data;
}

export async function addCustomer({ new_customer }) {
  console.log(new_customer.owner_picture);
  console.log(new_customer.store_picture);

  const hasOwnerPicPath = new_customer.owner_picture?.startsWith?.(supabaseUrl);

  const ownerPicName = `${Math.random()}-${
    new_customer.owner_picture?.name
  }`.replaceAll("/", "");

  const ownerPicPath = hasOwnerPicPath
    ? new_customer.owner_picture
    : `${supabaseUrl}/storage/v1/object/public/customer_owner_pictures/${ownerPicName}`;

  const hasStorePicPath = new_customer.store_picture?.startsWith?.(supabaseUrl);

  const storePicName = `${Math.random()}-${
    new_customer.store_picture?.name
  }`.replaceAll("/", "");

  const storePicPath = hasStorePicPath
    ? new_customer.store_picture
    : `${supabaseUrl}/storage/v1/object/public/customer_store_pictures/${storePicName}`;

  const { data, error } = await supabase
    .from("customers")
    .insert([
      {
        ...new_customer,
        owner_picture: ownerPicPath,
        store_picture: storePicPath,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Customer could not be created");
  }

  // 2. Upload image and delete the customer if error uploading image
  if (hasOwnerPicPath && hasStorePicPath) return data;

  if (!hasOwnerPicPath) {
    const { error: storageErrorOwnerPicture } = await supabase.storage
      .from("customer_owner_pictures")
      .upload(ownerPicName, new_customer.owner_picture);
    if (storageErrorOwnerPicture) {
      await supabase.from("customers").delete().eq("id", data.id);
      console.error(storageErrorOwnerPicture);
      throw new Error(
        "Owner picture could not be uploaded and the customer was not created"
      );
    }
  }

  if (!hasStorePicPath) {
    const { error: storageErrorStorePicture } = await supabase.storage
      .from("customer_store_pictures")
      .upload(storePicName, new_customer.store_picture);
    if (storageErrorStorePicture) {
      await supabase.from("customers").delete().eq("id", data.id);
      console.error(storageErrorStorePicture);
      throw new Error(
        "Store picture could not be uploaded and the customer was not created"
      );
    }
  }

  return data;
}

export async function updateCustomer({ id, updated_customer }) {
  console.log(updated_customer.owner_picture);
  console.log(updated_customer.store_picture);
  const hasOwnerPicPath =
    updated_customer.owner_picture?.startsWith?.(supabaseUrl);
  const ownerPicName = `${Math.random()}-${
    updated_customer.owner_picture?.name
  }`.replaceAll("/", "");
  const ownerPicPath = hasOwnerPicPath
    ? updated_customer.owner_picture
    : `${supabaseUrl}/storage/v1/object/public/customer_owner_pictures/${ownerPicName}`;

  const hasStorePicPath =
    updated_customer.store_picture?.startsWith?.(supabaseUrl);
  const storePicName = `${Math.random()}-${
    updated_customer.store_picture?.name
  }`.replaceAll("/", "");
  const storePicPath = hasStorePicPath
    ? updated_customer.store_picture
    : `${supabaseUrl}/storage/v1/object/public/customer_store_pictures/${storePicName}`;

  const { data, error } = await supabase
    .from("customers")
    .update({
      ...updated_customer,
      owner_picture: ownerPicPath,
      store_picture: storePicPath,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Customer could not be updated");
  }

  // 2. Upload image and delete the customer if error uploading image
  if (hasOwnerPicPath && hasStorePicPath) return data;

  if (!hasOwnerPicPath) {
    const { error: storageErrorOwnerPicture } = await supabase.storage
      .from("customer_owner_pictures")
      .upload(ownerPicName, updated_customer.owner_picture);
    if (storageErrorOwnerPicture) {
      await supabase.from("customers").delete().eq("id", data.id);
      console.error(storageErrorOwnerPicture);
      throw new Error(
        "Owner picture could not be uploaded and the customer was not updated"
      );
    }
  }

  if (!hasStorePicPath) {
    const { error: storageErrorStorePicture } = await supabase.storage
      .from("customer_store_pictures")
      .upload(storePicName, updated_customer.store_picture);
    if (storageErrorStorePicture) {
      await supabase.from("customers").delete().eq("id", data.id);
      console.error(storageErrorStorePicture);
      throw new Error(
        "Store picture could not be uploaded and the customer was not updated"
      );
    }
  }

  return data;
}

export async function deleteCustomer({ id }) {
  const { data, error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't delete customer");
  }
  return data;
}
