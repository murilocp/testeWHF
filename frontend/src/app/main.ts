import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app.module";
import { Service } from "./laravel.service";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
