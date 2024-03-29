import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
	uiEnabled: true, //disable or enable swaggerUi route
	uiUrl: 'docs', // url path to swaggerUI
	specEnabled: true, //disable or enable swagger.json route
	specUrl: '/swagger.json',

	middleware: [], // middlewares array, for protect your swagger docs and spec endpoints
	
	options: {
		definition: {
			openapi: '3.0.0',
			servers: [
				{
				description: "Serveur de production du blog", 
				url: "https://ns-blog-api.herokuapp.com"
				}, {
					description: "Serveur de test", 
					url: "http://localhost:3333"
			}
			], 
			info: {
				title: 'NS Blog api',
				version: '1.0.0',
				description: "Il s'agit de mon api de blog",
				contact: {
						name: "Wilfried N'SOUKPOE",
						email: "wacnsoukpoe@gmail.com"
				},
				
			}
		},
		
		apis: [
			'app/**/*.ts',
			'docs/swagger/**/*.yml',
			'start/routes.ts'
		],
		
		basePath: '/'
	},
	mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
  specFilePath: 'docs/swagger.json'
} as SwaggerConfig
