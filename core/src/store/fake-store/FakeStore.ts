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

import { Store, Collection, CollectionType } from '../core';

export class FakeStore extends Store {
	private collections: Map<CollectionType, Collection>;

	public constructor() {
		super();
		this.collections = new Map<CollectionType, Collection>();
	}

	public collection(type: CollectionType): Collection {
		return this.collections.get(type)!;
	}
}