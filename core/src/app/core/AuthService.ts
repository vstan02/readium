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

import { SignalManager } from 'signex';

import { Store, EntityData } from '../store';

import { Service } from './Service';
import { Crypto } from './Crypto';
import { Signals } from './Signals';

interface UserData {
	username: string;
	password: string;
}

export class AuthService extends Service {
	private crypto: Crypto;
	private signals: SignalManager<Signals>;

	public constructor(store: Store) {
		super(store);
		this.crypto = new Crypto();
		this.signals = new SignalManager<Signals>();
	}

	public async login(data: UserData): Promise<void> {
		try {
			const result = await this.users.getBy({ username: data.username });
			this.validatePassword(result, data.password);
			return result.profile;
		} catch (error) {
			if (error.type == Signals.NOT_FOUND)
				this.signals.throw(Signals.INVALID_CREDENTIALS, 'Invalid username');
			throw error;
		}
	}

	public async register(data: UserData): Promise<void> {
		if (await this.exists(data.username)) {
			this.signals.throw(Signals.ALREADY_EXISTS, 'Username already exists');
		}

		await this.users.create({
			username: data.username,
			password: this.crypto.hash(data.password)
		});
	}

	private validatePassword(target: EntityData, password: string): void {
		if (!this.crypto.compare(password, target.password)) {
			this.signals.throw(Signals.INVALID_CREDENTIALS, 'Invalid password');
		}
	}

	private async exists(username: string): Promise<boolean> {
		try {
			return !!await this.users.getBy({ username });
		} catch (error) {
			if (error.type == Signals.NOT_FOUND)
				return false;
			throw error;
		}
	}
}
