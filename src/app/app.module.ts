import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClient } from './services/http-client.service';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF, Location } from '@angular/common';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';

import { MemeService } from './services/meme.service';
import { CreateComponent } from './create/create.component';
import { AttachComponent } from './attach/attach.component';

const appRoutes: Routes = [

  // dedicated routes
  { path: '', component: HomeComponent },
  { path: 'create', component: CreateComponent },
  { path: 'attach', component: AttachComponent },

  // 404
  { path: '404', component: NotFoundComponent },

  // catchall
  { path: '*', redirectTo: '404' },
  { path: '**', redirectTo: '404' }
];


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    CreateComponent,
    AttachComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    HttpClient
    ,MemeService
    ,{ provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
