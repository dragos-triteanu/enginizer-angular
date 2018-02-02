import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const appRoutes = [
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
