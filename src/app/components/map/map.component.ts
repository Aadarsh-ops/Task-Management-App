import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @Output()
  markerPositionChange: EventEmitter<google.maps.LatLngLiteral | null> =
    new EventEmitter<google.maps.LatLngLiteral | null>();
  @Input() parentMarkerPosition: google.maps.LatLngLiteral | null;
  @Input() title: string;
  constructor(private route: ActivatedRoute) {}

  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 };
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition: google.maps.LatLngLiteral | null = null;

  ngOnInit(): void {
    const markerPositionString =
      this.route.snapshot.queryParams?.markerPosition;
    this.markerPosition = markerPositionString
      ? JSON.parse(markerPositionString)
      : null;
    if (this.markerPosition) {
      this.center = this.markerPosition;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('parentMarkerPosition' in changes) {
      this.markerPosition = this.parentMarkerPosition;
      if (this.parentMarkerPosition) {
        this.center = this.parentMarkerPosition;
      }
    }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.markerPosition = event.latLng.toJSON();
      this.markerPositionChange.emit(this.markerPosition);
    }
  }
}
