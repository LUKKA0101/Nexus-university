export function formatDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function formatDatesInArray<
  T extends { birthDate: Date; createdAt: Date },
>(
  data: T[],
): (Omit<T, "birthDate" | "createdAt"> & {
  birthDate: string;
  createdAt: string;
})[] {
  return data.map((item) => ({
    ...item,
    birthDate: formatDateOnly(item.birthDate),
    createdAt: formatDateOnly(item.createdAt),
  }));
}
