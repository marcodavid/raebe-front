import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdfviewer',
  templateUrl: './pdfviewer.component.html',
  styleUrls: ['./pdfviewer.component.css']
})
export class PdfviewerComponent implements OnInit {

  constructor() { }
  pdfSrc: string = '/assets/documents/Politicas De Privacidad RaeBe.pdf';
  ngOnInit() {
  }

}
