// interface de atributos comunes a todos los items (solo usar para heredar)
export interface IBaseItem {
  fecha_adquisicion: string;
  url_foto: string;
  nombre: string;
  tipo: string;
  descripcion: string;
}

// interfaces para la creación de nuevos items ( para usar en los modales de creación de items)

export interface ILibroCreate extends IBaseItem {
  autor: string;
  editorial: string;
  genero: string;
  edicion: string;
  isbn: string;
  paginas: number;
  anio_publicacion: number;
}

export interface IFiguraCreate extends IBaseItem {
  origen: string;
  tamano: number;
  material: string;
  empresa: string;
}

export interface IArmaCreate extends IBaseItem {
  material: string;
  tamano: number;
  peso: number;
  fabricante: string;
}

export interface ICartaCreate extends IBaseItem {
  juego: string;
}

export interface IVideojuegoCreate extends IBaseItem {
  plataforma: string;
  genero: string;
  creador: string;
  caracteristicas: string;
}

// interfaces para la obtención y actualización de items ( ya que contienen el id)

export interface ILibro extends ILibroCreate {
  _id: string;
}

export interface IFigura extends IFiguraCreate {
  _id: string;
}

export interface IArma extends IArmaCreate {
  _id: string;
}

export interface ICarta extends ICartaCreate {
  _id: string;
}

export interface IVideojuego extends IVideojuegoCreate {
  _id: string;
}

