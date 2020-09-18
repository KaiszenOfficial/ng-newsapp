import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
	selector: 'app-loader',
	templateUrl: './app-loader.component.html',
	styleUrls: ['./app-loader.component.css']
})
export class AppLoaderComponent implements OnInit {

	constructor(private shared: SharedService) { }

	ngOnInit(): void {
	}

}
