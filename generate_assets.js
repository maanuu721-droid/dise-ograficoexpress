const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'AIzaSyA6HFdLpU9bxLHf14lGIsISk9_URbuLn-0'; // MME/GNH Key from workspace

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)){
    fs.mkdirSync(assetsDir);
}

const imagesToGenerate = [
  {
    filename: 'hero_img.jpg',
    prompt: "Composición abstracta 3D de alta calidad que representa el diseño gráfico creativo y el marketing. Formas geométricas flotantes, acentos de neón brillante (cian y magenta) sobre un fondo oscuro profundo. Aspecto elegante, premium y futurista. SIN texto."
  },
  {
    filename: 'portafolio_1.jpg',
    prompt: "Un mockup premium de branding corporativo. Tarjetas de presentación, un smartphone y papelería sobre una superficie de pizarra oscura con textura. Iluminación elegante, moderna, minimalista. Acentos neón cian y azul profundo. SIN texto."
  },
  {
    filename: 'portafolio_2.jpg',
    prompt: "Una laptop moderna y elegante que muestra una hermosa interfaz web en modo oscuro con elementos gráficos vibrantes. Sobre un escritorio minimalista con iluminación suave de estudio. Estética de diseño web premium. SIN texto."
  },
  {
    filename: 'portafolio_3.jpg',
    prompt: "Un diseño gráfico impresionante para campaña de marketing. Composición abstracta, moderna, colores vibrantes en contraste con fondo oscuro. Estética premium para agencia creativa. SIN texto."
  }
];

function generateImage(item) {
  return new Promise((resolve, reject) => {
    console.log(`Generando imagen: ${item.filename}...`);
    const payload = JSON.stringify({
      instances: [{ prompt: item.prompt }],
      parameters: { sampleCount: 1 }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/imagen-4.0-generate-001:predict?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.predictions && json.predictions[0]) {
            const base64Data = json.predictions[0].bytesBase64Encoded;
            const filePath = path.join(assetsDir, item.filename);
            fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
            console.log(`✅ Guardado: ${item.filename}`);
            resolve();
          } else {
            console.log(`❌ Error al generar ${item.filename}:`, JSON.stringify(json).substring(0, 200) + '...');
            resolve(); // Resolve to not break the chain, but it failed
          }
        } catch (e) {
          console.log(`❌ Parse error para ${item.filename}:`, e.message);
          resolve();
        }
      });
    });

    req.on('error', e => {
      console.error(e);
      resolve();
    });
    
    req.write(payload);
    req.end();
  });
}

async function runAll() {
  for (const img of imagesToGenerate) {
    await generateImage(img);
    // Pequena pausa para evitar rate limits si es necesario
    await new Promise(r => setTimeout(r, 2000));
  }
  console.log('✅ Todas las imágenes procesadas.');
}

runAll();
