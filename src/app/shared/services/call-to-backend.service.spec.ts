import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CallToBackendService } from './call-to-backend.service';
import { mockDataGame, mockListOfTrack, mockNewPlayerInterface, mockPlayer, mockPlayerArray, mockResponseUpdatePlayer, mockResultAddPlayer, mockResultCircuit, mockResultGame, mockTrack } from 'src/app/test/mocks';
import { environment } from 'src/environments/environment';
import { lastValueFrom, map } from 'rxjs';
import { Circuit, ResultCircuit, ResultGame } from '../models/results-game.interface';
import { DataPlayerInterface, ResponseUpdatePlayer } from '../models/player-interfaces';

const mockResultCircuitArray: ResultCircuit[] = [
  {
    data:
    mockTrack
  },
];


describe('CallToBackendService', () => {
  let service: CallToBackendService;
  let httpMock: HttpTestingController;
  let url = environment.base_url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(CallToBackendService);
    httpMock = TestBed.inject(HttpTestingController);

  });

  afterAll(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get circuits from API', () => {

    const subscription = service.listCircuits$.subscribe((lists: ResultCircuit[]) => {
      expect(lists[0].data).toEqual(mockResultCircuitArray[0].data);
      // expect(lists.data).toEqual(mockTrack);
    });
    
    
    const req = httpMock.expectOne(`${url}/circuit`);
    expect(req.request.method).toBe('GET');
    // req.flush();
   
    subscription.unsubscribe();

  })



  it('should return a Observable<ResultGame> from method startGame()', () => {


    const subscription1 = service.startGame(mockDataGame).subscribe((resp: ResultGame) => {
      expect(resp.data.game).toEqual(mockResultGame.data.game);
    });


    const req = httpMock.expectOne(`${url}/game/start-game`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResultGame);
    subscription1.unsubscribe();

  })

  it('should return a Observable<DataPlayerInterface> from method addNewPlayer()', () => {


    const subscription = service.addNewPlayer(mockNewPlayerInterface).subscribe((resp: DataPlayerInterface) => {
      expect(resp.data.driver).toEqual(mockPlayer);
    });


    const req = httpMock.expectOne(`${url}/player`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResultAddPlayer);
    subscription.unsubscribe();

  })

  it('should return a Observable<DataPlayerInterface> from method updatePlayer()', (done) => {


    const subscription = service.updatePlayer(mockNewPlayerInterface).subscribe((resp: ResponseUpdatePlayer) => {
      expect(resp.data.id).toEqual(1);
      done();
    });


    const req = httpMock.expectOne(`${url}/player`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponseUpdatePlayer);
    subscription.unsubscribe();

  })

  it('should delete a player with method deletePlayer()', () => {


    const subscription = service.deletePlayer(mockPlayerArray[0].id).subscribe((resp) => {
      expect(resp).toEqual("jugador eliminado correctamente");

    });

    const req = httpMock.expectOne(`${url}/player/${mockPlayerArray[0].id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush("jugador eliminado correctamente");
    subscription.unsubscribe();

  })

  it('should return a Observable<ResultCircuit> from method saveCircuit()', () => {


    const subscription = service.saveCircuit(mockTrack).subscribe((resp: ResultCircuit) => {
      expect(resp.data.name).toEqual('test result circuit');
    });


    const req = httpMock.expectOne(`${url}/circuit`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResultCircuit);
    subscription.unsubscribe();

  })

  it('should return a Observable<Circuit> from method updateCircuit()', () => {


    const subscription = service.updateCircuit(mockTrack).subscribe((resp: Circuit) => {
      expect(resp.kilometers).toEqual(12000);
    });


    const req = httpMock.expectOne(`${url}/circuit`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResultCircuit.data);
    subscription.unsubscribe();

  })

  it('should delete a circuit with method deleteCircuit()', () => {


    const subscription = service.deleteCircuit(1).subscribe((resp) => {
      expect(resp).toEqual("circuito eliminado correctamente");

    });

    const req = httpMock.expectOne(`${url}/circuit/${1}`);
    expect(req.request.method).toBe('DELETE');
    req.flush("circuito eliminado correctamente");
    subscription.unsubscribe();

  })

});
