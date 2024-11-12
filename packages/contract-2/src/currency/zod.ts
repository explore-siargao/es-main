import z from "zod";
import { E_Supported_Currencies } from "./enum";

export const Z_Supported_Currency = z.nativeEnum(E_Supported_Currencies)