# DGE - Configuración de Agente WhatsApp Sofía

Este documento detalla los pasos para activar a **Sofía**, la asistente virtual de Diseño Gráfico Express, encargada de la pre-calificación de clientes vía WhatsApp.

## Especificaciones Técnicas
- **Plataforma**: n8n (Backend) + Evolution API (WhatsApp Gateway).
- **Modelo IA**: Google Gemini 1.5 Flash.
- **Instancia Evolution**: `DGE`
- **Número de Atención**: `+52 449 109 1743`
- **Endpoint Webhook**: `https://bahiago.tech/webhook/dge-whatsapp-webhook`

## Estructura de Archivos
1. `n8n_workflows/dge_whatsapp_agent.json`: Definición del flujo en n8n.
2. `dge_whatsapp_agent_prompt.md`: El "cerebro" y personalidad de Sofía.
3. `setup_dge_whatsapp.sh`: Script de configuración de entorno.
4. `import_dge_workflow.sh`: Script de importación a n8n.

## Pasos para la Activación

### 1. Configuración de Evolution API
Asegúrate de tener una instancia llamada `DGE` en tu panel de Evolution API conectada al número `4491091743`. Configura el Webhook para enviar los eventos de `messages.upsert` a la URL mencionada arriba.

### 2. Preparación del Entorno
Ejecuta el script de configuración para asegurar que las variables de entorno estén listas:
```bash
bash setup_dge_whatsapp.sh
```

### 3. Importación a n8n
Importa el workflow a tu instancia de n8n:
```bash
bash import_dge_workflow.sh
```

### 4. Verificación de la Web
Todos los botones en `index.html` y las páginas de detalles deben apuntar a:
`https://wa.me/524491091743?text=Hola...`

## Flujo de Trabajo de Sofía
1. **Detección**: Sofía detecta el paquete de interés basándose en el mensaje pre-configurado del botón de la web.
2. **Bienvenida**: Saluda al cliente por su nombre y muestra entusiasmo por el proyecto.
3. **Calificación**: Realiza preguntas estratégicas sobre el negocio y requerimientos.
4. **Traspaso**: Una vez recopilada la info, notifica al equipo humano para el cierre de venta.

---
*DGE - Creatividad Épica a Toda Velocidad*
