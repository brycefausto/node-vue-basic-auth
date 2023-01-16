import http from "@/http-common";

/* eslint-disable */
class AuthService {

  private baseUrl = '/auth';

  login(data: any): Promise<any> {
    return http.post(`${this.baseUrl}/login`, data);
  }

  user(): Promise<any> {
    return http.get(`${this.baseUrl}/user`);
  }

  register(data: any): Promise<any> {
    return http.post(`${this.baseUrl}/register`, data);
  }
}

export default new AuthService();
