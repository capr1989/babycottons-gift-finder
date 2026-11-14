# Lanzamiento y rollback

Todo lanzamiento necesita autorización expresa. No publicar automáticamente la copia completa: puede haber quedado desactualizada respecto al tema activo. Preferir trasladar solo los cinco archivos personalizados aprobados.

1. Revisar manualmente DEV y aprobar catálogo, equivalencias, diseño y comportamiento.
2. Mantener el código/documentación por MCP en `feature/gift-finder` y registrar el commit/versión aprobado. El acceso de escritura ya está confirmado. No copiar el tema comercial.
3. Releer IDs/roles y comparar solo los archivos afectados y dependencias relevantes contra producción; preservar cualquier cambio reciente. Si existen nombres iguales, revisar diferencias y respaldar antes de reemplazar.
4. Con autorización específica, instalar únicamente la versión aprobada en el destino acordado, validarla y comprobar que las plantillas ajenas conservan su comportamiento. Registrar estado anterior, archivos y hashes/versión.
5. Si se autoriza la colección automática, crear `Guía de regalos Navidad`, handle `regalos-navidad`, regla TAG EQUALS gift_shop; acordar publicación/canal por separado. Configurar la sección con esa colección y su orden. La creación está actualmente pendiente por decisión del propietario.
6. Solo con autorización, crear/asignar `/pages/gift-guide`, decidir visibilidad y añadir el enlace al menú aprobado. Confirmar que la plantilla exista en el tema que verá cada visitante antes de hacer visible el recurso global.
7. Ejecutar revisión manual de funcionamiento y compatibilidad tras activación. No dar por aprobada la versión por el mero hecho de que Shopify aceptó archivos.

## Rollback

Revertir primero el enlace de navegación y la visibilidad/asignación de página autorizados para impedir nuevas entradas. Restaurar los archivos de destino respaldados y los valores anteriores de configuración. Retirar los cinco archivos nuevos únicamente si no tienen referencias activas y con aprobación para borrar. No modificar productos, tags, inventario ni checkout.

En desarrollo, mantener la plantilla sin asignar y conservar la copia no publicada permite desactivar la prueba sin afectar producción. No eliminar ni publicar temas como parte del rollback sin aprobación.
