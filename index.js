var Hapi = require('hapi')

var server = new Hapi.Server()

server.connection({
	host: 'localhost',
	port: 3001
})

var routes = [
	{
		method: 'get',
		path: '/users',
		handler: (request, reply) => reply(require('./users.json').slice(0, 5))
	},
	{
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: 'public'
			}
		}
	}
]

function start(err) {
	if (err) {
		console.log('Error starting server')
		throw err
	}
	console.log('Server running at:', server.info.uri)
}

server.register([require('inert')], err => {
	if (err) {
		console.error('Failed to load a plugin:', err)
		throw err
	}
	server.route(routes)
	server.start()
})
