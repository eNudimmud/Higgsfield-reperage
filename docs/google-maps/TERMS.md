# Conditions Google, points bloquants (texte officiel lu le 16.10.2026)

Sources : https://cloud.google.com/maps-platform/terms (Maps Platform Terms, §3.2.3) et https://cloud.google.com/maps-platform/terms/maps-service-terms

1. **Interdiction de créer du contenu à partir de Google Maps Content** (§3.2.3(c)) : « Customer will not create content based on Google Maps Content », avec explicitement (vii) « use Google Maps Content to improve machine learning and artificial intelligence models, including to train, test, validate or fine-tune ».
   → **Une image Street View utilisée comme référence img2img pour FLUX/Comfy = contenu créé à partir de Google Maps Content : NON autorisé.** Le code force `usableAsGenerationReference=false` pour Google.
2. **Pas de scraping ni de stockage** (§3.2.3(a)) : interdit de pré-charger, indexer, stocker, repartager ou réhéberger hors des services, et de télécharger en masse des images Street View.
3. **Pas de cache** (§3.2.3(b)) sauf ce que prévoient les Service Terms : seuls les identifiants (`place_id`, `pano_id`) peuvent être conservés. Lat/lng issus de Geocoding : 30 jours maximum.
4. **Geocoding et Places sur une carte Google uniquement** (Service Terms §6.2 : « must not use … in conjunction with a non-Google map »). En mode Google, on ne peut pas garder MapLibre/OSM.
5. **Attribution obligatoire** (Service Terms §2) : logo et copyright Google visibles, avec le copyright de chaque image Street View.
6. **Pas de re-création d'un produit Google** (§3.2.3(d)) : l'app doit apporter une valeur indépendante (c'est le cas : la génération de décor se fait à partir de sources ouvertes).

**Question ouverte :** se servir des coordonnées d'un résultat Places pour récupérer une photo Panoramax, puis générer à partir de cette photo, pourrait être lu comme « créer du contenu à partir de » Google. Pour être prudent, en mode Google, la référence de génération part des coordonnées **cliquées par l'utilisateur** sur la carte. À faire valider juridiquement si l'on vise un usage commercial.

**Conclusion pour le concours :** garder **les sources ouvertes par défaut**, seules à alimenter la génération. Google ne sert qu'au confort de navigation, en affichage uniquement, et reste désactivé tant que JD n'a pas donné une clé et son accord.
