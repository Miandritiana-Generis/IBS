-- Insert into personne
INSERT INTO personne (nom, prenom, genre, mail, mdp, contact) VALUES
('Doe', 'John', 'Male', 'john.doe@example.com', 'password123', '123-456-7890'),
('Smith', 'Jane', 'Female', 'jane.smith@example.com', 'password456', '098-765-4321'),
('Brown', 'Robert', 'Male', 'robert.brown@example.com', 'password789', '567-890-1234'),
('Johnson', 'Alice', 'Female', 'alice.johnson@example.com', 'password012', '234-567-8901'),
('Williams', 'Emily', 'Female', 'emily.williams@example.com', 'password345', '345-678-9012');

-- Insert into enseignant
INSERT INTO enseignant (idPersonne) VALUES
(1),
(2),
(3);

-- Insert into niveau
INSERT INTO niveau (nom) VALUES
('First Year'),
('Second Year'),
('Third Year');

-- Insert into filiere
INSERT INTO filiere (nom) VALUES
('Science'),
('Arts'),
('Commerce');

-- Insert into matiere
INSERT INTO matiere (nom, idNiveau, idFiliere) VALUES
('Mathematics', 1, 1),
('Physics', 2, 1),
('Chemistry', 3, 1),
('History', 1, 2),
('Literature', 2, 2),
('Economics', 3, 3);

-- Insert into enseignant_matiere
INSERT INTO enseignant_matiere (idEnseignant, idMatiere) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 6);

-- Insert into classe
INSERT INTO classe (nom, idFiliere, idNiveau) VALUES
('Class A', 1, 1),
('Class B', 2, 2),
('Class C', 3, 3);

-- Insert into etudiant
INSERT INTO etudiant (idPersonne, idPere, idMere) VALUES
(4, 1, 2),
(5, 3, 2);

-- Insert into annee_scolaire
INSERT INTO annee_scolaire (anneeD, anneeF) VALUES
(2023, 2024),
(2024, 2025),
(2025, 2026);

-- Insert into classe_etudiant
INSERT INTO classe_etudiant (idClasse, idEtudiant, idAnnee_scolaire) VALUES
(1, 1, 1),
(2, 2, 2);

-- Insert into direction
INSERT INTO direction (nom, numCode) VALUES
('Administration', 'ADM123'),
('Finance', 'FIN456'),
('Operations', 'OPS789');

-- Insert into pat
INSERT INTO pat (idPersonne, idDirection) VALUES
(1, 1),
(2, 2),
(3, 3);

-- Insert into salle
INSERT INTO salle (nom) VALUES
('Room 101'),
('Room 102'),
('Room 103');

-- Insert into et
INSERT INTO et (date, debut, fin, idClasse, idMatiere, idSalle, estAnnule) VALUES
('2023-09-01', '08:00', '10:00', 1, 1, 1, false),
('2023-09-02', '10:00', '12:00', 2, 2, 2, false),
('2023-09-03', '12:00', '14:00', 3, 3, 3, false),
('2023-09-04', '14:00', '16:00', 1, 4, 1, false),
('2023-09-05', '16:00', '18:00', 2, 5, 2, false),
('2023-09-06', '18:00', '20:00', 3, 6, 3, false);
