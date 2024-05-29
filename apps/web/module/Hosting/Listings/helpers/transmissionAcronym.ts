const transmissionAcronym = (value: "Automatic" | "Manual") => {
  if (value === "Automatic") {
    return "AT"
  } else if (value === "Manual") {
    return "MT"
  } else if (value === "Semi-Automatic") {
    return "SAT"
  } else {
    return ""
  }
}

export default transmissionAcronym
