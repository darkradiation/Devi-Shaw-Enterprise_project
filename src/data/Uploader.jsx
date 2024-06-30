import { FiUpload } from "react-icons/fi";
import ButtonIcon from "../ui/ButtonIcon";

import supabase from "../services/supabase";
import { orders } from "./orders";
import { useState } from "react";

async function deleteOrders() {
  const { error } = await supabase.from("orders").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function addOrders() {
  const { error } = await supabase.from("orders").insert(orders);
  if (error) console.log(error.message);
}
function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadOrders() {
    setIsLoading(true);
    await deleteOrders();
    await addOrders();
    setIsLoading(false);
  }

  return (
    <ButtonIcon onClick={uploadOrders} disabled={isLoading}>
      <FiUpload />
    </ButtonIcon>
  );
}

export default Uploader;
