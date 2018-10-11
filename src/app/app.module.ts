import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { NearbyCarsComponent } from './index-page/nearby-cars/nearby-cars.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchComponent } from './search/search.component';
import { CarCardComponent } from './car-card/car-card.component';
import { LoginModalComponent } from './index-page/login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FooterComponent } from './footer/footer.component';
import { SignupModalComponent } from './index-page/signup-modal/signup-modal.component';

import { ClientPageComponent } from './client-page/client-page.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { VehiclesComponent } from './client-page/vehicles/vehicles.component';
import { VehicleInfoComponent } from './client-page/vehicle-info/vehicle-info.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AgreementComponent } from './client-page/agreement/agreement.component';
import { PayementComponent } from './client-page/payement/payement.component';
import { NearbyCarsMapComponent } from './client-page/nearby-cars-map/nearby-cars-map.component';
import { ClientsService } from './services/clients-service/clients.service';
import { ConfigService } from './services/config-service/config.service';
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';

// Rutas
import { app_routing } from './app.routes';

import { BannerComponent } from './banner/banner.component';
import { FeaturedVehiclesComponent } from './client-page/featured-vehicles/featured-vehicles.component';
import { RenterPageComponent } from './renter-page/renter-page.component';
import { RenterIndexComponent } from './renter-page/renter-index/renter-index.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { MyVehicleComponent } from './renter-page/my-vehicle/my-vehicle.component';
import { MyVehicleFeaturesComponent } from './renter-page/my-vehicle-features/my-vehicle-features.component';
import { MyVehicleExtrasComponent } from './renter-page/my-vehicle-extras/my-vehicle-extras.component';
import { MyVehicleInsuranceComponent } from './renter-page/my-vehicle-insurance/my-vehicle-insurance.component';
import { MyVehiclePoliciesComponent } from './renter-page/my-vehicle-policies/my-vehicle-policies.component';
import { MyVehicleCalendarComponent } from './renter-page/my-vehicle-calendar/my-vehicle-calendar.component';
import { MyVehiclePricesComponent } from './renter-page/my-vehicle-prices/my-vehicle-prices.component';
import { MyVehicleImagesComponent } from './renter-page/my-vehicle-images/my-vehicle-images.component';
import { RentsComponent } from './profile-page/rents/rents.component';
import { ReviewsComponent } from './profile-page/reviews/reviews.component';
import { MessagesComponent } from './profile-page/messages/messages.component';
import { MyInfoComponent } from './profile-page/my-info/my-info.component';
import { CalendarLockComponent } from './renter-page/calendar-lock/calendar-lock.component';
import { VehicleMapComponent } from './client-page/vehicle-map/vehicle-map.component';

// Angular Google Maps
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    NearbyCarsComponent,
    NavbarComponent,
    SearchComponent,
    CarCardComponent,
    LoginModalComponent,
    FooterComponent,
    SignupModalComponent,
    ClientPageComponent,
    IndexPageComponent,
    VehiclesComponent,
    VehicleInfoComponent,
    ProfilePageComponent,
    AgreementComponent,
    PayementComponent,
    NearbyCarsMapComponent,
    BannerComponent,
    FeaturedVehiclesComponent,
    RenterPageComponent,
    RenterIndexComponent,
    NotFoundPageComponent,
    MyVehicleComponent,
    MyVehicleFeaturesComponent,
    MyVehicleExtrasComponent,
    MyVehicleInsuranceComponent,
    MyVehiclePoliciesComponent,
    MyVehicleCalendarComponent,
    MyVehiclePricesComponent,
    MyVehicleImagesComponent,
    RentsComponent,
    ReviewsComponent,
    MessagesComponent,
    MyInfoComponent,
    CalendarLockComponent,
    VehicleMapComponent,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    app_routing,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBLdKMt-GsD7dfG6yoh6H4Rorbe0ER3vdg'
    }),
  ],
  providers: [
    ClientsService,
    ConfigService,
    AuthGuardService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
