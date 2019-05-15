import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
// import { fakeBackendProvider } from './_helpers/fake-backend';

// Inject the Firebase provider
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent }  from './app.component';

import { AlertComponent } from './share/components/alert/alert.component';
import { HomeComponent } from './user/components/home/home.component';
import { LoginComponent } from './user/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';
// import { JwtInterceptor } from './_helpers/jwt.interceptor';
// import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { ProfileComponent } from './user/components/profile/profile.component';
import { ManagedqrComponent } from './user/components/managedqr/managedqr.component';
import { AddqrComponent } from './user/components/fmanagedqr/addqr/addqr.component';
import { ListComponent } from './user/components/fmanagedqr/list/list.component';
import { HistoryComponent } from './user/components/fmanagedqr/history/history.component';
import { PageNotFoundComponent } from './share/components/page-not-found/page-not-found.component';
import { AuthenticationService } from './share/services/authentication.service';
import { AlertService } from './share/services/alert.service';
import { UserService } from './user/services/user.service';
import { GrdFilterPipe } from './grd-filter.pipe';
import { DetailQrComponent } from './user/components/fmanagedqr/detail-qr/detail-qr.component';
import { CommonModule } from '@angular/common';
import { RepairComponent } from './user/components/fmanagedqr/repair/repair.component';
import { Qrdata } from './models/qrdata';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // Only required for database features
        AngularFireAuthModule, // Only required for auth features,
        AngularFireStorageModule, // Only required for storage features
        NgxQRCodeModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        ManagedqrComponent,
        AddqrComponent,
        ListComponent,
        HistoryComponent,
        PageNotFoundComponent,
        GrdFilterPipe,
        DetailQrComponent,
        RepairComponent
    ],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        // fakeBackendProvider
        AuthenticationService,
        AlertService,
        UserService,
        Qrdata
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }