import { Component, OnInit, Input } from '@angular/core';
import { Source } from '../entities/Source';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-source',
	templateUrl: './source.component.html',
	styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

	@Input() sources: Source[];
	@Input() isMobile: boolean;
	currentSource: Source;
	source: any;

	constructor(private shared: SharedService) { }

	ngOnInit(): void {
		this.shared.currentSource.subscribe(source => {
			this.currentSource = source;
			this.source = this.currentSource.id;
		});
	}

	onSourceChange(): void {
		if (typeof this.source === 'string') {
			const newSource = this.sources.find(s => s.id === this.source);
			this.shared.setCurrentSource(newSource);
		} else {
			const newSource = this.sources.find(s => s.id === this.source[0]);
			this.shared.setCurrentSource(newSource);
		}

	}

}
