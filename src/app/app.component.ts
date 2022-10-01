import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {PostModel} from './models/post.model';
import {PostService} from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: PostModel[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postService: PostService) {
  }

  ngOnInit() {
    this.getPosts()
  }

  onCreatePost(postData: PostModel) {
    // Send Http request
    this.postService.createAndStorePost(postData.title, postData.content)
      .subscribe(res => {
        console.log('res ', res);
      }, error => {
        this.error = error.error.message
        console.log(error)
      })
  }

  onFetchPosts() {
    // Send Http request
    this.getPosts()
  }

  onClearPosts() {
    this.postService.deletePosts()
      .subscribe(res => {
        this.loadedPosts = []
        console.log(res)
      });
  }

  private getPosts() {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts
      }, error => {
        this.error = error.statusText + ` 404`
        console.log(error)
      }
    )
  }

}
