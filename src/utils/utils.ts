import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const COLOR_PER_TYPE = {
  normal: "#a5a67d",
  fighting: "#e26710",
  flying: "#ae9aef",
  poison: "#9a57ae",
  ground: "#a87944",
  rock: "#62605f",
  bug: "#cfe70c",
  ghost: "#6659b0",
  steel: "#a0b2b6",
  fire: "#eb453e",
  water: "#26adf2",
  grass: "#71c74c",
  electric: "#eee006",
  psychic: "#e46cba",
  ice: "#18d9de",
  dragon: "#4b37e2",
  dark: "#375a65",
  fairy: "#f2ade9",
} as const;