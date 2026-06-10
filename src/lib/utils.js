import { clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function convertUtcToLocal(
  isoString,
  formatString = "MMM dd, yyyy hh:mm a"
) {
  if (!isoString) return "";

  const date = new Date(isoString);

  // Extracting individual components
  const year = date.getUTCFullYear();
  const month = date.toLocaleString("default", { month: "short" }); // "Dec" for December
  const day = date.getUTCDate();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

  // Formatting the output as "Dec 30, 2024 02:30 PM"
  const formattedDate = `${month} ${day}, ${year} ${formattedTime}`;

  return formattedDate;
}
