import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar {
  readonly query = model('');
  readonly placeholder = input('Search');

  protected updateQuery(event: Event) {
    this.query.set((event.target as HTMLInputElement).value);
  }
}
