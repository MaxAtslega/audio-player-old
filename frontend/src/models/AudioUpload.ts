export default class AudioUpload {
  name: string;

  category: string;

  file?: any;

  uuid?: string;

  constructor(name: string, category: string, file?: any, uuid?: string) {
    this.name = name;
    this.category = category;
    this.file = file;
    this.uuid = uuid;
  }
}
