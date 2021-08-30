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
import { Route, ResponseSender, RequestValidator } from '../core';

import { user, profile } from './authMiddleware';

export class AuthRoute extends Route {
	private auth: AuthService;
	private validator: RequestValidator;

	public constructor(app: App) {
		super('/auth');
		this.validator = new RequestValidator();
		this.auth = app.authService();

		this.post('/login', this.login, [user]);
		this.post('/register', this.register, [user, profile]);
	}

	private async login(request: Request, response: Response): Promise<void> {
		const sender = new ResponseSender(response);
		try {
			this.validator.validate(request);
			return sender.success({
				profile: await this.auth.login(request.body)
			});
		} catch (error) {
			return sender.error(error);
		}
	}

	private async register(request: Request, response: Response): Promise<void> {
		const sender = new ResponseSender(response);
		try {
			this.validator.validate(request);
			await this.auth.register(request.body);
			return sender.created();
		} catch (error) {
			return sender.error(error);
		}
	}
}
