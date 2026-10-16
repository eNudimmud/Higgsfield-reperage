# Option Google Maps — prête à activer (désactivée par défaut)

Option préparée sur la branche `option/google-maps` (PR brouillon). **Désactivée par défaut.**

## Contenu
- `web/src/providers/types.ts` : interface `LocationProvider` (recherche, photos proches, carte, attribution) et indicateur `usableAsGenerationReference`.
- `web/src/providers/open.ts` : par défaut Photon, OSM/OpenFreeMap et Panoramax. Une photo sans licence identifiée est bloquée comme référence.
- `web/src/providers/google.ts` : Places API (New) Text Search, Maps JS (carte Google), Street View Metadata (gratuit) et Static (affichage).
- `web/src/providers/index.ts` : `getProvider()` (Google seulement si drapeau ET clé), `assertGenerationReference()`, `generationReferencesNear()` (référence ouverte au même endroit).
- `web/tests/providers.test.ts` : 2 tests (`node --experimental-strip-types --test`), qui passent.
- `.env.example` (aucune clé), `PRICING.md`, `TERMS.md`.

## Activation (plus tard, avec l'OK de JD)
1. Google Cloud : créer un projet, activer la facturation, activer Places API (New), Maps JavaScript API et Street View Static API.
2. Créer une clé restreinte : **référents HTTP** (domaine Vercel) et **restriction aux 3 API**. Mettre un **budget et une alerte** (par ex. 10 $/mois) et des quotas journaliers.
3. Vercel : `NEXT_PUBLIC_MAP_PROVIDER=google`, `NEXT_PUBLIC_GOOGLE_MAPS_KEY=…`, puis éventuellement `NEXT_PUBLIC_GOOGLE_MAP_ID`. Ne jamais committer la clé.
4. En mode Google, l'UI doit afficher la carte avec Maps JS (`@googlemaps/js-api-loader`), **pas MapLibre**. Le logo et le copyright Google restent visibles. Le bouton « Générer » prend la photo Panoramax la plus proche (`generationReferencesNear`), **jamais** l'image Street View.
