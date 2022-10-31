export default class AttendeeDto {
  id: number = 0;
  name: string = '';
  istId: string = '';
  type: string = '';

  constructor(jsonObj?: AttendeeDto) {
    if (jsonObj) {
      this.id = jsonObj.id;
      if (jsonObj.name) this.name = jsonObj.name;
      if (jsonObj.istId) this.istId = jsonObj.istId;
      if (jsonObj.type) this.type = jsonObj.type;
    }
  }
}