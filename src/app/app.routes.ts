import { Routes } from '@angular/router';
import { HomeComponent } from './mypages/home/home.component';
import { LoginComponent } from './mypages/login/login.component';
import { ForgotPasswordComponent } from './mypages/forgot-password/forgot-password.component';
import { authGuard } from './auth.guard';
import { LogoutComponent } from './mypages/logout/logout.component';
import { UserComponent } from './mypages/user/user.component';
import { ProductComponent } from './mypages/product/product.component';

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
    logout: {
        path: 'logout',
        title: "Logout",
        component: LogoutComponent,
    },
    forgotPassword: {
        path: 'forgot-password',
        title: "Forgot Password",
        component: ForgotPasswordComponent,
    },
    user: {
        path: 'user',
        title: "Users",
        component: UserComponent,
    },
    product: {
        path: 'product',
        title: "Products",
        component: ProductComponent,
    },
}

export const routes: Routes = [
    {
        path: routeNames.home.path,
        component: routeNames.home.component,
        title: `Admin | ${routeNames.home.title}`,
        canActivate: [authGuard],
    },
    {
        path: routeNames.login.path,
        component: routeNames.login.component,
        title: `Admin | ${routeNames.login.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.logout.path,
        component: routeNames.logout.component,
        title: `Admin | ${routeNames.logout.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.forgotPassword.path,
        component: routeNames.forgotPassword.component,
        title: `Admin | ${routeNames.forgotPassword.title}`,
        // canActivate: [authGuard],
    },
    {
        path: routeNames.user.path,
        component: routeNames.user.component,
        title: `Admin | ${routeNames.user.title}`,
        canActivate: [authGuard],
    },
    {
        path: routeNames.product.path,
        component: routeNames.product.component,
        title: `Admin | ${routeNames.product.title}`,
        canActivate: [authGuard],
    },
];
