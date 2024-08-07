CREATE TABLE personne (
    idPersonne SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    genre VARCHAR(50),
    mail VARCHAR(100),
    mdp VARCHAR(100),
    contact VARCHAR(100)
);

-- enseignant
CREATE TABLE enseignant (
    idEnseignant SERIAL PRIMARY KEY,
    idPersonne INTEGER REFERENCES personne(idPersonne)
);

CREATE TABLE niveau(
    idNiveau SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE filiere(
    idFiliere SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE matiere(
    idMatiere SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    idNiveau INTEGER REFERENCES niveau(idNiveau),
    idFiliere INTEGER REFERENCES filiere(idFiliere)
);

CREATE TABLE enseignant_matiere(
    idEnseignant_matiere SERIAL PRIMARY KEY,
    idEnseignant INTEGER REFERENCES enseignant(idEnseignant),
    idMatiere INTEGER REFERENCES matiere(idMatiere)
);

CREATE TABLE classe(
    idClasse SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    idFiliere INTEGER REFERENCES filiere(idFiliere),
    idNiveau INTEGER REFERENCES niveau(idNiveau)
);

-- etudiant
CREATE TABLE etudiant(
    idEtudiant SERIAL PRIMARY KEY,
    idPersonne INTEGER REFERENCES personne(idPersonne),
    idPere INTEGER REFERENCES personne(idPersonne),
    idMere INTEGER REFERENCES personne(idPersonne)
);

CREATE TABLE annee_scolaire(
    idAS SERIAL PRIMARY KEY,
    anneeD INTEGER NOT NULL,
    anneeF INTEGER NOT NULL
);

CREATE TABLE classe_etudiant(
    idClasse_etudiant SERIAL PRIMARY KEY,
    idClasse INTEGER REFERENCES classe(idClasse),
    idEtudiant INTEGER REFERENCES etudiant(idEtudiant),
    idAnnee_scolaire INTEGER REFERENCES annee_scolaire(idAS)
);

-- personnel
CREATE TABLE direction(
    idDirection SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    numCode VARCHAR(100) NOT NULL
);

CREATE TABLE pat(
    idPat SERIAL PRIMARY KEY,
    idPersonne INTEGER REFERENCES personne(idPersonne),
    idDirection INTEGER REFERENCES direction(idDirection)
);

-- ET
CREATE TABLE salle(
    idSalle SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE et(
    idEt SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    debut TIME NOT NULL,
    fin TIME NOT NULL,
    idClasse INTEGER REFERENCES classe(idClasse),
    idMatiere INTEGER REFERENCES matiere(idMatiere),
    idSalle INTEGER REFERENCES salle(idSalle),
    estAnnule BOOLEAN DEFAULT FALSE
);
