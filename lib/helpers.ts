import { MAX_FILE_SIZE } from "@/utils/constants";

export const fileToBase64 = (file: File | null): Promise<string> =>
  new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      reject(new Error("Invalid file"));
      return;
    }

    if (file.size === 0) {
      reject(new Error(`${file.name} is empty (0 bytes)`));
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      reject(
        new Error(
          `${file.name} exceeds ${MAX_FILE_SIZE / (1024 * 1024)} size limit`,
        ),
      );
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error(`Failed to read ${file.name}`));
    };

    reader.onabort = () => {
      reject(new Error(`Reading ${file.name} was aborted`));
    };

    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result.split(",")[1];
        if (!base64String) {
          reject(new Error(`Failed to process ${file.name}: Empty content`));
          return;
        }
        resolve(base64String);
      } else {
        reject(new Error(`Failed to process ${file.name}`));
      }
    };

    reader.readAsDataURL(file);
  });

export function formatName(name: string): string {
  return name
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export const formatAmountInr = (value: number | string | undefined) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

export function autoFormatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;

  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export function formatDateTime(value?: string | Date): {
  date: string;
  time: string;
} {
  if (!value) return { date: "N/A", time: "N/A" };
  const d = new Date(value);
  if (isNaN(d.getTime())) return { date: "N/A", time: "N/A" };

  const date = d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  const time = d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return { date, time };
}

export function formatDate(value?: string | Date): string {
  return formatDateTime(value).date;
}

export function formatTime(value?: string | Date): string {
  return formatDateTime(value).time;
}
