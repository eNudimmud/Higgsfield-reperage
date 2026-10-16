# Tarifs Google Maps Platform (source : developers.google.com/maps/billing-and-pricing/pricing, lu le 16.10.2026)

Prix par **1 000 événements facturables**, premier palier après le **quota gratuit mensuel par SKU** :

| SKU (usage ici) | Gratuit/mois | 1 000 suivants (palier 1) |
|---|---|---|
| Dynamic Maps (chargement de carte Maps JS) | 10 000 | 7,00 $ |
| Street View Metadata | illimité | 0 $ |
| Static Street View (image affichée) | 10 000 | 7,00 $ |
| Dynamic Street View (panorama JS) | 5 000 | 14,00 $ |
| Geocoding | 10 000 | 5,00 $ |
| Places Autocomplete Requests (Essentials) | 10 000 | 2,83 $ |
| Places Text Search Essentials (IDs Only) | illimité | 0 $ |
| Places Text Search Pro (avec `location`) | 5 000 | 32,00 $ |
| Map Tiles 2D | 100 000 | 0,60 $ |
| Map Tiles Street View | 100 000 | 2,00 $ |
| Map Tiles Photorealistic 3D | 1 000 | 6,00 $ |

**Estimation par session de repérage** (1 carte, 1 recherche, 1 métadonnée, 4 vues Static) :
- avec Text Search Pro : 7/1000 + 32/1000 + 0 + 4×7/1000 ≈ **0,067 $** ;
- avec Autocomplete + Geocoding : ≈ 7 + 2,83 + 5 + 28 = **0,043 $**. On recommande donc l'autocomplete + geocoding.

Pour 1 000 sessions : environ 43–67 $ au-delà des quotas gratuits. Avec les quotas gratuits, environ **2 500 sessions/mois** restent gratuites (10 000 Static ÷ 4). Pour une démo de concours, le coût attendu est **0 $**.
