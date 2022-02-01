import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZutabeaklotuPage } from './zutabeaklotu.page';

describe('ZutabeaklotuPage', () => {
  let component: ZutabeaklotuPage;
  let fixture: ComponentFixture<ZutabeaklotuPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ZutabeaklotuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZutabeaklotuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
