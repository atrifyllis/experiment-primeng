const PROXY_CONFIG = [
	{
		context: [
			"/api",
			"/login",
			"/oauth",
			"/assets"
		],
		target: "http://localhost:8076",
		secure: false,
		logLevel: "debug"
	}
]

module.exports = PROXY_CONFIG;
