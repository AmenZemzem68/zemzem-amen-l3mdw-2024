import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../models/reset-password.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  public host = environment.host
  private baseUrl: string = `${this.host}:8070/api/Client`;
  constructor(private http : HttpClient) { }

  sendResetPasswordLink(email : string){
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`, {});
  }

  resetPassword(resetPassword : ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password`, resetPassword);
  }
}
