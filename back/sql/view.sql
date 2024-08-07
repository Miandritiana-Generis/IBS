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
