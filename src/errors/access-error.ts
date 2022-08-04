export class AccessError implements Error {
  public name = "AccessError"
  public message: string

  constructor(userId: number, repositoryName: string, id: number) {
    this.message = `User ${userId} is not authorized to perform action on resource ${repositoryName} id ${id}.`
  }
}
