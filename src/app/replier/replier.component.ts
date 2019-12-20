import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-replier',
  templateUrl: './replier.component.html',
  styleUrls: ['./replier.component.css']
})
export class ReplierComponent implements OnInit {

  public repliedMessage: string = '';
  public confirm : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ReplierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  public sendMessage(): void {
    this.dialogRef.close();
    console.log( 'message sent...' );
  }

  public click(){
    
  }

  ngOnInit() {
  }

}
