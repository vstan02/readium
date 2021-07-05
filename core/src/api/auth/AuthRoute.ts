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

import { Request, Response } from 'express';

import { App, AuthService } from '../app';
import { Route, ResponseSender } from '../core';

export class AuthRoute extends Route {
	private auth: AuthService;

	public constructor(app: App) {
		super('/auth');
		this.auth = app.auth;

		this.post('/register', this.register);
	}

	private async register(request: Request, response: Response): Promise<void> {
		const sender = new ResponseSender(response);
		try {
			await this.auth.register(request.body);
			return sender.created();
		} catch (error) {
			return sender.error(error);
		}
	}
}
