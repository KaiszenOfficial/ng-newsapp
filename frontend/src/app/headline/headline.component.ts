import { Component, OnInit, Input } from '@angular/core';
import { Headline } from '../entities/Headline';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-headline',
	templateUrl: './headline.component.html',
	styleUrls: ['./headline.component.css']
})
export class HeadlineComponent implements OnInit {

	@Input() headlines: Headline[];
	@Input() isMobile: boolean;
	currentHeadline: Headline;
	headline: number;

	options: string[] = [];

	toggleSearch: boolean;

	constructor(private shared: SharedService) { }

	ngOnInit(): void {
		this.shared.currentHeadline.subscribe(headline => {
			this.currentHeadline = headline;
			this.headline = this.currentHeadline.id;
		});
	}

	onHeadlineChange(): void {
		let headline: Headline;
		if (typeof this.headline === 'number') {
			headline = this.headlines.find(h => h.id === this.headline);
		} else {
			headline = this.headlines.find(h => h.id === this.headline[0]);
		}
		// console.log(headline);
		this.shared.setCurrentHeadline(headline);
		this.shared.setCurrentArticle(headline);
	}

	toggleSearchBox(): void {
		this.toggleSearch = !this.toggleSearch;
	}

}
