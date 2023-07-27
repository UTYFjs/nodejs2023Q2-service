export class Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }
}
