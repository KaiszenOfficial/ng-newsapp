import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Source } from '../entities/Source';
import { environment } from 'src/environments/environment';
import { Headline } from '../entities/Headline';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }

	private setHeader(): HttpHeaders {
		return new HttpHeaders({ 'X-Api-Key': '926d02d121654bb892523ce9f97ed854' });
	}

	getSources(language: string): Observable<SourceResponse> {
		// tslint:disable-next-line:max-line-length
		return this.http.get<SourceResponse>(environment.baseUrl + environment.sourceUrl + `/${language}`, { headers: this.setHeader() });
	}

	getHeadlines(sourceId: string): Observable<HeadlineResponse> {
		// tslint:disable-next-line:max-line-length
		return this.http.get<HeadlineResponse>(environment.baseUrl + environment.headlineUrl + `/${sourceId}`, { headers: this.setHeader() });
	}

	searchHeadline(query: string): Observable<HeadlineResponse> {
		// tslint:disable-next-line:max-line-length
		return this.http.get<HeadlineResponse>(environment.baseUrl + environment.articleUrl + `/search?q=${query}`, { headers: this.setHeader() });
	}
}

export interface SourceResponse {
	status: string;
	sources: Source[];
}

export interface HeadlineResponse {
	status: string;
	headlines: Headline[];
}
