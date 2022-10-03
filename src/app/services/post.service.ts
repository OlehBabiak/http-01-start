import {Injectable} from '@angular/core';
import {PostModel} from '../models/post.model';
import {HttpClient, HttpEventType, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Subject, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  error = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: PostModel = {title, content}
    return this.http
      .post<{ message: string }>('http://localhost:8090/api/posts',
        postData,
        {observe: 'response'}
      )
      .subscribe(res => {
        alert(res.body.message)
        // console.log('res ', res);
      }, error => {
        this.error.next(error.error.message)
      });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get('http://localhost:8090/api/posts',
        {
          // authorization
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          // можем прописувати в урлі але краще тут
          params: searchParams
        }
      )
      .pipe(map((res: { posts: PostModel[] }) => {
          return res.posts;
        }),
        catchError(errorRes => {
// Send to analytics server
          return throwError(errorRes)
        })
      )
  }

  deletePosts() {
    return this.http
      .delete('http://localhost:8090/api/posts',
        {
          observe: 'events',
          responseType: 'blob'
        }
      ).pipe(tap(event => {
        if (event.type === HttpEventType.Sent) {
          console.log(event)
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      }))
  }
}
