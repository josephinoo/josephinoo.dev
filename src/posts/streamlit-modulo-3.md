---
title: "Curso de Streamlit - Módulo 3: Cache, Estado, Layout y Componentes"
date: "2026-04-27"
description: Domina el rendimiento con @st.cache_data, maneja el estado con session_state y organiza el diseño de tu app de forma avanzada con pestañas y columnas.
published: true
tags:
  - streamlit
  - python
  - curso
  - layout
---

## ¡Bienvenido al Módulo 3! 🧠

<div style="margin: 2rem 0;">
  <iframe src="https://josephinoo.github.io/curso-streamlit/module-3" width="100%" height="600px" style="border:none; border-radius: 12px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);"></iframe>
</div>

En este punto, tu app de Streamlit va tomando una forma sólida, pero, ¿qué pasa cuando conectas datos pesados que tardan 10 segundos en cargar y tu app se recarga cada que un usuario hace clic?

En este módulo transformaremos tu script de un simple prototipo en una aplicación robusta de producción. Aprenderemos a guardar datos en la memoria caché, mantener variables vivas entre clics y estructurar pantallas dignas de un diseñador.

---

### Rendimiento Extremo con `@st.cache_data` ⚡

La regla de Streamlit dice: _todo se re-ejecuta_. Si tienes una función que lee un CSV de 500MB desde un servidor, ¡Streamlit descargará el CSV cada vez que alguien toque un botón!

La solución es `@st.cache_data`. Este decorador memoriza el resultado de la función. Si los argumentos de la función no cambian, Streamlit devuelve el caché al instante, sin volver a ejecutar el código dentro de ella.

```python
import streamlit as st
import pandas as pd
import time

@st.cache_data
def cargar_datos_pesados(ruta):
    # Esto tomará 5 segundos solo la primera vez.
    time.sleep(5)
    return pd.read_csv(ruta)

with st.spinner("Cargando base de datos..."):
    # La primera vez: espera 5s
    # La segunda vez: ¡es instantáneo!
    df = cargar_datos_pesados("datos.csv")
```

---

### El cerebro de la aplicación: `st.session_state` 🧠

Como vimos en el módulo 1, las variables se resetean a sus valores iniciales en cada interacción. ¿Cómo guardamos información entre recargas (como el usuario actual, un carrito de compras o un contador de clics)?

Usamos `st.session_state`, que es como un diccionario de Python pero **persistente para cada usuario**.

```python
# Inicializar la variable si no existe
if "contador" not in st.session_state:
    st.session_state.contador = 0

# Modificarla al hacer clic
if st.button("Sumar +1"):
    st.session_state.contador += 1

st.metric("Clics totales", st.session_state.contador)
```

**Regla de oro:** Siempre inicializa tus variables en `session_state` al inicio del script antes de intentar leerlas.

---

### Layout Avanzado: Pantallas que enamoran 🏗️

Nadie quiere ver una app donde todo es una larga columna infinita. Usa estas herramientas para diseñar tu interfaz:

#### 1. Columnas (`st.columns`)

Divide el espacio horizontalmente para colocar tus KPIs o gráficos uno al lado del otro.

```python
col1, col2, col3 = st.columns([1, 1, 2]) # La última columna es el doble de ancha

with col1:
    st.metric("Ventas", "$45,200", "+12%")
with col2:
    st.metric("Clientes", "1,234", "+8%")
with col3:
    st.write("Columna más ancha para texto descriptivo.")
```

#### 2. Pestañas (`st.tabs`)

Evita el _scroll_ infinito organizando tus vistas en _Tabs_.

```python
tab_datos, tab_graficos = st.tabs(["📊 Datos Crudos", "📈 Análisis"])

with tab_datos:
    st.dataframe(df)

with tab_graficos:
    st.line_chart(df)
```

#### 3. Expanders y Popovers

- **`st.expander`**: Oculta secciones de texto que no son urgentes, como logs, metodologías o configuraciones avanzadas.
- **`st.popover`**: Un panel flotante similar a un _tooltip_ pero interactivo. ¡Perfecto para alojar múltiples filtros sin ocupar todo tu _sidebar_!

```python
with st.popover("⚙️ Configuración Visual"):
    color = st.color_picker("Elige un color", "#FF0000")
    opacidad = st.slider("Opacidad", 0, 100)
```

---

### Componentes Especiales y Tablas Mejoradas 🪄

A partir de versiones recientes, Streamlit ha integrado muchísimas mejoras de UI:

- **Modales (`@st.dialog`)**: Puedes abrir ventanas que bloquean la aplicación, ideales para confirmaciones de borrado (`"¿Seguro que deseas eliminar el registro?"`).
- **`st.logo`**: Coloca el logotipo de tu empresa estático en la esquina superior izquierda del menú lateral.
- **`st.column_config`**: ¿Cansado de ver tablas planas? Con `column_config`, convierte columnas de tu DataFrame en barras de progreso visuales (`ProgressColumn`), imágenes renderizadas (`ImageColumn`) o hipervínculos (`LinkColumn`).

```python
st.dataframe(
    df,
    column_config={
        "ventas": st.column_config.ProgressColumn(
            "Metas de Venta", min_value=0, max_value=100
        )
    }
)
```

Al entender la memoria caché, el estado de sesión y el sistema de columnas/pestañas, tu nivel en Streamlit habrá subido a la categoría Senior. ¡Vamos a optimizar tus aplicaciones y llevarlas a producción en el **Módulo 4**!
