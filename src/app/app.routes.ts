import { Routes } from '@angular/router';
import { HomeComponent } from './mypages/home/home.component';
import { LoginComponent } from './mypages/login/login.component';
import { ForgotPasswordComponent } from './mypages/forgot-password/forgot-password.component';

export const routeNames = {
    home: {
        path: 'home',
        title: "Home",
        component: HomeComponent,
    },
    login: {
        path: '',
        title: "Login",
        component: LoginComponent,
    },
    forgotPassword: {
        path: 'forgot-password',
        title: "Forgot Password",
        component: ForgotPasswordComponent,
    },
}

export const routes: Routes = [
    {
        path: routeNames.home.path,
        component: routeNames.home.component,
        title: `Admin | ${routeNames.home.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.login.path,
        component: routeNames.login.component,
        title: `Admin | ${routeNames.login.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.forgotPassword.path,
        component: routeNames.forgotPassword.component,
        title: `Admin | ${routeNames.forgotPassword.title}`,
        // canActivate: [authGuard],
    },
];
