# Branchy

**Branchy** es un sistema de control de versiones simplificado, inspirado en Git pero diseñado con una arquitectura minimalista para entender los fundamentos internos de versionado de código fuente.  
Ideal como proyecto educativo o herramienta de versionado ligera.

---

## 🚀 Características principales

- ✅ Inicialización de repositorio (`branchy dist/index.js init`)
- ✅ Área de staging (`branchy dist/index.js add <archivo>`)
- ✅ Commits con historial (`branchy dist/index.js commit -m "mensaje"`)
- 📦 Sistema de blobs basado en SHA-1
- 🔗 Encadenamiento de commits vía punteros `parent`
- 🧩 Preparado para extensiones: ramas, merges, checkout, reset...

---

## 📂 Estructura interna del repositorio

```bash
.branchy/
├── objects/             # Almacena blobs (archivos) y commits
├── refs/
│   └── heads/           # Punteros de ramas (por ahora solo main)
│       └── main         # Contiene el hash del último commit
├── HEAD                 # Puntero a la rama activa
└── index.json           # Área de staging temporal (se elimina tras commit)
```
---

📦 Instalación y configuración
```bash
git clone https://github.com/tu-usuario/branchy.git
cd branchy
npm install
npx tsc
```

---

🛠️ Comandos disponibles
```bash
node dist/index.js init
```
Inicializa un nuevo repositorio Branchy en el directorio actual.

```bash
node dist/index.js add archivo.js
node dist/index.js add .
```
Añade un archivo al staging area. Su contenido se guarda como un blob usando SHA-1.

```bash
node dist/index.js commit -m "Mensaje de commit"
```
Crea un nuevo commit con todos los archivos añadidos en el staging.

```bash
node dist/index.js commit -m "Mensaje de commit"
```
---

🧪 Ejemplo completo

# Inicializar Branchy
```bash
node dist/index.js init
```

# Crear archivo
```bash
echo "console.log('Hola mundo');" > hola.js
```

# Añadir al staging
```bash
node dist/index.js add hola.js
```

# Commit
```bash
node dist/index.js commit -m "Primer commit"
```

# Reset
Quita el archivo hola.js del staging (deja de tener seguimiento).
```bash
node dist/index.js reset hola.js
```

---

🧠 ¿Por qué Branchy?
 - Escrito desde cero en TypeScript
 - Enfocado a comprender cómo funciona Git internamente
 - Útil como práctica de estructuras de datos, persistencia, CLI tools, y SHA hashing
 - Pensado para escalar: ramas, merges, logs visuales, reset...


🚧 Roadmap (próximas funcionalidades)
  - branchy log: historial de commits
  - branchy branch <nombre>: gestión de ramas
  - branchy checkout <branch|hash>: cambiar entre ramas o commits
  - Interfaz gráfica web con visualización del grafo de commits

🧑‍💻 Autor
Desarrollado por @AlfonsoEscobar como proyecto formativo y personal.
Inspirado en el diseño interno de Git, pero con un enfoque didáctico y minimalista.

📄 Licencia
MIT License – haz lo que quieras, pero dale crédito.

---
