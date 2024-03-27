# Lizard

## Levantar Entorno de Desarrollo

<details>
<summary>API y Base de Datos</summary>
</br>

**Prerrequisitos:**

- **Docker:** Asegúrate de tener la última versión de Docker instalada en tu sistema, ya que incluye el comando `docker compose`, esencial para ejecutar los contenedores.

**Instrucciones:**

1. **Navega a la Carpeta Raíz del Repositorio:**

   Abre una terminal y cambia tu directorio a la carpeta raíz del repositorio.

2. **Inicia los Contenedores:**

   Ejecuta el siguiente comando:

   ```
   docker compose up -d
   ```

   Este comando construye e inicia los contenedores en modo detached.

3. **Accede a la Documentación de la API:**

   Una vez que los contenedores estén en funcionamiento, abre tu navegador web y ve a:

   ```
   http://localhost:8000/docs
   ```

   Aquí, puedes ver la documentación interactiva de la API.

</details>

<details>
<summary>Aplicación Móvil</summary>
</br>

**Prerrequisitos:**

- **Node.js:** Versión 20.x.x. Puedes descargarlo desde el [sitio oficial de Node.js](https://nodejs.org/en).
- **Ionic CLI:** Versión 7.1.1. Instálalo globalmente usando npm con el siguiente comando:

  ```
  npm install -g @ionic/cli@7.1.1
  ```

- **Angular CLI:** Versión 17.1.1. Instálalo globalmente usando npm con el siguiente comando:

  ```
  npm install -g @angular/cli@17.1.1
  ```

**Instrucciones:**

1. **Navega a la Carpeta de la Aplicación Móvil:**

   Desde tu terminal, cambia tu directorio a la carpeta de la aplicación móvil dentro del proyecto:

   ```
   cd ./lizard/
   ```

2. **Inicia la Aplicación Móvil:**

   Ejecuta el siguiente comando:

   ```
   ionic serve
   ```

   Este comando sirve la aplicación y automáticamente la abre en tu navegador web predeterminado en:

   ```
   http://localhost:8100
   ```
</details>
