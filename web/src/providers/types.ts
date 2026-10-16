// Provider abstraction: open sources by default, Google only when explicitly enabled.
export type ProviderId = "open" | "google";

export interface Place { name: string; lat: number; lon: number; id?: string }

export interface StreetPhoto {
  id: string;
  lat: number;
  lon: number;
  heading?: number;
  /** URL usable for display in the UI. */
  url: string;
  author: string;
  license: string;     // e.g. "CC BY-SA 4.0" or "© Google"
  sourceUrl?: string;
  /**
   * May this image be sent to an image model (Comfy) as a reference?
   * Open licences: true. Google: ALWAYS false (Maps Platform Terms 3.2.3(c)).
   */
  usableAsGenerationReference: boolean;
}

export interface MapStyle { kind: "maplibre"; styleUrl: string; attribution: string }
export interface GoogleMapStyle { kind: "google-js"; mapId?: string; attribution: string }

export interface LocationProvider {
  id: ProviderId;
  search(query: string, signal?: AbortSignal): Promise<Place[]>;
  nearestPhotos(lat: number, lon: number, radiusM: number, signal?: AbortSignal): Promise<StreetPhoto[]>;
  map(): MapStyle | GoogleMapStyle;
  /** Text that must stay visible on screen whenever this provider's content is shown. */
  attribution: string;
}
