import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from '../../services/loader-service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  show = false;
  public subscription: Subscription;
  constructor(
          public loaderService: LoaderService
      ) { }
  ngOnInit() { 
          this.subscription = this.loaderService.loaderState
              .subscribe((state: LoaderState) => {
                  this.show = state.show;
              });
      }
  ngOnDestroy() {
          this.subscription.unsubscribe();
      }
  }
