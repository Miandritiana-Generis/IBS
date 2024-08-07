CREATE VIEW v_ET_now AS
SELECT
    EXTRACT(YEAR FROM e.date) AS year,
    EXTRACT(WEEK FROM e.date) AS week,
    e.idEt,
    e.date,
    e.debut,
    e.fin,
    c.nom AS classe_nom,
    m.nom AS matiere_nom,
    s.nom AS salle_nom,
    e.estAnnule
FROM
    et e
JOIN
    classe c ON e.idClasse = c.idClasse
JOIN
    matiere m ON e.idMatiere = m.idMatiere
JOIN
    salle s ON e.idSalle = s.idSalle
WHERE
    EXTRACT(YEAR FROM e.date) = EXTRACT(YEAR FROM CURRENT_DATE)
    AND EXTRACT(WEEK FROM e.date) = EXTRACT(WEEK FROM CURRENT_DATE)
ORDER BY
    e.date, e.debut;
