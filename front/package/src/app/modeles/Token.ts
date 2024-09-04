export class Token { 
  "token": {
        "id": number,
        "token": string,
        "expiration": Date,
        "idAppareil": string,
        "idPersonne": number
    };
    "tokenApplication": {
        "id": number,
        "idToken": number,
        "idApplication": number,
        "lien":string,
        "nom":string
    }
}