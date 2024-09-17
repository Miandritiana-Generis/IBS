CREATE VIEW v_ET_now_week AS
SELECT
    EXTRACT(YEAR FROM e.date) AS year,
    EXTRACT(WEEK FROM e.date) AS week,
    e.idEt,
    e.date,
    e.debut,
    e.fin,
    c.nom AS classe,
    pens.nom AS ens_nom,
    pens.prenom AS ens_prenom,
    m.nom AS matiere,
    s.nom AS salle,
    e.estAnnule
FROM
    et e
JOIN
    classe c ON e.idClasse = c.id
JOIN
    enseignant ens ON e.idEnseignant = ens.id
JOIN
    personne pens ON ens.idPersonne = pens.id
JOIN
    matiere m ON e.idMatiere = m.id
JOIN
    salle s ON e.idSalle = s.id
WHERE
    EXTRACT(YEAR FROM e.date) = EXTRACT(YEAR FROM CURRENT_DATE)
    AND EXTRACT(WEEK FROM e.date) = EXTRACT(WEEK FROM CURRENT_DATE)
ORDER BY
    e.date, e.debut;


CREATE VIEW v_absence AS
SELECT





create view v_classe_detail as
select c.id id, c.nom classe, f.id id_filiere, f.nom filiere, n.id id_niveau, n.nom niveau from classe c 
join filiere f on f.id = c.id_filiere
join niveau n on n.id = c.id_niveau