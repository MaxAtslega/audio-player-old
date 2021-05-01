export default class Audio {

  uuid: string;
  name: string;
  category: number | string;

  createdAt: string;
  updatedAt: string;

  constructor(uuid: string, name: string, category: number | string, createdAt: string, updatedAt: string) {
    this.uuid = uuid;
    this.name = name;
    this.category = category;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
