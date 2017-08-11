import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RedirectInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).map((event: HttpEvent<any>) => {
			if (event instanceof HttpResponse) {
				// do stuff with response if you want
				if (event.status === 302) {
					window.location.href = 'login';
				}
				return event;
			}
		});

	}
}
