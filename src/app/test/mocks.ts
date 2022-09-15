import { FormBuilder, FormGroup } from "@angular/forms";
import { NbSortDirection, NbSortRequest } from "@nebular/theme";
import { DataPlayer, DataPlayerInterface, NewPlayerInterface, ResponseUpdatePlayer } from "../shared/models/player-interfaces";
import { Car, Circuit, DataStartGame, Lane, Player, ResultCircuit, ResultGame } from "../shared/models/results-game.interface";
import { shareDataConfig } from "../shared/models/shared.interface";

export const mockLane: Lane[] = [
    {
        idLane: 1,
        name: 'test car',
        car: null
    },
    {
        idLane: 2,
        name: 'test car',
        car: null
    },
    {
        idLane: 3,
        name: 'test car',
        car: null
    }
];

export const mockListOfTrack: Circuit[] = [
    {
        id: 1,
        name: 'test track',
        lanes: mockLane,
        kilometers: 3000
    },
    {
        id: 2,
        name: 'test track',
        lanes: mockLane,
        kilometers: 5000
    },
    {
        id: 3,
        name: 'test track',
        lanes: mockLane,
        kilometers: 2000
    },
];
export const mockTrack: Circuit = {
    id: 1,
    name: 'test track',
    lanes: mockLane,
    kilometers: 2000
};

export const mockTrack2: Circuit = {
    id: 1,
    name: 'test track',
    lanes: [],
    kilometers: 2000
};


export const mockPlayer: Player = {
    id: 1,
    name: 'test name player',
};

export const mockPlayerArray: Player[] = [
    {
        id: 1,
        name: 'test name player',
    },
    {
        id: 2,
        name: 'test name player',
    },
    {
        id: 3,
        name: 'test name player',
    },
    
    ]
;

export const mockNewPlayerInterface: NewPlayerInterface = {
    idDto: mockPlayer.id,
    nameDto: mockPlayer.name
}

export const mockDrivers: Car[] = [
    {
        id: 1,
        nameCar: 'testing car',
        driver: mockPlayer,
        routeMts: 0,
        winner: false
    },
    {
        id: 2,
        nameCar: 'testing car',
        driver: mockPlayer,
        routeMts: 0,
        winner: false
    },
    {
        id: 3,
        nameCar: 'testing car',
        driver: mockPlayer,
        routeMts: 0,
        winner: false
    },
];

export const mockConfigureGameForm: FormGroup = new FormBuilder().group({
    track: [mockTrack],
    numberOfPlayers: [3],
    nameOfPlayer: ['Test Player'],
});

export const mockErrorConfigureGameForm: FormGroup = new FormBuilder().group({
    track: [mockTrack2],
    numberOfPlayers: [2],
    nameOfPlayer: ['Test Player'],
});

export const mockCreateCircuitForm: FormGroup = new FormBuilder().group({
    name: [''],
    kilometers: [],
    lanes: new FormBuilder().array([]),
});

export const mockResultCircuit: ResultCircuit = {
    data: {
        id: 50,
        name: 'test result circuit',
        lanes: mockLane,
        kilometers: 12000
    }
};



export const mockResultAddPlayer: DataPlayerInterface = {
    data: {
        driver: mockPlayer,
        id: 1,
        nameCar: 'test',
        routeMts: 1000,
        winner: false,
    }
};

export const mockResultGame: ResultGame = {
    data: {
        id: 1,
        game: {
            id: 1,
            name: null,
            circuit: mockTrack
        },
        first: mockPlayer,
        second: mockPlayer,
        third: mockPlayer,
    }
};

export const mockResultError: string = 'Problem Communicating With Servers';

const track = mockErrorConfigureGameForm.get('track')?.value;

export const mockDataGame: DataStartGame = {
    circuit: track,
    cars: [...mockDrivers]
}

export const mockDataPlayers: DataPlayer[] = [
    {
        driver: mockPlayer,
        id: 1,
        nameCar: 'test',
        routeMts: 1000,
        winner: false,
    },
    {
        driver: mockPlayer,
        id: 2,
        nameCar: 'test',
        routeMts: 1000,
        winner: false,
    }
];

export const mockResultObservableShareDataConfig: shareDataConfig = {
    state: true,
    data: {
        track: 'test track',
        numberOfPlayers: 3,
        nameOfPlayer: 'test player'
    },
    dataDrivers: mockDataPlayers
}

export const mockResponseUpdatePlayer: ResponseUpdatePlayer = {
    data: {
        id: 1,
        name: 'test name player',
    }
}