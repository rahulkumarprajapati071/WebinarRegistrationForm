import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentData } from '../interface/student-data';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/api-response';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http:HttpClient) { }
  private appUrl:string = 'http://glootech.eu-north-1.elasticbeanstalk.com/student';
  saveStudentData(obj: StudentData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.appUrl}/save`, obj);
  }

}
