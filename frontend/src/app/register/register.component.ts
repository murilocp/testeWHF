import { Component, OnInit } from "@angular/core";
import { Service } from "../laravel.service";
import { User } from "../user";
import { HttpClient } from "@angular/common/http";

@Component({
  templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
  constructor(private webservice: Service, private http: HttpClient) {}

  usuario: User = new User();
  listaUsuarios: User[];

  public previousUrl: string = window.localStorage.getItem("previousUrl");

  ngOnInit() {}

  consultaCEP(cep, form) {
    var cep = cep.replace(/\D/g, "");
    if (cep != "") {
      var validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        this.http
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .subscribe(dados => this.populaDadosForm(dados));
      }
    }
  }

  populaDadosForm(dados) {
    this.usuario.endereco = dados.logradouro;
    this.usuario.bairro = dados.bairro;
    this.usuario.cidade = dados.localidade;
    this.usuario.estado = dados.uf;
  }

  createUser() {
    let self = this;
    var $retorno = this.webservice.createUser(self.usuario).subscribe(
      success =>
        function($location) {
          $location.path("/home");
          self.webservice.setUsuario(self.usuario);
        },
      error => console.error(error),
      () => console.log("request completo")
    );

    console.log($retorno);
  }
}
