/* Copyright (C) 2021 Stan Vlad
 * This file is part of Readium.
 *
 * Readium is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import * as express from 'express';
import * as cors from 'cors';
import * as config from 'config';

import { App } from './app';
import { Route } from './core';

import { AuthRoute } from './auth';

export class Api {
	private readonly app: express.Application;

	public constructor(app: App) {
		this.app = express();
		this.middleware = [cors(), express.json()];
		this.routes = [new AuthRoute(app)];
	}

	public run(): void {
		const host: string = config.get('HOST');
		const port: number = process.env.PORT
			? Number(process.env.PORT) : config.get('PORT');

		this.setup();
		this.app.listen(port, host, () => {
			console.log(`>>> http://${ host }:${ port }`);
		});
	}

	private setup(): void {
		this.app.set('x-powered-by', false);
	}

	private set routes(routes: Array<Route>) {
		routes.map((route: Route) => route.connect(this.app));
	}

	private set middleware(middleware: Array<express.RequestHandler>) {
		middleware.map((middleware: express.RequestHandler) => {
			this.app.use(middleware);
		});
	}
}
