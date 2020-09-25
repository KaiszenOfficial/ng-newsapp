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
	theme: string;

	constructor(private shared: SharedService) { }

	ngOnInit(): void {
		this.languageSelection = languages;
		this.defaultLanguage = languages.find(language => {
			return navigator.languages.find(l => l.includes(language.code));
		});
		this.shared.setCurrentLanguage(this.defaultLanguage.code);
		const theme = this.shared.getCurrentTheme();
		this.theme = theme ? theme : 'dark';
		this.setTheme(this.theme);
	}

	changeLanguage(language: any): void {
		this.defaultLanguage = language;
		this.shared.setCurrentLanguage(language.code);
	}

	handleChangeTheme(event: any): void {
		this.theme = event.checked ? 'dark' : 'light';
		this.setTheme(this.theme);
	}

	setTheme(theme: string): void {
		this.shared.setTheme(theme);
	}

}
