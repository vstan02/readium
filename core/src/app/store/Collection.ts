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

import { EntityID, EntityData } from './Entity';

export interface SearchOptions {
	select?: Array<string>;
}

export interface Collection {
	get(id: EntityID, options?: SearchOptions): Promise<EntityData>;
	getBy(data: EntityData, options?: SearchOptions): Promise<EntityData>;
	getAll(options?: SearchOptions): Promise<Array<EntityData>>;
	create(entity: EntityData): Promise<EntityID>;
	update(id: EntityID, data: EntityData): Promise<void>;
	delete(id: EntityID): Promise<void>;
}
