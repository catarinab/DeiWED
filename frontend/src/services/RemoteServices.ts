import AttendeeDto from '@/models/deiwed/AttendeeDto';
import SessionDto from '@/models/deiwed/SessionDto';
import DeiwedError from '@/models/error/DeiwedError';
import axios from 'axios';

const httpClient = axios.create();
httpClient.defaults.timeout = 50000;
httpClient.defaults.baseURL = process.env.VUE_APP_ROOT_API;
httpClient.defaults.headers.post['Content-Type'] = 'application/json';

export default class RemoteServices {
  static async getAttendees(): Promise<AttendeeDto[]> {
    return httpClient
      .get('/attendees')
      .then((response) => response.data)
      .catch(async (error) => {
        throw new DeiwedError(
          await this.errorMessage(error),
          error.response.data.code
        );
      });
  }

  static async addAttendee(Promise: AttendeeDto) {
    return httpClient
      .post('/attendees', {
        id: 1,
        name: Promise.name,
        istId: Promise.istId,
        type: Promise.type
      })
      .then((response) => response.data)
      .catch(async (error) => {
        throw new DeiwedError(
          await this.errorMessage(error),
          error.response.data.code
        );
      });
  }

  static async deleteAttendee(studentId: number) {
    return httpClient
    .delete(`/attendees/${studentId}`)
    .then((response) => response.data)
    .catch(async (error) => {
      throw new DeiwedError(
        await this.errorMessage(error),
        error.response.data.code
      );
    });
  }

  static async updateAttendee(Promise: AttendeeDto) {
    return httpClient
      .put(`/attendees/${Promise.id}`, {
        id: 1,
        name: Promise.name,
        istId: Promise.istId,
        type: Promise.type
      })
      .then((response) => response.data)
      .catch(async (error) => {
        throw new DeiwedError(
          await this.errorMessage(error),
          error.response.data.code
        );
      });
  }

  static async getDishes(): Promise<[]> {
    return httpClient
      .get('https://eindhoven.rnl.tecnico.ulisboa.pt/food-store/api/v1/dishes')
      .then((response) => response.data)
      .catch(async (error) => {
        throw new DeiwedError(
          await this.errorMessage(error),
          error.response.data.code
        );
      });
  }

  static async getSessions(): Promise<SessionDto[]> {
    return httpClient
      .get('/sessions')
      .then((response) => response.data)
      .catch(async (error) => {
        throw new DeiwedError(
          await this.errorMessage(error),
          error.response.data.code
        );
      });
  }

  static async getSession(id: number): Promise<SessionDto> {
    return httpClient
      .get(`/sessions/${id}`)
      .then((response) => response.data)
      .catch(async (error) => {
        throw new DeiwedError(
          await this.errorMessage(error),
          error.response.data.code
        );
      });
  }

  static async errorMessage(error: any): Promise<string> {
    if (error.message === 'Network Error') {
      return 'Unable to connect to server';
    } else if (error.message.split(' ')[0] === 'timeout') {
      return 'Request timeout - Server took too long to respond';
    } else if (error.response?.data?.message) {
      return error.response.data.message;
    } else {
      return 'Unknown Error - Contact admin';
    }
  }
}
