/* Copyright (C) 2020-2021 Bucataru Florin
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

import { Crypto } from './Crypto';

describe('Crypto', () => {
	const crypto = new Crypto();

	describe('hash', () => {
		it('should return a different string', async () => {
			expect(crypto.hash('test')).not.toBe('test');
		});
	});

	describe('compare', () => {
		it('should return false if the second value is not hashed', () => {
			expect(crypto.compare('test', 'test')).toBe(false);
		});

		it('should return false if hashed value is different', () => {
			expect(crypto.compare('test', crypto.hash('not test'))).toBe(false);
		});

		it('should return true if the params values are the same', () => {
			expect(crypto.compare('test', crypto.hash('test'))).toBe(true);
		});
	});
});
