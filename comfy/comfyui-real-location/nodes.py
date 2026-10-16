import json
import urllib.parse
import urllib.request

UA = "comfyui-real-location/0.1 (+https://github.com/eNudimmud/Higgsfield-reperage)"
PANORAMAX = "https://api.panoramax.xyz/api"
PHOTON = "https://photon.komoot.io/api/"


def _get(url, timeout=10):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def bbox_for(lat, lon, radius_m):
    import math
    d = radius_m / 111_320
    dl = d / max(0.1, math.cos(math.radians(lat)))
    return (lon - dl, lat - d, lon + dl, lat + d)


def pick_reusable(features):
    """First feature with an identified licence; unknown rights are never used as references."""
    for f in features:
        lic = (f.get("properties") or {}).get("license")
        if isinstance(lic, str) and lic.strip():
            return f
    return None


class LocationSearch:
    CATEGORY = "real-location"
    RETURN_TYPES = ("FLOAT", "FLOAT", "STRING")
    RETURN_NAMES = ("lat", "lon", "label")
    FUNCTION = "run"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {"query": ("STRING", {"default": "Lausanne, Ouchy"})}}

    def run(self, query):
        j = json.loads(_get(f"{PHOTON}?q={urllib.parse.quote(query)}&limit=1"))
        f = (j.get("features") or [None])[0]
        if not f:
            raise ValueError("Lieu introuvable")
        lon, lat = f["geometry"]["coordinates"]
        p = f.get("properties", {})
        return (lat, lon, ", ".join(x for x in [p.get("name"), p.get("city"), p.get("country")] if x))


class PanoramaxNearestPhoto:
    CATEGORY = "real-location"
    RETURN_TYPES = ("IMAGE", "STRING")
    RETURN_NAMES = ("image", "attribution")
    FUNCTION = "run"

    @classmethod
    def INPUT_TYPES(cls):
        return {"required": {
            "lat": ("FLOAT", {"default": 46.507, "step": 0.0001}),
            "lon": ("FLOAT", {"default": 6.627, "step": 0.0001}),
            "radius_m": ("INT", {"default": 300, "min": 50, "max": 3000}),
        }}

    def run(self, lat, lon, radius_m):
        import io
        import numpy as np
        import torch
        from PIL import Image
        b = ",".join(str(x) for x in bbox_for(lat, lon, radius_m))
        j = json.loads(_get(f"{PANORAMAX}/search?bbox={b}&limit=20"))
        f = pick_reusable(j.get("features") or [])
        if not f:
            raise ValueError("Aucune photo Panoramax réutilisable ici")
        href = (f.get("assets", {}).get("sd") or f.get("assets", {}).get("thumb") or {}).get("href")
        img = Image.open(io.BytesIO(_get(href))).convert("RGB")
        t = torch.from_numpy(np.asarray(img).astype("float32") / 255.0)[None, ...]
        p = f.get("properties", {})
        credit = f"Panoramax · {p.get('license')} · {(f.get('providers') or [{}])[0].get('name', 'auteur inconnu')} · {f.get('id')}"
        return (t, credit)


NODE_CLASS_MAPPINGS = {
    "RealLocationSearch": LocationSearch,
    "RealLocationPanoramaxNearest": PanoramaxNearestPhoto,
}
NODE_DISPLAY_NAME_MAPPINGS = {
    "RealLocationSearch": "Location Search (Photon/OSM)",
    "RealLocationPanoramaxNearest": "Panoramax Nearest Photo (licensed)",
}
