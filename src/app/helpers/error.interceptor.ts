import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private authenticationService: AuthService) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError(err => {
				console.log(
					`%c ${request.url}`,
					"background: #0ff; color: #f00"
				);
				if (
					err.status === 401 &&
					// Exclude the getuserdata route, otherwise it causes an infinite redirect
					!request.url
						.toLowerCase()
						.endsWith("Account/GetUserData".toLowerCase())
				) {
					this.authenticationService.logout();
					location.reload(true);
				}

				if (err.status !== 401) {
					const error = err.error.message || err.statusText;
					return throwError(error);
				}
			})
		);
	}
}
