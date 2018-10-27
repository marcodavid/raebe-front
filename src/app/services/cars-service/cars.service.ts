import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';
import { Router } from '@angular/router';


@Injectable()
export class CarsService extends ConfigService{
  private httpOptions: any;
  private formdata: any;
  private server: string;
  private authToken: any;
  constructor(private http: HttpClient,
    private router: Router) {
    super();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.formdata = {
      headers: new HttpHeaders({ 'Content-Type': 'form-data' })
    };
    this.server = super.getServer();

  }

  public postCar(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PostCar/", JSON.stringify(json), this.httpOptions);
  }
  public postCarImages(fileToUpload: File,id)  {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('id_clients', id);
    return this.http.post("http://" + this.server + "/api/PostCarImages/", formData);
     
    }

  public getCarByID(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetCarByID/?id_clients=" + id, this.httpOptions)

  }

  public putCarForUpdate(userCar) {

    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.put("http://" + this.server + "/api/PutCarForUpdate/", JSON.stringify(userCar), this.httpOptions)

  }

  //Policy

  public getPolicyByID(id) {
    
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetPolicyByID/?id_car=" + id, this.httpOptions)

  }

  public postPolicy(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PostPolicy/", JSON.stringify(json), this.httpOptions);
  }

  public putPolicyForUpdate(userCar) {

    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.put("http://" + this.server + "/api/PutPolicyForUpdate/", JSON.stringify(userCar), this.httpOptions)

  }
  //coverages

  public getCoverageByID(id) {
    
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("http://" + this.server + "/api/GetCoverageByID/?id_policy=" + id, this.httpOptions)

  }

  public postCoverage(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PostCoverage/", JSON.stringify(json), this.httpOptions);
  }

  public putCoverageForUpdate(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("http://" + this.server + "/api/PutCoverageForUpdate/", JSON.stringify(json), this.httpOptions);
  }

  public deleteCoverage(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.delete("http://" + this.server + "/api/DeleteCoverage/?id_policy=" + id, this.httpOptions)
  }
  
  public getToken() {
    return super.getToken();

  }
}
