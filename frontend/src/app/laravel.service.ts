import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from "./user";
import { tap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class Service {
  private headers = new HttpHeaders({
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "http://localhost:4200",
    "Access-Control-Allow-Origins": "*"
  });

  private api = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) {}

  public loginUser(email: string, senha: string) {
    return this.http
      .post(this.api + "/user/login", "email=" + email + "&password=" + senha, {
        headers: this.headers
      })
      .pipe(take(1));
  }

  setUsuario(usuario) {
    window.localStorage.setItem("usuarioEmail", usuario.email);
    window.localStorage.setItem("usuarioToken", usuario.token);
  }

  getUsuario(usuario) {
    return {
      email: window.localStorage.getItem("usuarioEmail"),
      token: window.localStorage.getItem("usuarioToken")
    };
  }

  public getUsers() {
    return this.http
      .get<User[]>(this.api + "/user/list")
      .pipe(tap(console.log));
  }

  public createUser(user: User) {
    return this.http
      .post(this.api + "/user/create", user, {
        headers: this.headers
      })
      .pipe(take(1));
  }

  public updateUser(user: User) {
    return this.http.put(`${this.api}/user/edit/${user.id}`, user, {
      headers: this.headers
    });
  }

  public deleteUser(user: User) {
    return this.http.delete(`${this.api}/user/${user.id}`);
  }
}
