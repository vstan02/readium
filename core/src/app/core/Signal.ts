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

export enum SignalType {
	NOT_FOUND = 'NOT_FOUND',
	INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
	ALREADY_EXISTS = 'ALREADY_EXISTS'
}

export interface Signal extends Error {
	type: SignalType;
}

export function createSignal(type: SignalType, details: string): Signal {
	const error = new Error(details) as Signal;
	error.type = type;
	return error;
}
