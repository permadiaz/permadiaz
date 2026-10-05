import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateScenario, parseCost, parseTax, money } from '../src/pricing.ts'

test('accepts whole rupiah and Indonesian thousands separators', () => {
  for (const input of ['1000000', '1.000.000', 'Rp 1.000.000']) assert.equal(parseCost(input), 1000000)
  for (const input of ['', '0', '-1', '1.5', '1,000', 'abc', '9007199254740992']) assert.equal(parseCost(input), null)
})

test('validates optional tax input, including an empty custom rate', () => {
  assert.equal(parseTax('0'), 0)
  assert.equal(parseTax('11,5'), 11.5)
  assert.equal(parseTax('100'), 100)
  for (const input of ['', '-1', '101', 'abc', 'Infinity']) assert.equal(parseTax(input), null)
})

test('calculates gross margin rather than markup', () => {
  assert.deepEqual(calculateScenario(1000000, 20, 0), {
    cost: 1000000, margin: 20, taxRate: 0, sell: 1250000, profit: 250000, tax: 0, total: 1250000,
  })
})

test('rounds to whole rupiah while preserving the visible breakdown', () => {
  const scenario = calculateScenario(1000000, 18, 11)
  assert.equal(scenario.sell, 1219512)
  assert.equal(scenario.tax, 134146)
  assert.equal(scenario.total, 1353658)
  assert.equal(scenario.total, scenario.sell + scenario.tax)
  assert.equal(scenario.sell, scenario.cost + scenario.profit)
  assert.equal(money(scenario.total), 'Rp1.353.658')
})

test('handles zero margin and rejects unsafe or impossible calculations', () => {
  assert.equal(calculateScenario(75000, 0, 0).total, 75000)
  for (const args of [[0, 18, 0], [-1, 18, 0], [1.5, 18, 0], [100, 100, 0], [100, -1, 0], [100, 18, -1], [100, 18, 101], [Number.MAX_SAFE_INTEGER, 50, 100]]) {
    assert.throws(() => calculateScenario(...args), RangeError)
  }
})
