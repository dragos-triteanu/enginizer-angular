import { ErrorHandler, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { ToastModule } from 'ng2-toastr';

import { CoreModule } from './core/core.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { AuthorizationHeaderInterceptor } from './shared/interceptors/auth-header.interceptor';
import { ErrorHandlingInterceptor } from '@app/shared/interceptors/error-handling.interceptor';

import { environment } from 'environments/environment';
import { UserMockInterceptor } from '@app/shared/mocks/user.mock.interceptor';
import { AuthenticationInterceptor } from '@app/authentication/mock/authentication.mock';
import { RolesMockInterceptor } from '@app/shared/mocks/roles.mock.interceptor';
import { PermissionsMockInterceptor } from '@app/shared/mocks/permissions.mock.interceptor';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

// Providers used to create fake backend
let mockProviders: any[] = [];

if (environment.useFakeBackend) {
    mockProviders = [
        {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: UserMockInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: RolesMockInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: PermissionsMockInterceptor, multi: true}
    ]
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        AuthenticationModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastModule.forRoot()
    ],
    providers: [
        mockProviders,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorizationHeaderInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlingInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

    constructor(private injector: Injector) {
    }
}
