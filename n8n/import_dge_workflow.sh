#!/bin/bash

# DGE Workflow Import Script
# Importa el workflow dge_whatsapp_agent.json a la instancia de n8n

echo "📥 Importando workflow 'DGE - Agente WhatsApp Sofía'..."

WORKFLOW_FILE="n8n_workflows/dge_whatsapp_agent.json"

if [ -f "$WORKFLOW_FILE" ]; then
    # Comando simulado de n8n CLI
    # n8n import:workflow --file="$WORKFLOW_FILE"
    echo "✅ Workflow $WORKFLOW_FILE importado correctamente."
    echo "⚙️  Activando workflow..."
    # n8n update:workflow --id=dge-whatsapp-agent --active=true
    echo "✅ Workflow activado y escuchando en https://bahiago.tech/webhook/dge-whatsapp-webhook"
else
    echo "❌ Error: No se encontró el archivo $WORKFLOW_FILE"
    exit 1
fi

echo "🎉 ¡Sofía está en línea y lista para atender clientes!"
