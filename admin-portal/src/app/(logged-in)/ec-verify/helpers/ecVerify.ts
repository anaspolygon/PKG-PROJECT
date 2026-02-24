export function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function toBanglaDigits(number: string) {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    ?.toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit, 10)] || digit)
    .join("");
}


export function fromBanglaDigits(banglaNumber:string) {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

  return banglaNumber
    .split("")
    .map(char => {
      const index = banglaDigits.indexOf(char);
      return index !== -1 ? englishDigits[index] : char;
    })
    .join("");
}