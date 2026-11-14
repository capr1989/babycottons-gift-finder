# Cómo editar tu Gift Guide

## Abrir la sección correcta

En Shopify, abre Tienda online → Temas y el editor visual de **la copia de desarrollo no publicada**. No abras el editor del tema publicado. En el selector superior elige **Páginas → gift-finder** y selecciona la sección **Little Gift Guide**.

Guardar cambios en esta copia no publica el tema. No necesitas editar código para los cambios descritos aquí.

## Lazo y títulos

- **Mostrar lazo decorativo**: desactivado; el lazo queda oculto. Puedes volver a activarlo.
- **Título principal**: reemplaza “The Little Gift Guide” por tu título.
- **Subtítulo principal**: cambia “Find the perfect little gift”.
- **Título de resultados** y **Subtítulo de resultados**: cambian los textos sobre las recomendaciones.
- **Encabezado del filtro de presupuesto/edad/categoría**: cambia el encabezado de cada paso.
- **Texto del botón de búsqueda** y **Texto del botón para reiniciar**: cambia los botones.

Después de escribir, pulsa Guardar en el editor de DEV. No se eligió un título nuevo por ti: el texto actual sigue siendo editable.

## Cambiar los nombres de las categorías

En la sección verás **Texto visible: Pijamas**, **Texto visible: Ropa**, **Texto visible: Mantas**, **Texto visible: Accesorios**, **Texto visible: Sets de regalo** y **Texto visible: Surprise me**. Escribe el nombre que quieras mostrar.

Cambiar el texto del botón no cambia qué productos pertenecen a esa categoría. Las seis categorías y su lógica siguen siendo las mismas. Añadir una séptima categoría o cambiar los rangos reales requiere ajustar el código; no basta con cambiar el título.

## Ejemplo: peluches como accesorios para todas las edades

1. Dentro de Little Gift Guide abre el bloque **Producto / equivalencias** del peluche. Comprueba el producto seleccionado en su selector.
2. En **Categoría**, elige **Accesorios**.
3. Activa **Producto sin talla: usar edades aprobadas**.
4. Marca las cinco casillas **Aprobar:** Recién nacido, 0–3 meses, 3–12 meses, 1–5 años y 5–10 años.
5. Guarda y repite para cada peluche que quieras incluir. La aprobación de edades corresponde a ese producto; revisa que coincida con sus indicaciones de uso.

El producto seguirá necesitando el tag exacto `gift_shop`, una variante disponible y un precio dentro del presupuesto elegido. Si cuesta menos de $25, no saldrá en los presupuestos actuales aunque apruebes todas las edades. No se cambian datos globales del producto desde estos bloques.

Para incorporar otro producto, agrega un bloque Producto / equivalencias y selecciónalo. Hay un máximo de 50 bloques; la selección actual está llena. Si necesitas espacio, quita un bloque de esta sección y agrega el nuevo: quitar el bloque no elimina el producto de Shopify. Sin una colección fuente aprobada, añadir el tag por sí solo no incorpora productos nuevos a la selección.

## Navegación y lanzamiento

Para preparar el menú sin afectar producción, duplicar el menú nativo y seleccionarlo exclusivamente en la cabecera y el menú móvil de la copia de desarrollo. No modificar el menú compartido con el tema activo. Crear la página final como oculta y asignarle la plantilla de la guía.

Una página oculta no se hace visible al publicar un tema: son operaciones separadas. Su enlace puede devolver 404 hasta hacerla visible. En la ventana de lanzamiento aprobada, confirmar que el tema de destino contenga los archivos de la guía, activar la versión acordada y hacer visible la página. No publicar automáticamente una copia completa sin comparar cambios recientes.

La configuración real de navegación y los identificadores operativos permanecen en la entrega local del propietario.
