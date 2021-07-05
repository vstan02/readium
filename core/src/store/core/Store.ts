/* Copyright (C) 2021 Stan Vlad
 * Copyright (C) 2021 Bucataru Florin
 *
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

import { Collection } from './Collection';

export enum CollectionType {
	USERS,
	BOOKS
}

export abstract class Store {
	public abstract collection(type: CollectionType): Collection;

	public async open(): Promise<void> { return }
	public async close(): Promise<void> { return }
}
