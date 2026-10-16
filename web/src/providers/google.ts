import type { LocationProvider, Place, StreetPhoto } from "./types.ts";

/**
 * Google Maps Platform provider. Disabled unless NEXT_PUBLIC_MAP_PROVIDER=google AND a key is set.
 * Key must be restricted (HTTP referrer + API restriction) in Google Cloud Console. Never commit it.
 *
 * Terms (Maps Platform Terms 3.2.3, Service Specific Terms) enforced here:
 *  - Street View / Maps imagery is DISPLAY ONLY: usableAsGenerationReference = false, always.
 *  - Geocoding/Places results must be shown on a Google map (not MapLibre/OSM): map() returns google-js.
 *  - No caching of imagery or results; only place_id / pano_id may be stored.
 *  - "Google" attribution / logo must stay visible.
 */
const KEY = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY) || "";

export const googleProvider: LocationProvider = {
  id: "google",
  attribution: "Google · Données cartographiques © Google",
  map: () => ({ kind: "google-js", mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID, attribution: "© Google" }),

  async search(q, signal): Promise<Place[]> {
    // Places API (New) Text Search, minimal field mask = Essentials (IDs Only) is free; location field bills as Pro.
    const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST", signal,
      headers: { "Content-Type": "application/json", "X-Goog-Api-Key": KEY,
        "X-Goog-FieldMask": "places.id,places.displayName,places.location" },
      body: JSON.stringify({ textQuery: q, maxResultCount: 5 }),
    });
    if (!r.ok) return [];
    const j = await r.json();
    return (j.places ?? []).map((p: any) => ({ id: p.id, name: p.displayName?.text ?? "", lat: p.location.latitude, lon: p.location.longitude }));
  },

  async nearestPhotos(lat, lon, radiusM, signal): Promise<StreetPhoto[]> {
    // Street View Metadata is free (unlimited); the Static image is billed only when displayed.
    const m = await fetch(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lon}&radius=${radiusM}&source=outdoor&key=${KEY}`, { signal });
    const j = await m.json();
    if (j.status !== "OK") return [];
    return [0, 90, 180, 270].map(h => ({
      id: `${j.pano_id}:${h}`, lat: j.location.lat, lon: j.location.lng, heading: h,
      url: `https://maps.googleapis.com/maps/api/streetview?size=640x400&pano=${j.pano_id}&heading=${h}&fov=80&key=${KEY}`,
      author: j.copyright ?? "© Google", license: "© Google — affichage uniquement",
      usableAsGenerationReference: false,
    }));
  },
};
