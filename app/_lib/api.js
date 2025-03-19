import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getNewBookings() {
  const { data, error } = await supabase.from("bookings").select("*");
  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data;
}

export async function getBookingsByDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("date", date) // Filter by selected date
    .order("time", { ascending: true }); // Sort by time

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return data;
}

export async function addBooking(bookingDetail) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([bookingDetail]);

  if (error) {
    console.log("Error adding booking", error);
  }
  return { data };
}

////STATS
export async function getGuestStats() {
  const { data, error } = await supabase.from("bookings").select("date");
  return data;
}
export async function getPeakTimeStats() {
  const { data, error } = await supabase.from("bookings").select("time");

  return data;
}
