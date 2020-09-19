import { Component, OnInit } from '@angular/core';

import { languages } from 'src/environments/languages';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	languageSelection: Array<any> = [];
	defaultLanguage: any;

	constructor(private shared: SharedService) { }

	ngOnInit(): void {
		this.languageSelection = languages;
		this.defaultLanguage = languages.find(language => {
			return navigator.languages.find(l => l.includes(language.code));
		});
		this.shared.setCurrentLanguage(this.defaultLanguage.code);
	}

	changeLanguage(language: any): void {
		this.defaultLanguage = language;
		this.shared.setCurrentLanguage(language.code);
	}

}
