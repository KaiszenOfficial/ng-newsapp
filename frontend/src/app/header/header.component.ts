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
		this.defaultLanguage = languages.find(language => window.navigator.languages.includes(language.code));
		this.shared.setCurrentLanguage(this.defaultLanguage.code);
		window.navigator.geolocation.getCurrentPosition(location => console.log(location));
	}

	changeLanguage(language: any): void {
		this.defaultLanguage = language;
		this.shared.setCurrentLanguage(language.code);
	}

}
