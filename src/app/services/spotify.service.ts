import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {    

  constructor( private http: HttpClient ) { 
    console.log('Spotify service listo');
  }

  getQuery( query: string ){

  const url = `https://api.spotify.com/v1/${ query }`;

  const headers = new HttpHeaders({
    'Authorization': 'Bearer BQAflQQFXTzqKcx-6Ed91C29dS3XEBaQYe7m13bzP36pg16HuUV4sQtFfbT_9kWppBPBLq8s5plc1k54Nfp43xKTxeO6vCR6v77yeYUkJWZn2DdZdf0'
  });
  
  return this.http.get(url, { headers });
}

  getNewReleases(){    
    return this.getQuery('browse/new-releases?offset=0&limit=20')
                .pipe( map( (data:Data): any => data['albums'].items ));
  }
  
  getArtistas( termino: string ){
  
    return this.getQuery(`search?q=${ termino }&type=artist&market=ES&limit=15`)
               .pipe( map( (data:Data): any => data['artists'].items ));                
  }

  getArtista( id: string ){
  
    return this.getQuery(`artists/${ id }`);
              //  .pipe( map( (data:Data): any => data['artists'].items ));                
  }

  getTopTracks( id: string ){
  
    return this.getQuery(`artists/${ id }/top-tracks?market=us`)
               .pipe( map( (data:Data): any => data['tracks']));
  }

}
