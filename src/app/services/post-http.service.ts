import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators"
import { Subject } from 'rxjs';
import { Post } from '../post';

@Injectable({
  providedIn: 'root'
})
export class PostHttpService {

  constructor(private http: HttpClient) { }
  private liveReload = new Subject<any>();
  get liveReload$(){
    return this.liveReload ;
  }

  // Post Creation :
  createPost(title : string , content : string){
    const postData: Post = {title: title , content : content}
    return this.http.post<{name : string}>("https://http-learn-14791-default-rtdb.europe-west1.firebasedatabase.app/posts.json", postData)
    .pipe(tap(()=>{
      this.liveReload.next(postData);
      console.log(postData)
    }))
  }

  //Fetching Posts :
  getPosts(){
    return this.http.get<{[key: string]: Post}>("https://http-learn-14791-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
    .pipe(map(postData=>{
      const postArray : Post[] = [];
      for (const key in postData){
      postArray.push({ ...postData[key], id : key })
      }
      return postArray
    }))  
  }

  //Deleting Posts :
  deletePosts(){
    return this.http.delete("https://http-learn-14791-default-rtdb.europe-west1.firebasedatabase.app/posts.json")
    .pipe(tap((posts)=>{
      this.liveReload.next(posts)
    }))
  }

}
