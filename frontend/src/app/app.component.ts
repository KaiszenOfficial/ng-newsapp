import { Component, HostListener, OnInit } from '@angular/core';
import { Source } from './entities/Source';
import { Headline } from './entities/Headline';
import { Observable } from 'rxjs';

import { ApiService, SourceResponse, HeadlineResponse } from './services/api.service';
import { SharedService } from './services/shared.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'ng-newsapp';

	sources: Source[] = [];
	headlines: Headline[] = [];
	article: Headline;

	isLoading: boolean;

	isMobile: boolean = window.innerWidth > 900 ? false : true;

	@HostListener('window:resize', ['$event'])
	onResize(event: any): void {
		// console.log(event.target.innerWidth);
		if (event.target.innerWidth > 900) {
			this.isMobile = false;
		} else {
			this.isMobile = true;
		}
	}

	constructor(private api: ApiService, private shared: SharedService) { }

	ngOnInit(): void {
		// console.log(window.innerWidth, this.isMobile);
		this.isLoading = true;
		this.shared.currentLanguage.subscribe(language => {
			this.isLoading = true;
			if (language) {
				this.getSources(language).subscribe(sourceResponse => {
					this.sources = sourceResponse.sources;
					this.shared.currentSource.next(this.sources[0]);
				});
			}
		});


		this.shared.currentSource.subscribe(source => {
			if (source) {
				this.getHeadlines(source.id).subscribe(headlineResponse => {
					this.headlines = headlineResponse.headlines;
					this.article = this.headlines[0];
					this.shared.currentHeadline.next(this.headlines[0]);
					this.shared.currentArticle.next(this.formatArticle(this.headlines[0]));
					this.isLoading = false;
				});
			}
		});
	}

	getSources(language: string): Observable<SourceResponse> {
		return this.api.getSources(language);
	}

	getHeadlines(sourceId: string): Observable<HeadlineResponse> {
		return this.api.getHeadlines(sourceId);
	}

	formatArticle(article: Headline): Headline {
		return { ...article, content: article.content.split('[')[0] };
	}
}
