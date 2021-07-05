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

import { Application, RequestHandler, Router } from 'express';

interface RouteHandler {
	path: string;
	method: string;
	target: RequestHandler;
	middleware?: Array<any>;
}

export class Route {
	private readonly path: string;
	private readonly router: Router;

	public constructor(path: string) {
		this.path = path;
		this.router = Router();
	}

	public connect(app: Application): void {
		app.use(this.path, this.router);
	}

	protected get(path: string, target: RequestHandler, middleware?: Array<any>): void {
		this.route({ method: 'get', path, target, middleware });
	}

	protected post(path: string, target: RequestHandler, middleware?: Array<any>): void {
		this.route({ method: 'post', path, target, middleware });
	}

	protected put(path: string, target: RequestHandler, middleware?: Array<any>): void {
		this.route({ method: 'put', path, target, middleware });
	}

	protected delete(path: string, target: RequestHandler, middleware?: Array<any>): void {
		this.route({ method: 'delete', path, target, middleware });
	}

	private route({ method, path, target, middleware }: RouteHandler): void {
		const router = this.router as Record<string, any>;
		if (!middleware) {
			router[method](path, target.bind(this));
		} else {
			router[method](path, middleware, target.bind(this));
		}
	}
}
