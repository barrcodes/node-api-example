import { IsNotEmpty, IsString } from "class-validator"

export class CreateNoteViewModel {
  public constructor(obj: any) {
    this.title = obj.title
    this.contents = obj.contents
  }

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  contents: string
}
