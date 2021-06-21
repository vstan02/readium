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

import { EntityData, Store } from '../store';

import { Service } from './Service';
import { Crypto } from './Crypto';
import { createSignal, SignalType } from './Signal';

interface UserData {
	username: string;
	password: string;
}

export class AuthService extends Service {
	private crypto: Crypto;

	public constructor(store: Store) {
		super(store);
		this.crypto = new Crypto();
	}

	public async register(data: UserData): Promise<void> {
		if (await this.exists(data.username)) {
			throw createSignal(SignalType.ALREADY_EXISTS, 'Username already exists.');
		}

		await this.users.create({
			username: data.username,
			password: this.crypto.hash(data.password)
		});
	}

	private async exists(username: string): Promise<boolean> {
		try {
			return !!await this.users.getBy({ username });
		} catch (error) {
			if (error.type == SignalType.NOT_FOUND)
				return false;
			throw error;
		}
	}
}
