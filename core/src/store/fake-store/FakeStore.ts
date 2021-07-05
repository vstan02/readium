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

import { Collection, CollectionType, Store } from '../core';

import { FakeCollection } from './FakeCollection';

export class FakeStore extends Store {
	private collections: Map<CollectionType, Collection>;

	public constructor() {
		super();
		this.collections = new Map<CollectionType, Collection>([
			[CollectionType.USERS, new FakeCollection()],
			[CollectionType.BOOKS, new FakeCollection()]
		]);
	}

	public collection(type: CollectionType): Collection {
		return this.collections.get(type)!;
	}
}
