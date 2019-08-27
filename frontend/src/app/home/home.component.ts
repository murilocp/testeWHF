import { Component, OnInit } from "@angular/core";
import { Route } from "@angular/compiler/src/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
  constructor() {}

  public url: string = window.location.href;

  exibeAlerta(evento) {
    console.log(evento);
    alert("OK");
  }

  private router: Router;

  ngOnInit() {
    console.log(window.location.href);
  }
}
