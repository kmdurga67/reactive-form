import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
  <div class="error">
    <h1>Error</h1>
    <p>{{ data.message }}</p>
  </div>
  `,
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
