export default function capitalizeFirst(str:string) {
  if (!str) return "";
  const cleaned = str.replace(/_/g, " ").toLowerCase();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
