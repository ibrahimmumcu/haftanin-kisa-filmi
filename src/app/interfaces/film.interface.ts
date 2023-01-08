export interface Film {
  description: string;
  featuredImage: string;
  featuredImageFileName: string;
  featuredImageFileLocation: string;
  link: string;
  title: string;
  videoEmbed: string;
  id: string;
}

export interface AllFilms {
  data: Film[];
  counter: number;
}
