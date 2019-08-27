import { Component, OnInit } from "@angular/core";

@Component({
  selector: "nav-bar",
  templateUrl: "./navbar.component.html"
})
export class NavbarComponent implements OnInit {
  constructor() {}

  public url: boolean = window.location.href.indexOf("/list") >= 0;
  public urlAtual: string;

  ngOnInit() {}
}
