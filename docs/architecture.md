# Arquitectura y mantenimiento

La plantilla JSON conserva el layout del tema y carga una sección. CSS y JavaScript solo se solicitan al renderizarla. No se modifican header, footer, búsqueda, carrito, productos ni ajustes globales.

La sección emite JSON escapando `<` para evitar cerrar el bloque script desde contenido del catálogo. Los resultados se construyen con nodos y `textContent`, sin inyectar HTML. Los enlaces aceptan rutas locales y IDs numéricos como strings. Se conserva el ID de la variante elegida.

El motor cruza precio, disponibilidad vendible y edad en la misma variante; elige la variante de menor precio que cumple las condiciones. Los precios se formatean desde Liquid con `money_with_currency`. No se deduce disponibilidad del inventario agregado. Cada producto aparece como máximo una vez.

Rangos en centavos USD: [2500,5000), [5000,7500), [7500,10000), [10000,+∞). Por tanto $50 pertenece al segundo rango, $75 al tercero y $100 al cuarto. El componente se deshabilita en monedas de presentación distintas de USD para evitar aplicar límites monetarios incorrectos.

## Fuente y actualización automática

Si se selecciona una colección, se consideran sus primeros 50 productos en el orden configurado en Shopify, antes de filtrar por el tag exacto `gift_shop`. Una colección dedicada evita desperdiciar posiciones en productos no elegibles. Si no se selecciona colección, se usan los bloques de producto en su orden del editor, máximo 50.

En ambos modos se verifica el tag exacto en Liquid y en JavaScript. Precio, variantes e inventario vendible se actualizan al cargar la página desde Shopify; un visitante con una pestaña antigua debe recargar para obtener cambios. La disponibilidad final se confirma en la ficha de producto y en el flujo de compra.

Añadir `gift_shop` a un producto ya seleccionado lo habilita para el motor si cumple edad/categoría/precio. Añadir el tag a un producto que no está en los bloques no lo incorpora por sí solo. Para incorporación automática completa hace falta una colección automática basada en el tag. El propietario indicó mantener pendiente crear esa colección; no se creó ni publicó ninguna.

Para más de 50 candidatos, curar y ordenar los primeros 50 o diseñar una ampliación con paginación y límites explícitos. No se presenta este MVP como búsqueda del catálogo completo.

## Accesibilidad y rendimiento

Radios nativos agrupados en fieldsets, legends visibles, foco visible, objetivos mínimos de 48px, mensaje de resultados en región persistente `polite`, sin mover el foco al filtrar. Textos y colores editables en el editor. JavaScript diferido, imágenes con dimensiones y carga diferida; hero opcional responsivo. Sin fuentes externas ni animaciones.

La sección comprueba errores de JSON/configuración y falla sin mostrar recomendaciones incorrectas. Sin JavaScript informa que debe habilitarse. El reset limpia resultados y filtros. La inicialización admite recargas de secciones del editor y evita montar dos veces el mismo nodo.
