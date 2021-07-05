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

	protected get(path: string, handler: RequestHandler): void {
		this.route('get', path, handler);
	}

	protected post(path: string, handler: RequestHandler): void {
		this.route('post', path, handler);
	}

	protected put(path: string, handler: RequestHandler): void {
		this.route('put', path, handler);
	}

	protected delete(path: string, handler: RequestHandler): void {
		this.route('delete', path, handler);
	}

	private route(method: string, path: string, handler: RequestHandler): void {
		this.router[method](path, handler.bind(this));
	}
}
