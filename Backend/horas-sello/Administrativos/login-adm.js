function loginAdm(app, db) {
    app.get('/api/inicioadministrativos', (req, res) => {
    const query = 'SELECT RutAdministrativos, Contraseña FROM Administrativos';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los datos:', err);
            return res.status(500).json({ error: 'Error al obtener los datos' });
        }
        res.json(results);
    });
});
}

module.exports = loginAdm;