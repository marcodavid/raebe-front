import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config-service/config.service';
import { Router } from '@angular/router';


@Injectable()
export class CarsService extends ConfigService{
  public httpOptions: any;
  public formdata: any;
  public server: string;
  public authToken: any;
  constructor(public http: HttpClient,
    public router: Router) {
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
    return this.http.post("https://" + this.server + "/api/PostCar/", JSON.stringify(json), this.httpOptions);
  }
  public postCarImages(fileToUpload: File,id,type = 1)  {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('id_clients', id);
    formData.append('type', type.toString());
    return this.http.post("https://" + this.server + "/api/PostCarImages/", formData);
     
    }

  public getCarByID(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetCarByID/?id_clients=" + id, this.httpOptions)

  }
  
  public getCarImagesByID(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetCarImagesByID/?id_clients=" + id, this.httpOptions)

  }
  public putCarForUpdate(userCar) {

    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.put("https://" + this.server + "/api/PutCarForUpdate/", JSON.stringify(userCar), this.httpOptions)

  }
  public deleteImage(id,type=1,idFile=0) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.delete("https://" + this.server + "/api/DeleteImage/?id_clients=" + id+"&type="+type+"&idFile="+idFile, this.httpOptions)
  }
  
  //Policy

  public getPolicyByID(id) {
    
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetPolicyByID/?id_car=" + id, this.httpOptions)

  }

  public postPolicy(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("https://" + this.server + "/api/PostPolicy/", JSON.stringify(json), this.httpOptions);
  }

  public putPolicyForUpdate(userCar) {

    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.put("https://" + this.server + "/api/PutPolicyForUpdate/", JSON.stringify(userCar), this.httpOptions)

  }
  //coverages

  public getCoverageByID(id) {
    
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.get("https://" + this.server + "/api/GetCoverageByID/?id_policy=" + id, this.httpOptions)

  }

  public postCoverage(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("https://" + this.server + "/api/PostCoverage/", JSON.stringify(json), this.httpOptions);
  }

  public putCoverageForUpdate(json) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.post("https://" + this.server + "/api/PutCoverageForUpdate/", JSON.stringify(json), this.httpOptions);
  }

  public deleteCoverage(id) {
    this.httpOptions.headers.append('Authorization', 'bearer' + this.getToken())
    return this.http.delete("https://" + this.server + "/api/DeleteCoverage/?id_policy=" + id, this.httpOptions)
  }
  
  public getToken() {
    return super.getToken();

  }
}
