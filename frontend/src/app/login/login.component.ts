import { Component, OnInit } from "@angular/core";
import { Service } from "../laravel.service";
import { User } from "../user";
import { Usuario } from "./usuario-login";

@Component({
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  constructor(private webservice: Service) {}

  private usuario: User;

  login() {
    let self = this;
    var $retorno = this.webservice
      .loginUser(self.usuario.email, self.usuario.password)
      .subscribe(
        success =>
          function($location) {
            $location.path("/home");
            self.webservice.setUsuario(self.usuario);
          },
        error => console.error(error),
        () => console.log("request completo")
      );
  }

  salvaPagina() {
    window.localStorage.setItem("previousUrl", window.location.href);
  }

  ngOnInit() {}
}
