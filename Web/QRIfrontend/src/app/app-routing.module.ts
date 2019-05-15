import { AuthGuard } from './share/guard/auth.guard';
import { HomeComponent } from './user/components/home/home.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { ManagedqrComponent } from './user/components/managedqr/managedqr.component';
import { LoginComponent } from './user/components/login/login.component';
import { RegisterComponent } from './user/components/register/register.component';
import { AddqrComponent } from './user/components/fmanagedqr/addqr/addqr.component';
import { ListComponent } from './user/components/fmanagedqr/list/list.component';
import { DetailQrComponent } from './user/components/fmanagedqr/detail-qr/detail-qr.component';
import { HistoryComponent } from './user/components/fmanagedqr/history/history.component';
import { PageNotFoundComponent } from './share/components/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RepairComponent } from './user/components/fmanagedqr/repair/repair.component';

const appRoutes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        canActivate: [AuthGuard],
        // children: [
        //     { path: 'profile', component: ProfileComponent },
        //     { path: 'managedqr', component: ManagedqrComponent }
        // ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'managedqr', component: ManagedqrComponent, canActivate: [AuthGuard]},
    { path: 'managedqr/addqr', component: AddqrComponent, canActivate: [AuthGuard] },
    { path: 'managedqr/list', component: ListComponent, canActivate: [AuthGuard] },
    { path: 'managedqr/list/:id', component: DetailQrComponent, canActivate: [AuthGuard] },
    { path: 'managedqr/repair/:id', component: RepairComponent, canActivate: [AuthGuard] },
    { path: 'managedqr/history', component: HistoryComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        // CommonModule,
        // RouterModule.forRoot(appRoutes)
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <- debugging purposes only
        )
        // other imports here
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})

export class AppRoutingModule { }
export const routingComponents = [
                                    HomeComponent,
                                    ProfileComponent,
                                    ManagedqrComponent,
                                    LoginComponent,
                                    RegisterComponent,
                                    AddqrComponent,
                                    ListComponent,
                                    HistoryComponent,
                                    PageNotFoundComponent,
                                ]