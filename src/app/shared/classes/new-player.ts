export class NewPlayer {
  idDto?: number;
  nameDto: string;

  constructor(idDto: number, nameDto: string) {
    this.idDto = idDto;
    this.nameDto = nameDto;
  }

}
