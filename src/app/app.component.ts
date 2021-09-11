import { Component, OnInit } from '@angular/core';
import { PostHttpService } from './services/post-http.service';
import { Post } from "./post"


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  title : string = "";
  content : string = "";
  isFetching: boolean = false ;

  constructor(private postService: PostHttpService ) {}

  ngOnInit() {
    this.liveData()
  }

  onCreatePost(postData: Post ) {
    // Send Http request
    this.postService.createPost(postData.title , postData.content)
    .subscribe(posts=>{
      console.log(posts)
      this.title = "";
      this.content = "";
    })
    
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.getPosts()
    .subscribe(posts=>{
      this.loadedPosts = posts;
      this.isFetching = false;
    })
  }

  onClearPosts() {
    // Send Http request
    this.isFetching = true;
    this.postService.deletePosts()
    .subscribe(posts=>{
      this.isFetching = false;
    })
  }

  liveData(){
    this.postService.liveReload$.subscribe(()=>{
      this.onFetchPosts()
    })
    this.onFetchPosts();
  }
}
