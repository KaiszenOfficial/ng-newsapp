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
	currentHeadline: Headline;
	headline: Headline;

	options: string[] = [];

	toggleSearch: boolean;

	constructor(private shared: SharedService) { }

	ngOnInit(): void {
		this.shared.currentHeadline.subscribe(headline => {
			this.currentHeadline = headline;
		});
	}

	onHeadlineChange(): void {
		this.shared.setCurrentHeadline(this.headline[0]);
		this.shared.setCurrentArticle(this.headline[0]);
	}

	toggleSearchBox(): void {
		this.toggleSearch = !this.toggleSearch;
	}

}
