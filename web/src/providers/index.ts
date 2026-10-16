import { openProvider } from "./open.ts";
import { googleProvider } from "./google.ts";
import type { LocationProvider, StreetPhoto } from "./types.ts";
export * from "./types.ts";

/** Open sources unless explicitly switched AND a key exists. */
export function getProvider(): LocationProvider {
  const want = process.env.NEXT_PUBLIC_MAP_PROVIDER;
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  return want === "google" && key ? googleProvider : openProvider;
}

/** Gate used before any upload to Comfy. Throws for Google imagery or unknown rights. */
export function assertGenerationReference(p: StreetPhoto): void {
  if (!p.usableAsGenerationReference)
    throw new Error("Cette image ne peut pas servir de référence de génération (droits). Utilise une photo Panoramax ou la tienne.");
}

/**
 * Hybrid flow allowed in Google mode: browse/frame with Google (display only), then fetch the
 * nearest OPEN photo for the same coordinates as the generation reference. Note: coordinates typed or
 * clicked by the user are the user's own input; do not reuse Places lat/lng for content beyond display
 * (see TERMS.md, open question).
 */
export async function generationReferencesNear(lat: number, lon: number, radiusM = 300, signal?: AbortSignal) {
  return (await openProvider.nearestPhotos(lat, lon, radiusM, signal)).filter(p => p.usableAsGenerationReference);
}
