const PROXY_CONFIG = [
	{
		context: [
			"/api",
			"/login"
		],
		target: "https://localhost:8443",
		secure: false
	}
]

module.exports = PROXY_CONFIG;
