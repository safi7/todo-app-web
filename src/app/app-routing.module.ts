import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import MainNavLayoutComponent from '@components/layouts/main-nav/index.component';
import PlainLayoutComponent from '@components/layouts/plain/plain.component';
import toDoListComponent from '@components/pages/list/to-do-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/to-do-list', pathMatch: 'full' },
  {
    path: '',
    component: PlainLayoutComponent,
    children: [
      { path: 'to-do-list', component: toDoListComponent, pathMatch: 'full' },
    ]
  },
  {
    path: '',
    component: MainNavLayoutComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
