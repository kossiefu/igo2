import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  OnDestroy,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NetworkService, ConnectionState, LanguageService } from '@igo2/core';
import { ConfigService } from '@igo2/core';
import { SearchSource, IgoMap, Feature } from '@igo2/geo';
import { HttpClient } from '@angular/common/http';

import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FeatureDetailsComponent implements OnDestroy, AfterViewInit, OnChanges {
  private state: ConnectionState;
  private unsubscribe$ = new Subject<void>();

  @Input()
  get source(): SearchSource {
    return this._source;
  }
  set source(value: SearchSource) {
    this._source = value;
    this.cdRef.detectChanges();
  }

  @Input() map: IgoMap;

  @Input()
  get feature(): Feature {
    return this._feature;
  }
  set feature(value: Feature) {
    this._feature = value;
    this.cdRef.detectChanges();
    this.selectFeature.emit();
  }

  @Input()
  get mobile(): boolean {
    return this._mobile;
  }
  set mobile(value: boolean) {
    this._mobile = value;
  }
  private _mobile: boolean;

  @Input()
  get scenarioDateToggle(): string {
    return this._scenarioDateToggle;
  }
  set scenarioDateToggle(value: string) {
    this._scenarioDateToggle = value;
    //this.cdRef.detectChanges();
  }
  private _scenarioDateToggle: string;

  public selectedScenarioBorderColor = '#E58271';

  @Input()
  get mapQueryClick(): boolean {
    return this._mapQueryClick;
  }
  set mapQueryClick(value: boolean) {
    this._mapQueryClick = value;
  }
  private _mapQueryClick: boolean;

  private _feature: Feature;
  private _source: SearchSource;

  //@Output() routeEvent = new EventEmitter<boolean>();
  @Output() selectFeature = new EventEmitter<boolean>();
  @Output() htmlDisplayEvent = new EventEmitter<boolean>();

  @Input()
  matTooltipPosition: TooltipPosition;


  constructor(
    private cdRef: ChangeDetectorRef,
    private networkService: NetworkService,
    private languageService: LanguageService,
    private configService: ConfigService,
    private http: HttpClient,
  ) {
    this.networkService.currentState().pipe(takeUntil(this.unsubscribe$)).subscribe((state: ConnectionState) => {
      this.state = state;
    });
  }

  ngAfterViewInit() {
    if (this.feature.properties.Troncon) {
      setTimeout(() => {
      }, 100);
    }
  }

  ngOnChanges(changes: SimpleChanges) {


    if (this.mapQueryClick === true || this.feature.properties.Troncon){
      this.ngAfterViewInit();
    }
    if ( this.feature.properties.Troncon && this.mapQueryClick === true ||
              (this.feature.properties.Troncon && changes.scenarioDateToggle)
      ){

    }
  }

  ngOnDestroy() {
    this.mapQueryClick = false;
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
