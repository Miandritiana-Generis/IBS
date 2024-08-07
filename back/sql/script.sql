CREATE TABLE personne (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    genre VARCHAR(50),
    mail VARCHAR(100),
    mdp VARCHAR(100),
    contact VARCHAR(100)
);

-- enseignant
CREATE TABLE enseignant (
    id SERIAL PRIMARY KEY,
    idPersonne INTEGER REFERENCES personne(idPersonne)
);

CREATE TABLE niveau(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE filiere(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE matiere(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    idNiveau INTEGER REFERENCES niveau(idNiveau),
    idFiliere INTEGER REFERENCES filiere(idFiliere)
);

CREATE TABLE enseignant_matiere(
    id SERIAL PRIMARY KEY,
    idEnseignant INTEGER REFERENCES enseignant(idEnseignant),
    idMatiere INTEGER REFERENCES matiere(idMatiere)
);

CREATE TABLE classe(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    idFiliere INTEGER REFERENCES filiere(idFiliere),
    idNiveau INTEGER REFERENCES niveau(idNiveau)
);

-- etudiant
CREATE TABLE etudiant(
    id SERIAL PRIMARY KEY,
    idPersonne INTEGER REFERENCES personne(idPersonne),
    idPere INTEGER REFERENCES personne(idPersonne),
    idMere INTEGER REFERENCES personne(idPersonne)
);

CREATE TABLE annee_scolaire(
    id SERIAL PRIMARY KEY,
    anneeD INTEGER NOT NULL,
    anneeF INTEGER NOT NULL
);

CREATE TABLE classe_etudiant(
    id SERIAL PRIMARY KEY,
    idClasse INTEGER REFERENCES classe(idClasse),
    idEtudiant INTEGER REFERENCES etudiant(idEtudiant),
    idAnnee_scolaire INTEGER REFERENCES annee_scolaire(idAS)
);

-- personnel
CREATE TABLE direction(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    numCode VARCHAR(100) NOT NULL
);

CREATE TABLE pat(
    id SERIAL PRIMARY KEY,
    idPersonne INTEGER REFERENCES personne(idPersonne),
    idDirection INTEGER REFERENCES direction(idDirection)
);

-- ET
CREATE TABLE salle(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE et(
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    debut TIME NOT NULL,
    fin TIME NOT NULL,
    idClasse INTEGER REFERENCES classe(idClasse),
    idMatiere INTEGER REFERENCES matiere(idMatiere),
    idSalle INTEGER REFERENCES salle(idSalle),
    estAnnule BOOLEAN DEFAULT FALSE
);
