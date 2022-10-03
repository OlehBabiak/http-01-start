import {Injectable} from '@angular/core';
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url === 'http://localhost:8090/api/post') {
      return
    }
    const modifiedRequest = request.clone({
      headers: request.headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QxMSIsInVzZXJJZCI6IjYyZmY3NTQyYjM3YjBkNjgyZTg5NDNiMiIsImlhdCI6MTY2MDkwODg3NH0.Fy1BS9MGFJzkALh7hfPikIo5zKDfh0FDiC9gYkfQG7s')
    })
    // console.log('Request is on its way!')
    // console.log(request.url)
    return next.handle(modifiedRequest)
    //   .pipe(tap(event => {
    //   console.log(event);
    //   if (event.type === HttpEventType.Response) {
    //     console.log('Response arrived, body data; ');
    //     console.log(event.body)
    //   }
    // }));
  }
}
