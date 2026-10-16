# Repérage — du vrai lieu au décor de cinéma

**FR** · Choisis un endroit sur une carte du monde, prends la photo de rue libre la plus proche, et transforme-la en décor (heure, météo, ambiance) avec **FLUX 3 Image Klein** via la **Comfy Developer Platform**. L'auteur et la licence de la photo suivent jusqu'au rendu.

**EN** · Pick a place on a world map, grab the nearest openly-licensed street photo, and turn it into a film set (time of day, weather, mood) with **FLUX 3 Image Klein** through the **Comfy Developer Platform**. The photo's author and licence travel with the render.

Projet open source pour le concours Comfy **#OpenSourceHiggsfield** (entry for the Comfy “Open Source Higgsfield” contest). Brique « DÉCOR » extraite de U*TTU Studio.

> Statut / status : squelette. Repérage porté et testé ; nœuds ComfyUI et app web en cours.

## Structure
| Dossier | Contenu |
|---|---|
| `web/` | App web (carte → photos → décor). `src/lib/repere/` : recherche Photon, photos Panoramax (catalogue fédéré, licences), Mapillary optionnel, tests. |
| `comfy/comfyui-real-location/` | Custom nodes ComfyUI : *Location Search (Photon/OSM)*, *Panoramax Nearest Photo (licensed)*. |
| `workflows/` | Workflows ComfyUI, **FLUX 3 Image Klein** comme modèle principal (edit : photo → décor ; t2i). |

## Sources ouvertes et attributions / Open sources & attribution
- Carte : © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright) (ODbL), tuiles [OpenFreeMap](https://openfreemap.org).
- Recherche : [Photon](https://photon.komoot.io) (komoot, données OSM) — usage raisonnable du serveur public.
- Photos de rue : [Panoramax](https://panoramax.fr), en général **CC BY-SA 4.0** (licence lue par photo). Auteur, licence et lien sont conservés ; une photo aux droits inconnus n'est jamais utilisée comme référence. Les décors dérivés d'une photo CC BY-SA sont publiés sous CC BY-SA.
- Mapillary (optionnel, jeton utilisateur) : CC BY-SA.
- Modèle : FLUX 3 Image Klein, [FLUX Kommunity License](https://bfl.ai/licensing) (poids non distribués ici).

## Lancer en local / Run locally
Node ≥ 22.6, Python ≥ 3.10.

    cd web && npm test                         # repérage
    python -m unittest discover -s comfy/tests # nœuds
    cp -r comfy/comfyui-real-location <ComfyUI>/custom_nodes/

Puis ouvrir `workflows/decor_from_street_klein_edit.json` dans ComfyUI, ou le lancer via Comfy Cloud API (`COMFY_API_KEY`, voir `.env.example` ; ne jamais committer de clé).

## Provenance
Le code `web/src/lib/repere/` vient de U*TTU Studio, **branche `audit/production-reliability-20261014` (PR #104, commit `73ec49f`)**, version corrigée (recherche unique, catalogue fédéré HTTPS, rayons 300 m / 1 km / 3 km, licences conservées). Les tests qui dépendaient du reste du studio ont été retirés.

## Licence
[MIT](LICENSE) © 2026 eNudimmud. Les données et images tierces gardent leur propre licence.

## CI
`docs/ci.yml` est le workflow de tests (Node + Python + JSON). À placer dans `.github/workflows/ci.yml` (le jeton de l'agent n'a pas le droit `workflow`).
