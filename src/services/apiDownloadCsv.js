import supabase from "./supabase";

export async function downloadOrdersCSV({ startDate, endDate }) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .gte("order_date", startDate)
    .lt("order_date", endDate)
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export async function downloadStockHistoryCSV({ startDate, endDate }) {
  const { data, error } = await supabase
    .from("stock_history")
    .select("*")
    .gte("date", startDate)
    .lt("date", endDate)
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "stock_history.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export async function downloadCustomersCSV() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}


export async function downloadSuppliersCSV() {
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "suppliers.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export async function downloadRoutesCSV() {
  const { data, error } = await supabase
    .from("routes")
    .select("*")
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "routes.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export async function downloadSchemes1CSV() {
  const { data, error } = await supabase
    .from("schemes_1")
    .select("*")
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schemes_1.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export async function downloadSchemes2CSV() {
  const { data, error } = await supabase
    .from("schemes_2")
    .select("*")
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schemes_2.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
export async function downloadSchemes3CSV() {
  const { data, error } = await supabase
    .from("schemes_3")
    .select("*")
    .order("id", { ascending: true })
    .csv();

  if (error) {
    console.error("Error fetching CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schemes_3.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

// ------------------------

export async function downloadModifiedOrdersCSV({ startDate, endDate }) {
  const { data, error } = await supabase
    .rpc("get_modified_orders", { start_date: startDate, end_date: endDate })
    .csv();

  if (error) {
    console.error("Error fetching modified orders CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `modified_orders_${startDate}_${endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export async function downloadModifiedStockHistoryCSV({ startDate, endDate }) {
  const { data, error } = await supabase
    .rpc("get_modified_stock_history", { start_date: startDate, end_date: endDate })
    .csv();

  if (error) {
    console.error("Error fetching modified stock history CSV data:", error);
  } else {
    const blob = new Blob([data], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `modified_stock_history_${startDate}_${endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
