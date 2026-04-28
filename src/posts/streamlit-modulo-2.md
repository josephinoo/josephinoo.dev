---
title: 'Curso de Streamlit - Módulo 2: Widgets, Sidebar y Navegación'
date: '2026-04-27'
description: Aprende a estructurar tus aplicaciones con el panel lateral (sidebar), cargar datos reales y construir un menú de navegación multi-página.
published: true
tags:
  - streamlit
  - python
  - curso
  - pandas
  - ui
---

## ¡Bienvenido al Módulo 2! 🗂️

<div style="margin: 2rem 0;">
  <iframe src="https://josephinoo.github.io/curso-streamlit/module-2" width="100%" height="600px" style="border:none; border-radius: 12px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);"></iframe>
</div>

¡Es hora de llevar nuestra app de Streamlit al siguiente nivel! En el módulo 1 vimos los conceptos más básicos, pero para construir aplicaciones que se sientan verdaderamente profesionales, necesitamos estructura y datos del mundo real.

Hoy aprenderemos a separar los controles del contenido principal utilizando el panel lateral, a subir archivos (archivos CSV reales), y a implementar un sistema de enrutamiento y navegación multi-página. 

---

### El Sidebar: El Panel Lateral de tu Dashboard 📌

¿Alguna vez has visto un panel de control con todos los filtros amontonados en la parte superior del contenido? ¡Se vuelve un caos rápidamente! La regla de oro para crear buenas interfaces en Streamlit es **separar controles y configuraciones (Sidebar) de las visualizaciones y datos (Centro)**.

Existen dos formas de enviar widgets a la barra lateral:

**1. Usando el prefijo directo (Ideal para 1 o 2 controles):**
```python
st.sidebar.title("Configuración")
st.sidebar.slider("Año", 2018, 2024)
```

**2. Usando el bloque `with` (Recomendado ✅):**
Es mucho más limpio y fácil de leer a medida que la aplicación crece.
```python
with st.sidebar:
    st.title("Configuración")
    st.selectbox("País", ["USA", "China", "Ecuador"])
    st.button("Aplicar Filtros")
```

---

### Opciones y Selecciones Múltiples 🎯

Dos widgets indispensables para que el usuario escoja opciones son `selectbox` y `radio`. ¿Cuándo usar cada uno?

- **`st.selectbox()` (Lista desplegable)**: Ocupa muy poco espacio vertical. Es ideal para 5 o más opciones (por ejemplo, una lista de 50 países o cientos de categorías).
  ```python
  opcion = st.selectbox("Elige un país", ["USA", "China", "Ecuador"], index=0)
  ```

- **`st.radio()` (Botones de opción)**: Muestra todas las opciones simultáneamente en la pantalla. Úsalo si tienes pocas opciones (de 2 a 4) y deseas que el usuario vea claramente todas sus alternativas sin clics extra. ¡Perfecto para menús de navegación en un solo archivo!
  ```python
  vista = st.radio("Navegar a:", ["📊 Datos", "📈 Gráfico"], horizontal=False)
  ```

---

### Cargar Datos Reales: Pandas y el File Uploader 📁

Toda aplicación de análisis de datos empieza con datos. Con Streamlit, podemos permitir al usuario subir un archivo CSV directamente desde su ordenador.

Para esto, utilizamos `st.file_uploader()`. 
**⚠️ Regla Crítica:** Este widget devuelve `None` si el usuario aún no ha subido nada. Intentar leer un DataFrame vacío detendrá tu app con un error feo. SIEMPRE debes verificar si el archivo existe antes de procesarlo.

```python
import pandas as pd

archivo = st.sidebar.file_uploader("Sube tu CSV", type=["csv"])

if archivo is not None:
    # Solo procesamos esto si el usuario subió el archivo ✅
    df = pd.read_csv(archivo)
    
    # Renderizamos la tabla con todas las bondades de ordenado automático
    st.dataframe(df, use_container_width=True, hide_index=True)
else:
    st.info("Sube un archivo para comenzar 👆")
```

---

### El Menú de Navegación Multi-página 🗺️

A medida que tu app crece, querrás dividirla en múltiples secciones. Tienes dos estrategias principales:

#### Opción A: Un Solo Archivo (Ideal para Demos Pequeñas)
Usamos la variable obtenida de un `st.radio()` dentro del *sidebar* para conditionally renderizar diferentes partes del script.

```python
with st.sidebar:
    pagina = st.radio("Ir a:", ["📊 Datos", "📈 Gráfico"])

if pagina == "📊 Datos":
    st.title("Tabla de Datos")
    # Código para mostrar st.dataframe...
elif pagina == "📈 Gráfico":
    st.title("Gráfica Interactiva")
    # Código para mostrar gráficas...
```

#### Opción B: Archivos Separados (Ideal para Proyectos Grandes)
Crea una carpeta llamada `pages/` junto a tu archivo principal. Agrega tus páginas con prefijos numéricos para organizar su orden. Streamlit **detectará automáticamente** la carpeta y creará el menú en la barra lateral sin necesidad de código extra.

Estructura de archivos:
```
mi-proyecto/
├── archivo_principal.py ← Portada de tu app
├── pages/
│   ├── 1_Datos.py       ← Aparecerá como "Datos" en el menú
│   └── 2_Grafico.py     ← Aparecerá como "Grafico" en el menú
└── archivo.csv
```

---

### Tu primer gráfico con Plotly Express 📊

Streamlit se integra perfectamente con `Plotly`. Al contrario que con *Matplotlib* (que genera imágenes estáticas), *Plotly* te da herramientas interactivas directamente en el navegador: *hover* sobre los datos, zoom y *panning*, sin código adicional.

```python
import plotly.express as px

# Supongamos que ya tenemos df cargado...
fig = px.bar(
    df, 
    x="País", 
    y="Arancel", 
    title="Aranceles por País", 
    color="Arancel", 
    color_continuous_scale="Reds"
)

# ¡Magia! Renderizamos la gráfica en Streamlit
st.plotly_chart(fig, use_container_width=True)
```

---

### Manejando el flujo con `st.stop()` y `st.set_page_config()`

Para crear apps robustas, dos comandos esenciales:

- **`st.set_page_config()`**: Configura el título y el favicono de la pestaña de tu navegador, así como el layout ("wide" o "centered"). Debe ser **el primer comando de Streamlit** que llames en todo el script.
- **`st.stop()`**: Detiene elegante y silenciosamente la ejecución del script. Es un "salvavidas" perfecto para cuando faltan datos. 

```python
st.set_page_config(page_title="Mi Dashboard", page_icon="🇺🇸", layout="wide")

archivo = st.sidebar.file_uploader("CSV")

if archivo is None:
    st.info("Por favor, sube el archivo CSV.")
    st.stop() # La ejecución se corta aquí. No hay errores feos.

# Si el script sigue ejecutándose, sabemos que el archivo existe
df = pd.read_csv(archivo)
```

¡Ahora cuentas con las herramientas para crear *dashboards* formidables de varias páginas con tus propios datos interactivos! En el **Módulo 3**, aprenderemos cómo guardar información en la memoria, organizar el diseño de forma profesional mediante columnas y pestañas, y crear cachés para que nuestras bases de datos no sufran en cada recarga.
