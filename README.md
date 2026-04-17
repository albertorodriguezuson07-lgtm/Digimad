# DigiMad — Diagnóstico de Madurez Digital para microempresas B2B

Herramienta web gratuita y open-source para evaluar el nivel de madurez digital de microempresas B2B y obtener un roadmap personalizado de implementación basado en evidencia empírica.

## Sobre el proyecto

DigiMad ha sido desarrollada como parte del Trabajo Fin de Grado **"Implementación de inteligencia artificial y automatización de marketing en el e-commerce de una microempresa B2B"** de Alberto Rodríguez Usón (Universidad Católica San Antonio de Murcia, 2026), bajo la dirección del Dr. Juan Bonastre Egea.

La herramienta materializa el cuarto objetivo específico del TFG (OE4): desarrollar un instrumento de diagnóstico digital que permita a cualquier microempresa evaluar su nivel de madurez digital e identificar qué componentes son prioritarios en función de sus recursos y punto de partida.

Los criterios de evaluación, los pesos de cada dimensión y el stack tecnológico recomendado se basan en evidencia empírica documentada en el caso real de Empresa A, microempresa B2B del sector industrial en Medellín, Colombia, con datos verificados de los periodos 2024, 2025 y primer trimestre de 2026.

## Cómo funciona

La herramienta evalúa seis dimensiones críticas mediante 24 preguntas (4 por dimensión):

1. **Catálogo digital** — cobertura, calidad y escalabilidad del contenido de productos
2. **SEO y experiencia de usuario** — visibilidad orgánica, navegación, conversión y elementos de confianza
3. **Datos integrados (SSOT)** — consolidación de fuentes y toma de decisiones con evidencia
4. **Email marketing y automatización** — comunicación con clientes a lo largo del ciclo de vida
5. **Omnicanalidad** — captación y atención en redes sociales, mensajería y canales preferidos del cliente
6. **Eficiencia publicitaria** — equilibrio entre medios pagados y propios; rentabilidad real

Cada respuesta puntúa de 0 a 3. La puntuación se normaliza a una escala 0-100 por dimensión y se calcula una puntuación global agregada que clasifica a la microempresa en uno de cuatro niveles de madurez:

- **Nivel inicial** (0-25): fase muy temprana de digitalización
- **En desarrollo** (26-50): base mínima funcional con carencias importantes
- **Avanzado** (51-75): arquitectura digital madura con la mayoría de componentes operativos
- **Optimizado** (76-100): nivel comparable al de organizaciones mucho mayores

A partir de los resultados se genera automáticamente:

- Gráfico radar con el perfil por dimensión
- Análisis detallado de cada dimensión con puntuación individual
- Las tres prioridades de implementación según el perfil del usuario
- Roadmap recomendado con secuencia óptima y duraciones estimadas
- Stack tecnológico recomendado con costes mensuales reales en USD
- Opción de exportar el informe a PDF

## Stack técnico

- HTML5 + CSS3 + JavaScript vanilla (sin frameworks)
- Chart.js 4.4.0 (vía CDN) para el gráfico radar
- Google Fonts: Inter (vía CDN)
- Sin backend, sin base de datos, sin tracking
- Compatible con todos los navegadores modernos (Chrome, Firefox, Safari, Edge)
- Responsive mobile-first
- Accesible vía teclado y lectores de pantalla

## Estructura del proyecto

```
herramienta-digimad/
├── index.html          Estructura HTML
├── styles.css          Estilos visuales
├── data.js             Cuestionario, scoring y recomendaciones
├── app.js              Lógica de la aplicación
└── README.md           Este archivo
```

## Uso

### Como página web

Abrir `index.html` en cualquier navegador moderno. No requiere servidor, instalación ni configuración.

### Despliegue público con GitHub Pages

1. Crear un repositorio público en GitHub
2. Subir todos los archivos al repositorio
3. Activar GitHub Pages desde Settings → Pages
4. Seleccionar la rama `main` y la carpeta raíz
5. La herramienta estará disponible en `https://[usuario].github.io/[repositorio]/`

## Personalización

El cuestionario, los pesos, las recomendaciones y el stack recomendado están centralizados en `data.js`. Modificar este archivo permite adaptar la herramienta a otros sectores, geografías o tamaños de empresa sin tocar la lógica de la aplicación.

## Licencia

Esta herramienta se ofrece bajo licencia MIT con fines educativos y empresariales. Se permite su uso, modificación y distribución libre con atribución al autor original. Las recomendaciones generadas son orientativas y deben adaptarse al contexto particular de cada microempresa.

## Contacto

**Alberto Rodríguez Usón**
Trabajo Fin de Grado — Marketing y Dirección Comercial
Universidad Católica San Antonio de Murcia (UCAM)
Tutor: Dr. Juan Bonastre Egea
Mayo 2026
