export default class AttendeeDto {
  id: number = 0;
  date: string = '';
  speaker: string = '';
  theme: string = '';

  constructor(jsonObj?: AttendeeDto) {
    if (jsonObj) {
      this.id = jsonObj.id;
      if (jsonObj.date) this.date = jsonObj.date;
      if (jsonObj.speaker) this.speaker = jsonObj.speaker;
      if (jsonObj.theme) this.theme = jsonObj.theme;
    }
  }
}