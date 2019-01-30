import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-labeler',
  templateUrl: './search-labeler.component.html',
  styles: []
})
export class SearchLabelerComponent implements OnInit {

  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  token: any;
  query: any = null;
  searchUrl: any;

  constructor(

    @Inject('API_URL') private apiUrl: string) {

    this.token = sessionStorage.getItem('token');
    this.searchUrl = `${this.apiUrl}/labelers/autocomplete?token=${this.token}`;
  }

  ngOnInit() {
  }

  clearProductSearch() {
    this.query = null;
  }


  clearSelected(event: any) {
    if (event) {
      if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        this.onChange.emit(false);
      } else {
        this.onChange.emit(true);
      }
    } else {
      this.onChange.emit(false);
    }
  }

  handleResultSelected(event: any) {
    this.onSelect.emit(event);
    this.query = event.supplier_name;
  }

}
