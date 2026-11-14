# Productos, categorías y edades

La clasificación automática reutiliza etiquetas exactas, sin modificar datos de Shopify. Primero usa una etiqueta específica: `regalo-sets`, `regalo-pijamas`, `regalo-ropita`, `regalo-mantas` o `regalo-accesorios`. Si hay varias específicas contradictorias, excluye el producto hasta corregir el mapeo. Si no hay etiquetas específicas, la prioridad es: sets (`set de regalo`), mantas (`manta`), ropa interior (`underwear` → clothing), accesorios (`accesorios`), pijamas (`pj bebe`, `pj grande`, `pj camison`, `pj short`, `pijama`) y ropa (`ropa`). Un bloque de producto permite reemplazar explícitamente la categoría. Una categoría desconocida queda fuera, también en Surprise me.

La prioridad evita clasificar gorros como pijamas cuando tienen tanto `accesorios` como `pj bebe`, y ropa interior cuando lleva `underwear` y `pj grande`. Al incorporar nuevos productos hay que revisar etiquetas contradictorias y usar el override cuando corresponda. Un set comercial no se deduce únicamente de la palabra SET del título.

Se lee la opción de variante cuyo nombre sea Talla, Size o Tamaño (sin distinguir mayúsculas). La equivalencia usa el valor completo normalizado a minúsculas y con espacios recortados, no coincidencias parciales ni números extraídos de títulos.

Equivalencias iniciales basadas en tallas observadas en muestras reales de `pj bebe` y `pj grande`:

| Valores | Grupo |
|---|---|
| Nb / NB | newborn |
| 3m | 0-3 |
| 6m, 9m | 3-12 |
| 12m, 18m, 24m, 3t, 4t | 1-5 |
| 6t, 8t, 10t | 5-10 |

Decisión de límites: la talla nominal 3m representa el primer grupo de meses, mientras 12m se asigna al grupo de 1–5 años. Esto es una equivalencia de talla nominal, no una garantía de ajuste para todo niño del grupo. Antes del lanzamiento el comerciante debe revisarla contra su tabla de tallas. No hay evidencia observada para todas las posibles nomenclaturas; otras tallas se incorporan en el JSON editable después de verificarlas.

No se interpretan `So`, `DO (prematuro)`, tallas numéricas de anillos, S/M, TU o ONE SIZE como edades. Para un artículo sin talla se marca la casilla correspondiente y se aprueban sus grupos de edad en el bloque; por defecto ninguno. El tag `bebe` no basta para aprobar una almohada para recién nacidos.

La plantilla pública no contiene productos seleccionados. Antes de activar la guía, seleccionar candidatos infantiles con `gift_shop`, revisar su categoría y edad, y confirmar que existan variantes disponibles dentro de los presupuestos. No interpretar tallas numéricas de joyería como edades ni inventar precios para producir resultados.
