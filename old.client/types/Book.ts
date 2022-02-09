export class Book {
  public "@id"?: string;

  constructor(
    _id?: string,
    public title?: string,
    public description?: string,
    public author?: string,
    public createAt?: Date
  ) {
    this["@id"] = _id;
  }
}
