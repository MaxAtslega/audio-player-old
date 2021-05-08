export default class Audio {
  uuid: string;

  name: string;

  category: number | string;

  createdAt: string;

  updatedAt: string;

  file: string;

  constructor(
    uuid: string,
    name: string,
    category: number | string,
    createdAt: string,
    updatedAt: string,
    file: string
  ) {
    this.uuid = uuid;
    this.name = name;
    this.category = category;
    this.file = file;

    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
