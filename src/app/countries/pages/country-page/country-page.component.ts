import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(private acivatedRoute: ActivatedRoute,
              private countriesService: CountriesService,
              private router: Router) {}

  ngOnInit(): void {
    this.acivatedRoute.params
        .pipe(
          switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id))
        )
        .subscribe((country) => {
            if(!country) return this.router.navigateByUrl('');
            this.country = country;
            return;
        });
  }



}
