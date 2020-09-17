import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SourceComponent } from './source/source.component';
import { HeadlineComponent } from './headline/headline.component';
import { ArticleComponent } from './article/article.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { AppLoaderComponent } from './app-loader/app-loader.component';

@NgModule({
	declarations: [
		AppComponent,
		SourceComponent,
		HeadlineComponent,
		ArticleComponent,
		HeaderComponent,
		AppLoaderComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
