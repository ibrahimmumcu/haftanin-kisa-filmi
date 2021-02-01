export interface Film {
  description: string;
  featuredImage: string;
  link: string;
  title: string;
  videoEmbed: string;
  id: string;
}

export interface AllFilm {
  data: Film[];
  counter: number;
}
