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

import { randomBytes } from 'crypto';

import {
	createSignal,
	SignalType,
	Entity,
	EntityData,
	EntityID,
	Collection,
	SearchOptions
} from '../core';

export class FakeCollection implements Collection {
	private entities: Map<string, Entity>;

	public constructor() {
		this.entities = new Map<string, Entity>();
	}

	public async get(id: EntityID, options?: SearchOptions): Promise<EntityData> {
		const entity = this.entities.get(id);
		if (!entity) {
			throw createSignal(SignalType.NOT_FOUND, 'Entity not found.');
		}

		return this.select(entity, options?.select);
	}

	public async getBy(data: EntityData, options?: SearchOptions): Promise<EntityData> {
		const result = Array.from(this.entities.values())
			.filter((entity: Entity) => this.compare(entity, data))[0];

		if (!result) {
			throw createSignal(SignalType.NOT_FOUND, 'Entity not found.');
		}

		return this.select(result, options?.select);
	}

	public async getAll(options?: SearchOptions): Promise<Array<EntityData>> {
		return Array.from(this.entities.values())
			.map((entity: Entity) => this.select(entity, options?.select));
	}

	public async create(entity: EntityData): Promise<EntityID> {
		const id = this.createID();
		this.entities.set(id, { id, ...entity });
		return id;
	}

	public async update(id: EntityID, changes: EntityData): Promise<void> {
		const data = this.entities.get(id);
		if (data) {
			Object.assign(data, ...this.getUpdatedProps(changes), { id: data.id });
			this.entities.set(data.id, data);
		} else {
			throw createSignal(SignalType.NOT_FOUND, 'Entity not found.');
		}
	}

	public async delete(id: EntityID): Promise<void> {
		this.entities.delete(id);
	}

	private createID(): EntityID {
		return randomBytes(12).toString('hex');
	}

	private select(entity: Entity, select?: Array<string>): EntityData {
		if (!select) return entity;
		return Object.assign({}, [
			...select.map((prop: string) => entity[prop] ? { [prop]: entity[prop] } : undefined)
		]);
	}

	private compare(first: EntityData, second: EntityData): boolean {
		return !Object.keys(second)
			.find((prop: string) => first[prop] != second[prop]);
	}

	private getUpdatedProps(entity: EntityData): Array<object|undefined> {
		return Object.keys(entity).map((prop: string) => {
			return entity[prop] ? { [prop]: entity[prop] } : undefined;
		});
	}
}
