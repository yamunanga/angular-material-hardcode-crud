import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CommonLayoutComponent } from './common-layout/common-layout.component';
import { YamunangaEmployeeComponent } from './yamunanga-employee/yamunanga-employee.component';
import { YamunangaLayoutComponent } from './yamunanga-layout/yamunanga-layout.component';

const routes: Routes =[
  // {
  //   path: '',
  //   redirectTo: 'Login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: CommonLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./common-layout/common-layout.module').then(m => m.CommonLayoutModule)
    },
    {
      path: '',
      loadChildren: () => import('./yamunanga-layout/yamunanga-layout.module').then(m => m.YamunangaLayoutModule)
    },
    
  ],
  
  }
  
  // {
  //   path: 'Login',
  //   component: LoginComponent
  // },

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }

