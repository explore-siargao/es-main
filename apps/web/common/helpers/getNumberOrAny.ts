const getNumberOrAny = (value: string | null): number | "any" => {
  return value === "any" ? "any" : value ? Number(value) : "any";
};

export default getNumberOrAny