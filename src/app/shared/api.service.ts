import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }


  postData( data: any){
    let extendUrl = `${this.url}`
    return this.http.post<any>(extendUrl, data).pipe(map((res:any)=>{
      return res;
    }))
  }
  getData(){
    let extendUrl = `${this.url}`
    return this.http.get<any>(extendUrl).pipe(map((res:any)=>{
      return res;
    }))
  }
  updateData(data: any,id:number){
    let extendUrl = `${this.url}`
    return this.http.put<any>(`${extendUrl}/${id}`,data).pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteData(id:number){
    let extendUrl = `${this.url}`
    return this.http.delete<any>(`${extendUrl}/${id}`).pipe(map((res:any)=>{
      return res;
    }))
  }
}
