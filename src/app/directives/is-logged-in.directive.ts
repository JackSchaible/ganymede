import { Directive, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Directive({
  selector: "[isLoggedIn]"
})
export class IsLoggedInDirective {
  hasView: boolean;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    //TODO: look and see how work does this
  }
}
