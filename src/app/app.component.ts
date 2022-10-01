import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.http
      .post<{ message: string }>('http://localhost:8090/api/posts', postData)
      .subscribe(res => {
        console.log(res);
      })
    ;
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.isFetching = true;
    this.http
      .get('http://localhost:8090/api/posts')
      .pipe(map((res: {posts: PostModel[]}) => {
        return res.posts;
      }))
      .subscribe(posts => {
        this.isFetching = false
        this.loadedPosts = posts;
      });
  }
}
