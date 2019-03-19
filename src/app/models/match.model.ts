export class MatchModel { 
    matchType: string;
    library: string;
    seatType: string;
    soundLevel: string;
}

export class SearchModel extends MatchModel{
    constructor(matchType: string,library: string,seatType: string,soundLevel: string ){
        super();
        this.matchType = matchType;
        this.library = library;
        this.seatType = seatType;
        this.soundLevel = soundLevel;
    }
}