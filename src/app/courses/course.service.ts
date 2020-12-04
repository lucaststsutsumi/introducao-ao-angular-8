import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './course';

@Injectable({ providedIn: 'root' })
export class CourseService {

  private courseUrl: string = 'http://localhost:3100/api/courses';

  constructor(private httpClient: HttpClient) { }

  retriveAll(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.courseUrl);
  }

  retrivebyId(id: number): Observable<Course> {
    return this.httpClient.get<Course>(`${this.courseUrl}/${id}`)
  }

  save(obj: Course): Observable<Course> {
    if (obj.id) {
      return this.httpClient.put<Course>(`${this.courseUrl}/${obj.id}`, obj);
    } else {
      return this.httpClient.post<Course>(this.courseUrl, obj);
    }
  }

  deleteById(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.courseUrl}/${id}`)
  }
}
