import { Component, OnInit } from "@angular/core";
import { Service } from "../laravel.service";
import { User } from "../user";

@Component({
  templateUrl: "./list.component.html"
})
export class ListComponent implements OnInit {
  constructor(private webservice: Service) {}

  listaUsuarios: User[];

  salvaPagina() {
    window.localStorage.setItem("previousUrl", window.location.href);
  }

  ngOnInit() {
    this.webservice.getUsers().subscribe(data => (this.listaUsuarios = data));
  }
}
