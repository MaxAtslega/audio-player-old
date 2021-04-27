export default class Audio {
  public id?: string;

  name: string;
  url: string;
  category: number | string;

  constructor(name: string, url: string, category: number | string) {
    this.name = name;
    this.url = url;
    this.category = category;
  }
}
