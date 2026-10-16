import type { LocationProvider, Place, StreetPhoto } from "./types.ts";

const PHOTON = "https://photon.komoot.io/api/";
const PANORAMAX = "https://api.panoramax.xyz/api";

export const openProvider: LocationProvider = {
  id: "open",
  attribution: "© OpenStreetMap contributors (ODbL) · OpenFreeMap · Photon/komoot · Panoramax (licence par photo)",
  map: () => ({ kind: "maplibre", styleUrl: "https://tiles.openfreemap.org/styles/dark", attribution: "© OpenStreetMap contributors · OpenFreeMap" }),

  async search(q, signal): Promise<Place[]> {
    const r = await fetch(`${PHOTON}?q=${encodeURIComponent(q)}&limit=5`, { signal });
    if (!r.ok) return [];
    const j = await r.json();
    return (j.features ?? []).map((f: any) => ({
      name: [f.properties?.name, f.properties?.city, f.properties?.country].filter(Boolean).join(", "),
      lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1],
    }));
  },

  async nearestPhotos(lat, lon, radiusM, signal): Promise<StreetPhoto[]> {
    const d = radiusM / 111_320, dl = d / Math.max(0.1, Math.cos((lat * Math.PI) / 180));
    const bbox = [lon - dl, lat - d, lon + dl, lat + d].join(",");
    const r = await fetch(`${PANORAMAX}/search?bbox=${bbox}&limit=20`, { signal });
    if (!r.ok) return [];
    const j = await r.json();
    return (j.features ?? []).map((f: any) => {
      const lic = typeof f.properties?.license === "string" ? f.properties.license.trim() : "";
      return {
        id: f.id, lon: f.geometry.coordinates[0], lat: f.geometry.coordinates[1],
        heading: f.properties?.["view:azimuth"],
        url: f.assets?.sd?.href ?? f.assets?.thumb?.href ?? "",
        author: f.providers?.[0]?.name ?? f.properties?.["geovisio:producer"] ?? "Panoramax",
        license: lic || "inconnue",
        sourceUrl: `https://api.panoramax.xyz/#focus=pic&pic=${f.id}`,
        usableAsGenerationReference: lic !== "", // unknown rights → blocked (same rule as U*TTU #104)
      } satisfies StreetPhoto;
    });
  },
};
