import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-map-marker',
  templateUrl: './map-maker.component.html',
  styleUrls: ['./map-maker.component.scss'],
})
export class MapMarkerComponent {
  @Input() parentMarkerPosition: google.maps.LatLngLiteral[] | null;

  constructor() {}
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('parentMarkerPosition' in changes) {
      this.markerPositions = this.parentMarkerPosition;
      if (this.markerPositions) {
        this.center = this.markerPositions[0];
      }
    }
  }
}
