import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheData } from './../model/cache-data';
import { map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  cacheData: CacheData[] = [];
  observable;

  constructor(private http: HttpClient) { }

  getQuestions(query): Observable<any> {
    let url = "https://api.stackexchange.com/2.2/search/excerpts?order=desc&sort=activity&q=" + query + "&site=stackoverflow&filter=!9Z(-x.0nI";

    let isPresent = this.cacheData.find(x => x.query == query);

    if (isPresent) {
      return of(isPresent.responseData);
    }
    else {
      this.observable = this.http.get(url, {
        observe: 'response'
      }).pipe(
        map(response => {
          this.observable = null;
          if (response.status === 400) {
            return 'Request failed.';
          } else if (response.status === 200) {
            if (this.cacheData.length < 5) {
              this.cacheData.push({
                query: query,
                responseData: response.body
              });
            }
            if (this.cacheData.length == 5) {
              this.cacheData.splice(0, 1);
              this.cacheData.push({
                query: query,
                responseData: response.body
              });
            }
            return response.body;
          }
        }),
        share()
      )
      return this.observable;
    }
  }
}
