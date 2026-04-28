---
title: 'Curso de Streamlit - Módulo 4: Formularios, Seguridad, Fragmentos y Chat'
date: '2026-04-27'
description: Lleva tu app a producción gestionando secretos, optimizando formularios, usando fragmentos e implementando IA conversacional.
published: true
tags:
  - streamlit
  - python
  - curso
  - chat
  - seguridad
---

## ¡Bienvenido al Módulo 4! 🔐

<div style="margin: 2rem 0;">
  <iframe src="https://josephinoo.github.io/curso-streamlit/module-4" width="100%" height="600px" style="border:none; border-radius: 12px; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);"></iframe>
</div>

Ya tienes una interfaz robusta, entiendes cómo guardar el estado, manejar la caché y cómo diseñar el sistema visual. ¡Pero aún no podemos lanzar a producción! 

En este módulo final, nos enfocaremos en **seguridad**, **optimización avanzada** y en añadir características espectaculares como **interfaces de Chat**.

---

### Formularios: ¿Por qué agrupar interacciones? 📋

Recuerda el *Scripting Flow*: cada vez que mueves un *slider* o escribes una letra, todo el código se vuelve a ejecutar. Imagina que tienes 5 filtros (fecha inicial, fecha final, región, vendedor, presupuesto). Si tuvieras que consultar la base de datos de producción cada vez que tocas UNO de esos 5 botones, colapsarías el servidor.

**La solución: `st.form`**

Los formularios "congelan" las interacciones hasta que el usuario presione explícitamente el botón de "Enviar".

```python
with st.form("form_filtros"):
    st.write("Configura tu búsqueda exhaustiva:")
    
    col1, col2 = st.columns(2)
    ciudad = col1.selectbox("Ciudad", ["Quito", "Guayaquil", "Cuenca"])
    presupuesto = col2.slider("Presupuesto", 50000, 300000)
    
    # Este botón es la clave: disparará la recarga SÓLO AL HACER CLIC
    enviado = st.form_submit_button("Consultar Base de Datos")

if enviado:
    st.success(f"Buscando propiedades en {ciudad} por menos de ${presupuesto}...")
    # Aquí consultarías tu SQL pesado.
```

---

### Manejo de Secretos y Configuración Segura 🔐

**NUNCA**, bajo ninguna circunstancia, escribas contraseñas, tokens JWT, o claves de bases de datos directamente en tu código fuente (`.py`). Si subes ese código a GitHub, ¡cualquiera podría hackearte!

Para esto, Streamlit utiliza el administrador de secretos `st.secrets`:

1. Crea una carpeta oculta llamada `.streamlit` en la raíz de tu proyecto.
2. Dentro, crea un archivo llamado `secrets.toml`. ¡Asegúrate de agregar `.streamlit/secrets.toml` a tu archivo `.gitignore`!
3. Escribe tus credenciales en el archivo:
   ```text
   [database]
   usuario = "admin"
   clave = "super_secreta_123"
   
   OPENAI_KEY = "sk-abcd123456"
   ```

Desde tu código Python, llamas estas credenciales con completa seguridad:

```python
import streamlit as st

clave_api = st.secrets["OPENAI_KEY"]
usuario_db = st.secrets.database.usuario
```

Si alojas tu app en *Streamlit Community Cloud*, podrás pegar el contenido de tu archivo `secrets.toml` directamente en la configuración web de tu app (en la pestaña "Secrets"), y tu código funcionará exactamente igual sin necesidad de subir credenciales.

También hemos explorado librerías avanzadas como `streamlit-authenticator` y backends en `FastAPI` para crear sistemas de *Login* complejos con *cookies* y roles (`RBAC`).

---

### Fragmentos (`@st.fragment`): Rompiendo la Regla de Oro ⚡

El decorador `@st.fragment` es una adición reciente y poderosa. 

Imagina que tienes una página pesada con muchísimos gráficos, pero al final hay un pequeño botón de "Me Gusta". Si el usuario da clic en ese botón, Streamlit re-ejecutaría *todo*, incluyendo los gráficos pesados. 

Si envuelves el botón con `@st.fragment`, Streamlit permite que **solo esa porción de código** se re-ejecute, saltándose la recarga global y ahorrando toneladas de recursos.

```python
import streamlit as st

st.write("Gráfico muy pesado aquí arriba...")

@st.fragment
def widget_rapido():
    me_gusta = st.button("👍 Dar Like")
    if me_gusta:
        st.success("¡Gracias por tu like!")
        # El resto de la aplicación NO se re-ejecutó.

widget_rapido()
```

---

### Construyendo Interfaces de Chat (LLM Apps) 💬

Streamlit se ha convertido en el estándar de oro para crear demos de Inteligencia Artificial (ChatGPT, LangChain, LlamaIndex). Tienes dos widgets nativos para armar experiencias de chat:

- `st.chat_message("user")` o `st.chat_message("assistant")`: Dibuja una burbuja de chat con su respectivo avatar.
- `st.chat_input("Escribe tu pregunta...")`: Una barra de chat anclada al final de la pantalla que, a diferencia de `text_input`, fue diseñada específicamente para interacciones largas.

Acompañados de `st.session_state` (para recordar el historial), construir un chat es sumamente sencillo:

```python
# Inicializar historial de chat
if "mensajes" not in st.session_state:
    st.session_state.mensajes = []

# Mostrar el historial completo
for msg in st.session_state.mensajes:
    with st.chat_message(msg["rol"]):
        st.write(msg["contenido"])

# Widget para capturar nueva pregunta del usuario
pregunta = st.chat_input("Dime algo...")

if pregunta:
    # 1. Guardar y mostrar mensaje del usuario
    st.session_state.mensajes.append({"rol": "user", "contenido": pregunta})
    with st.chat_message("user"):
        st.write(pregunta)
        
    # 2. Obtener respuesta del bot (simulada)
    respuesta = f"Interesante... Me dijiste '{pregunta}'"
    st.session_state.mensajes.append({"rol": "assistant", "contenido": respuesta})
    
    with st.chat_message("assistant"):
        st.write(respuesta)
```

¡Con este conocimiento, estás a un solo paso de crear proyectos de alto impacto y de integrarlos a infraestructuras web robustas de gran escala! 🚀 

**Has finalizado el Curso de Streamlit.** ¡Es hora de codificar tu propio Dashboard y desplegarlo en la nube!
