---
title: 'Curso de Streamlit - Módulo 1: Introducción y Entorno de Trabajo'
date: '2026-04-27'
description: Descubre qué es Streamlit, cómo instalarlo y cómo funciona internamente su modelo de ejecución (scripting flow). Crea tu primera app web con Python de la forma más rápida y sencilla posible.
published: true
tags:
  - streamlit
  - python
  - curso
  - ciencia-de-datos
---

## ¡Bienvenido al Módulo 1! 🎈

<div style="margin: 2rem 0;">
  <iframe src="https://josephinoo.github.io/curso-streamlit/module-1" width="100%" height="600px" style="border:none; border-radius: 12px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);"></iframe>
</div>

¿Alguna vez has intentado mostrar un análisis de datos o un modelo de *machine learning* a alguien no técnico y te has topado con la complejidad de montar un frontend? Construir el backend y el frontend por separado, manejar HTML, CSS, JavaScript y configurar el enrutamiento puede tomar semanas de trabajo. 

Aquí es donde entra la promesa de **Streamlit**: Convertir tu script de Python directamente en una App Web interactiva. 🚀

En este primer módulo, entenderemos qué es Streamlit, cómo instalarlo, y lo más importante: cómo funciona internamente su modelo de ejecución (el *scripting flow*). Al finalizar, tendrás tu primera aplicación corriendo localmente en tu máquina.

---

### ¿Qué es Streamlit y a quién está dirigido?

Streamlit es una librería *open-source* de Python que te permite crear aplicaciones web hermosas e interactivas personalizadas para la ciencia de datos y el *machine learning*, todo en cuestión de minutos. 

**¿Quiénes lo utilizan?**
- **Data Scientists**: Para llevar modelos de ML a producción sin ingeniería web extra.
- **Analistas**: Para convertir scripts de Pandas y Matplotlib en dashboards interactivos.
- **Estudiantes**: Para darles una interfaz profesional a proyectos finales.
- **Empresas**: Startups y empresas Fortune 500 (como Google, Uber, o Airbnb) lo usan para construir herramientas internas rápidamente.

---

### Instalación y tu primera app web

Para empezar a usar Streamlit, necesitas Python 3.8+ y `pip`. Te recomendamos usar un entorno virtual para mantener tu proyecto aislado. Una vez configurado tu entorno, la instalación se hace con un solo comando:

```bash
pip install streamlit
```

Puedes verificar tu instalación ejecutando `streamlit --version`.

**¡Manos a la obra!** Crea tu primer script y escribe lo siguiente:

```python
import streamlit as st

st.title("¡Hola, Streamlit! 🎈")
st.write("Mi primera app en Python.")
```

Para lanzar la app, abre tu terminal y ejecuta:

```bash
streamlit run tu_script.py
```

Al instante, se abrirá tu navegador web en `localhost:8501`. ¡Felicidades, acabas de construir y desplegar tu primera app web interactiva! Cada vez que guardes tu código, la aplicación se actualizará automáticamente en tu navegador.

---

### El "Scripting Flow": El corazón de Streamlit 🧠

Este es el concepto más importante de todo el módulo. Entenderlo te ahorrará el 80% de los *bugs* al programar en Streamlit. 

**¿Cómo ejecuta Streamlit tu código?**
De arriba hacia abajo, ¡siempre! 🔄

1. El usuario abre la app y Streamlit ejecuta el script completo, de la línea 1 a la última.
2. El usuario interactúa con la app (por ejemplo, hace clic en un botón, escribe en un cuadro de texto, mueve un *slider*).
3. **Streamlit vuelve a ejecutar TODO el script desde cero.**
4. Compara el resultado y solo actualiza en pantalla lo que cambió (*DOM diffing*).
5. La pantalla se actualiza instantáneamente con los nuevos datos.

**La Regla de Oro:**
> *Cada interacción del usuario equivale a una re-ejecución completa del script.*

Las variables **no persisten** por defecto entre estas recargas, a menos que utilicemos técnicas como el `session_state` (lo cual veremos en el módulo 3). Recuerda, ¡el orden de tu código importa! Si intentas imprimir una variable antes de definirla o pedirla a través de un *input*, Python arrojará un error.

---

### Widgets de Texto y Títulos 📝

Escribir texto en tu aplicación es muy natural. Aquí tienes las herramientas para formatear:

- **Títulos**: Equivalente a H1, H2 y H3 en HTML.
  ```python
  st.title("Título Principal")
  st.header("Sección")
  st.subheader("Subsección")
  ```

- **El comando navaja suiza: `st.write()`**: Puedes pasarle texto, Markdown, variables, DataFrames e incluso gráficas de Matplotlib. ¡Lo renderiza casi todo!
  ```python
  st.write("Texto normal")
  st.write("**Negrita** y *cursiva*")
  st.write({"a": 1, "b": 2}) # Se renderiza como un diccionario JSON
  ```

- **Formatos específicos**:
  ```python
  st.text("Texto plano sin formato.")
  st.markdown("**Soporta** sintaxis `Markdown` avanzada.")
  st.caption("Texto pequeño gris, ideal para notas al pie.")
  st.code("print('Hola, mundo!')", language="python")
  st.divider() # Dibuja una línea horizontal separadora
  ```

---

### Inputs Simples: Escuchando al Usuario 🎛️

Los widgets de Streamlit recogen la interacción del usuario y, al asignarlos a una variable, desatan el *scripting flow*:

- **`st.button()`**: Devuelve `True` **sólo en la ejecución inmediatamente posterior al clic**. Al siguiente redibujado de la app, vuelve a `False`.
  ```python
  if st.button("Haz clic aquí"):
      st.write("¡Botón presionado! 🎉")
  ```

- **Inputs de texto y checkbox**:
  ```python
  activo = st.checkbox("Activar opción avanzada")
  texto = st.text_input("Escribe tu nombre", placeholder="Ana")
  ```

- **Inputs numéricos y sliders**:
  ```python
  edad = st.number_input("Edad", min_value=0, max_value=120, value=25)
  rango = st.slider("Rango de Temperatura", min_value=0, max_value=100, value=(20, 80))
  ```

---

### Feedback Visual y Media 💬🖼️

**Mensajes de estado:** Notifica a tus usuarios de forma visual.
```python
st.success("Operación exitosa ✅")
st.error("Algo salió mal ❌")
st.warning("Cuidado con esto ⚠️")
st.info("Para tu información 💡")
```

**Momentos divertidos y de espera:**
```python
st.balloons() # Lanza globos animados por la pantalla
with st.spinner("Procesando..."):
    # Código pesado aquí
    st.write("¡Terminado!")
```

**Imágenes y Videos:**
```python
st.image("https://miapp.com/imagen.png", caption="Foto genial")
st.video("video_demo.mp4")
```

---

### Conclusión y Siguiente Paso

En este primer módulo, has aprendido las bases fundamentales. Ya puedes construir aplicaciones con *inputs*, *outputs*, y un manejo sólido de lo que significa el *Scripting Flow*. 

¿Tu reto? Intenta agregar unos cuantos campos de texto y botones a tu código y observa cómo responde el navegador en tiempo real. 

En el **Módulo 2**, llevaremos nuestra aplicación un paso más allá aprendiendo a utilizar el Panel Lateral (*Sidebar*), a cargar *DataFrames* masivos, y a montar menús de navegación multi-página reales. ¡No te lo pierdas!
