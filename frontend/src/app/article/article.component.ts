import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Headline } from '../entities/Headline';
import { ApiService } from '../services/api.service';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-article',
	templateUrl: './article.component.html',
	styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, AfterViewInit {

	@Input() article: Headline;
	options: Headline[] = [];

	@ViewChild('search') search: ElementRef;

	constructor(private shared: SharedService, private api: ApiService) { }

	ngOnInit(): void {
		this.shared.currentArticle.subscribe(article => {
			if (article) {
				this.article = article;
			}
		});
	}

	ngAfterViewInit(): void {
		fromEvent(this.search.nativeElement, 'keyup')
			.pipe(
				filter(Boolean),
				debounceTime(150),
				distinctUntilChanged(),
				tap((text) => {
					console.log(this.search.nativeElement.value);
					this.api.searchHeadline(this.search.nativeElement.value).subscribe(response => {
						this.options = response.headlines;
					}, error => {
						console.log(error);
					});
				})
			)
			.subscribe();
	}

	getOptionText(option: Headline): string {
		return option.title;
	}

	setCurrentArticle(option: Headline): void {
		this.shared.setCurrentArticle(option);
	}

}
