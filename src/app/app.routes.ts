import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './index-page/index-page.component';
import { ClientPageComponent } from './client-page/client-page.component';

import { FeaturedVehiclesComponent } from './client-page/featured-vehicles/featured-vehicles.component';
import { VehicleInfoComponent } from './client-page/vehicle-info/vehicle-info.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { AgreementComponent } from './client-page/agreement/agreement.component';
import { PayementComponent } from './client-page/payement/payement.component';

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
import { AuthGuardService } from './services/auth-guard-service/auth-guard.service';
import { RenterComponent } from './profile-page/renter/renter.component';

import { PdfviewerComponent } from './pdfviewer/pdfviewer.component';

const app_routes: Routes = [
    { path : '', component : IndexPageComponent },
    { path : 'privacy', component : PdfviewerComponent },
    { path : 'home', component : IndexPageComponent, canActivate: [AuthGuardService]},
    {
        path : 'profile', component : ProfilePageComponent,
        children : [
            { path : '', component : MyInfoComponent },
            { path : 'my-info', component : MyInfoComponent },
            { path : 'rents', component : RentsComponent },           
            { path : 'renter', component : RenterComponent },
            { path : 'reviews', component : ReviewsComponent },
            { path : 'messages', component : MessagesComponent }
        ]/*,
        canActivate: [AuthGuardService]*/
    },
    {
        path : 'client', component : ClientPageComponent,
        children : [
            { path : '', component : FeaturedVehiclesComponent },
            { path : 'featured-vehicles', component : FeaturedVehiclesComponent },
            { path : 'vehicle-info', component : VehicleInfoComponent },
            { path : 'agreement', component : AgreementComponent },
            { path : 'payement', component : PayementComponent }
        ]/*,
        canActivate: [AuthGuardService]*/
    },
    {
        path : 'renter', component : RenterPageComponent,
        children : [
            { path : '', component : RenterIndexComponent },
            { path : 'vehicle', component : MyVehicleComponent },
            { path : 'features', component : MyVehicleFeaturesComponent },
            { path : 'extras', component : MyVehicleExtrasComponent },
            { path : 'insurance', component : MyVehicleInsuranceComponent },
            { path : 'policies', component : MyVehiclePoliciesComponent },
            { path : 'calendar', component : MyVehicleCalendarComponent },
            { path : 'calendar-lock', component : CalendarLockComponent },
            { path : 'prices', component : MyVehiclePricesComponent },
            { path : 'images', component : MyVehicleImagesComponent }
        ]/*,
        canActivate: [AuthGuardService]*/
    },
    { path : '**', component : NotFoundPageComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);
