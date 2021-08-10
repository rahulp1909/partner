import { NgModule } from "@angular/core";
import { MatInputModule, MatCardModule, MatToolbarModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AngularMaterialModule {

}
