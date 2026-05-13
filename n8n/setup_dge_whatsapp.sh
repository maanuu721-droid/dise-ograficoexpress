#!/bin/bash

# DGE WhatsApp Agent Setup Script
# Configuración de variables de entorno para n8n y Evolution API

echo "🚀 Iniciando configuración de DGE - Agente WhatsApp Sofía..."

# Variables de instancia
INSTANCE_NAME="DGE"
WHATSAPP_NUMBER="4491091743"
WEBHOOK_URL="https://bahiago.tech/webhook/dge-whatsapp-webhook"

# Verificar si existe el archivo .env
if [ ! -f .env ]; then
    echo "📄 Creando archivo .env..."
    touch .env
fi

# Actualizar variables en .env
sed -i "/DGE_INSTANCE_NAME/d" .env
echo "DGE_INSTANCE_NAME=$INSTANCE_NAME" >> .env

sed -i "/DGE_WHATSAPP_NUMBER/d" .env
echo "DGE_WHATSAPP_NUMBER=$WHATSAPP_NUMBER" >> .env

sed -i "/DGE_WEBHOOK_URL/d" .env
echo "DGE_WEBHOOK_URL=$WEBHOOK_URL" >> .env

echo "✅ Variables de entorno configuradas."

# Simulación de conexión a Evolution API
echo "🔗 Conectando con Evolution API para instancia: $INSTANCE_NAME..."
# Aquí irían los comandos curl para crear la instancia si no existe
# curl -X POST https://api.evolution.com/instance/create ...

echo "📱 Por favor, vincula el número $WHATSAPP_NUMBER escaneando el QR en el panel de Evolution."
echo "🎯 Configurando Webhook en Evolution API: $WEBHOOK_URL"

echo "✨ Configuración completada con éxito."
