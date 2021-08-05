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

import { Response } from 'express';

import { Signals } from './Signals';

enum Status {
	OK = 200,
	CREATED = 201,
	UPDATED = 204,
	CONFLICT = 409,
	INVALID_REQUEST = 422,
	NOT_FOUND = 404,
	INTERNAL_ERROR = 500
}

export class ResponseSender {
	private response: Response;

	public constructor(response: Response) {
		this.response = response;
	}

	public created(data?: Record<string, any>): void {
		this.send(Status.CREATED, data);
	}

	public updated(data?: Record<string, any>): void {
		this.send(Status.UPDATED, data);
	}

	public success(data?: Record<string, any>): void {
		this.send(Status.OK, data);
	}

	public error(error: Error): void {
		this.send(this.status(error), {
			details: error.message
		});
	}

	private send(status: Status, data: Record<string, any> = {}): void {
		this.response.json({ ...data, status });
	}

	private status(error: any): Status {
		switch (error.type) {
			case Signals.NOT_FOUND:
				return Status.NOT_FOUND;
			case Signals.ALREADY_EXISTS:
				return Status.CONFLICT;
			case Signals.INVALID_REQUEST:
			case Signals.INVALID_CREDENTIALS:
			case Signals.INVALID_TOKEN:
				return Status.INVALID_REQUEST;
			default:
				return Status.INTERNAL_ERROR;
		}
	}
}
