import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/screens/auth/login/login.component';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { FooterComponent } from './components/partials/footer/footer.component';

import { CommonTemplateModule } from './components/shared/common-template/common-template.module';
import { AuthService } from './components/screens/auth/auth.service';
import { UserService } from './components/screens/auth/user.service';
import { SharedModule } from './components/shared/shared.module';
import { ErrorsModule } from './components/screens/errors/errors.module';
import { HeaderComponent } from './components/partials/header/header.component';
import { BaseDetailsComponent } from './components/base/common/base-details/base-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Constants } from './constants';
import { ChatSocket } from './sockets/ChatSocket';
import { MapSocket } from './sockets/MapSocket';
import { FetcherSocket } from './sockets/FetcherSocket';
import {GitSocket} from "./sockets/GitSocket";
import { SettingsModule } from './components/screens/settings/settings.module';
import { FormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { InboxemoduleModule } from './components/screens/inbox/inboxmodule.module';
import {JobsSocket} from "./sockets/JobsSocket";
const config: SocketIoConfig = { url: `${Constants.BASE_NODE_URL}/chat`, options: {} };
const mapsConfig: SocketIoConfig = {url: `${Constants.BASE_NODE_URL}/map`, options: { }};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    BaseDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingBarHttpClientModule,
    SharedModule,
    ErrorsModule,
    CommonTemplateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    NgSelectModule,
    SocketIoModule,
    SocketIoModule.forRoot(config),
    SocketIoModule.forRoot(mapsConfig),
    SettingsModule, FormsModule, FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(), InboxemoduleModule
  ],
  providers: [
    AuthService,
    UserService,
    ChatSocket,
    FetcherSocket,
    MapSocket,
    GitSocket,
    JobsSocket,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
