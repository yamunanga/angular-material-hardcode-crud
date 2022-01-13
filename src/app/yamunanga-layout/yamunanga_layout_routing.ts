import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from '../test/test.component';

import { UserComponent } from '../user/user.component';
import { YamunangaEmployeeComponent } from '../yamunanga-employee/yamunanga-employee.component';


export const YamunangaLayoutRoutes: Routes = [
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'emp',
    component: YamunangaEmployeeComponent
  }
];

