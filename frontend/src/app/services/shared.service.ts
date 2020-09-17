import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Source } from '../entities/Source';
import { Headline } from '../entities/Headline';

@Injectable({
	providedIn: 'root'
})
export class SharedService {

	currentSource: BehaviorSubject<Source> = new BehaviorSubject<Source>(null);
	currentHeadline: BehaviorSubject<Headline> = new BehaviorSubject<Headline>(null);
	currentArticle: BehaviorSubject<Headline> = new BehaviorSubject<Headline>(null);
	currentLanguage: BehaviorSubject<string> = new BehaviorSubject<string>(null);
	currentLocation: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	constructor() { }

	setCurrentSource(source: Source): void {
		this.currentSource.next(source);
	}

	setCurrentHeadline(headline: Headline): void {
		this.currentHeadline.next(headline);
	}

	setCurrentArticle(article: Headline): void {
		this.currentArticle.next(this.formatArticle(article));
	}

	setCurrentLanguage(language: string): void {
		this.currentLanguage.next(language);
	}

	setCurrentLocation(location: string): void {
		this.currentLocation.next(location);
	}

	private formatArticle(article: Headline): Headline {
		return { ...article, content: article.content.split('[')[0] };
	}
}
