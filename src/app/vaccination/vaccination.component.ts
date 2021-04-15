import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vaccination',
  templateUrl: './vaccination.component.html',
  styleUrls: ['./vaccination.component.css']
})
export class VaccinationComponent implements OnInit {
  vaccination:any
  constructor() { }

  ngOnInit(): void {
    this.vaccination=JSON.parse(localStorage.getItem('tested'))
  }

}
