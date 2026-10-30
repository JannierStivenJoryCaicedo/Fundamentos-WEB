function render() {
    const contenedor = document.querySelector(".cards-grid");
    contenedor.replaceChildren();

    tarjetas.forEach(datos => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "card";
        tarjeta.setAttribute("aria-labelledby", datos.id);

        const figura = document.createElement("figure");
        figura.className = "card-image-wrapper";

        const imagen = document.createElement("img");
        imagen.src = datos.imagen;
        imagen.alt = datos.categoria;
        figura.append(imagen);

        const contenido = document.createElement("div");
        contenido.className = "card-content";

        const categoria = document.createElement("p");
        categoria.className = "card-category";
        categoria.textContent = datos.categoria;

        const titulo = document.createElement("h2");
        titulo.className = "card-title";
        titulo.id = datos.id;

        const enlace = document.createElement("a");
        enlace.href = datos.enlace;
        enlace.textContent = datos.titulo;
        titulo.append(enlace);

        const descripcion = document.createElement("p");
        descripcion.className = "card-description";
        descripcion.textContent = datos.descripcion;

        const pie = document.createElement("footer");
        pie.className = "card-footer";

        const avatar = document.createElement("span");
        avatar.className = "author-avatar";
        avatar.setAttribute("aria-hidden", "true");
        avatar.textContent = datos.iniciales;

        const informacionAutor = document.createElement("div");
        informacionAutor.className = "author-info";

        const autor = document.createElement("span");
        autor.className = "author-name";
        autor.textContent = datos.autor;

        const metadatos = document.createElement("p");
        metadatos.className = "meta-data";

        const fecha = document.createElement("time");
        fecha.dateTime = datos.fechaISO;
        fecha.textContent = datos.fecha;

        metadatos.append(fecha, ` • ${datos.lectura}`);
        informacionAutor.append(autor, metadatos);
        pie.append(avatar, informacionAutor);

        contenido.append(categoria, titulo, descripcion, pie);
        tarjeta.append(figura, contenido);
        contenedor.append(tarjeta);
    });
}