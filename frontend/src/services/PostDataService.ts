import http from "@/http-common";

/* eslint-disable */
class PostDataService {

  private baseUrl = '/posts';

  getAll(): Promise<any> {
    return http.get(this.baseUrl);
  }

  get(id: any): Promise<any> {
    return http.get(`${this.baseUrl}/${id}`);
  }

  create(data: any): Promise<any> {
    return http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Promise<any> {
    return http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`${this.baseUrl}/${id}`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`${this.baseUrl}?title=${title}`);
  }
}

export default new PostDataService();
