import {randomSeed} from './Record';

test('randomSeed', () => {
  const seeds = [randomSeed(3), randomSeed(3), randomSeed(3), randomSeed(3)]
  const opts = new Set(['A', 'B', 'C']);
  seeds.forEach((s) => expect(opts.has(s)).toBe(true))
})
