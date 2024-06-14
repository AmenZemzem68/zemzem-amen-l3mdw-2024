import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode, importProvidersFrom } from "@angular/core";
import { AppModule } from "./app.module";

enableProdMode();
importProvidersFrom()
platformBrowserDynamic().bootstrapModule(AppModule);
