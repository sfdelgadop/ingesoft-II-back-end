'use strict'

var app = require('./index'),
	server = app.listen(app.get('port'), () => {
		console.log(`Iniciando Express en el puerto ${app.get('port')}`)
	})