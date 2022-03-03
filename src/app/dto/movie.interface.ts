export interface INfometa {
  '?xml': string;
  movie: MovieClass;
}

export interface MovieClass {
  title: string;
  originaltitle: string;
  sorttitle: string;
  epbookmark: string;
  year: number;
  ratings: Ratings;
  userrating: number;
  top250: number;
  set: string;
  plot: string;
  outline: string;
  tagline: string;
  runtime: number;
  thumb: string[];
  fanart: Fanart;
  mpaa: string;
  certification: string;
  id: string;
  tmdbid: number;
  tmdbCollectionId: string;
  uniqueid: Array<number | string>;
  country: string;
  status: string;
  code: string;
  premiered: string;
  watched: boolean;
  playcount: string;
  lastplayed: string;
  genre: string;
  studio: string[];
  credits: string[];
  director: string;
  tag: string[];
  actor: Actor[];
  producer: Actor[];
  trailer: string;
  languages: string;
  dateadded: string;
  fileinfo: Fileinfo;
  source: string;
  edition: string;
  original_filename: string;
  user_note: string;
}

export interface Actor {
  name: string;
  role: string;
  thumb: string;
  profile?: string;
}

export interface Fanart {
  thumb: string;
}

export interface Fileinfo {
  streamdetails: Streamdetails;
}

export interface Streamdetails {
  video: Video;
  audio: Audio[];
  subtitle: Subtitle[];
}

export interface Audio {
  codec: string;
  language: string;
  channels: number;
}

export interface Subtitle {
  language: string;
}

export interface Video {
  codec: string;
  aspect: number;
  width: number;
  height: number;
  durationinseconds: number;
  stereomode: string;
}

export interface Ratings {
  rating: Rating[];
}

export interface Rating {
  value: number;
  votes: number;
}
