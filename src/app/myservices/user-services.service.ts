import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private http: HttpClient) { }

  url = "http://localhost:3000";

  async login(email: string, password: string): Promise<any> {
    try {
      const res = this.http.post<any>(
        `${this.url}/api/user/login`,
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return { success: true, data: "You have been logged in successfully." };
    } catch (error) {
      console.log("Login error", error);
      return { success: false, error };
    }
  }

  async logout(): Promise<any> {
    try {
      const res = this.http.post<any>(
        `${this.url}/api/user/logout`,
        {},
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return { success: true, data: "You have been logged out successfully." };
    } catch (error) {
      console.log("Login error", error);
      return { success: false, error };
    }
  }

  async getUser(): Promise<any> {
    try {
      const res = this.http.get<any>(
        `${this.url}/api/user/profile`,
        {
          withCredentials: true
        }
      );
      const result = await firstValueFrom(res);
      return { success: true, data: result };
    } catch (error) {
      console.log("Login error", error);
      return { success: false, error };
    }
  }
}
