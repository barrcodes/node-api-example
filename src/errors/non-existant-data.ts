export class NonExistantDataError implements Error {
  public name = "NonExistantDataError"
  public message: string

  constructor(repositoryName: string, id: number) {
    this.message = `${repositoryName} does not contain data at id ${id}`
  }
}
