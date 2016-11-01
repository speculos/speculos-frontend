import expect from 'unexpected'
import {floorTimestamp, ceilTimestamp} from '../src/scripts/common/timestamps.js'

//1478019716524 = Tue Nov 01 2016 18:01:56 GMT+0100 (CET)

describe('floorTimestamp()', function() {
  it('should floor 18:01:56 to 18:01:00 when period is 1 min', function() {
    expect(floorTimestamp(1478019716524, 1000*60), 'to equal', 1478019660000)
  })
  it('should floor 18:01:56 to 18:00:00 when period is 5 min', function() {
    expect(floorTimestamp(1478019716524, 1000*60*5), 'to equal', 1478019600000)
  })
  it('should floor 18:01:56 to 18:00:00 when period is 1 hour', function() {
    expect(floorTimestamp(1478019716524, 1000*60*60), 'to equal', 1478019600000)
  })
  it('should floor 18:01:56 to 00:00:00 when period is 1 day', function() {
    expect(floorTimestamp(1478019716524, 1000*60*60*24), 'to equal', 1477958400000)
  })
})

describe('ceilTimestamp()', function() {
  it('should ceil 18:01:56 to 18:02:00 when period is 1 min', function() {
    expect(ceilTimestamp(1478019716524, 1000*60), 'to equal', 1478019720000)
  })
  it('should ceil 18:01:56 to 18:02:00 when period is 5 min', function() {
    expect(ceilTimestamp(1478019716524, 1000*60*5), 'to equal', 1478019900000)
  })
  it('should ceil 18:01:56 to 19:00:00 when period is 1 hour', function() {
    expect(ceilTimestamp(1478019716524, 1000*60*60), 'to equal', 1478023200000)
  })
  it('should ceil Tue 18:01:56 to Wed 00:00:00 when period is 1 day', function() {
    expect(ceilTimestamp(1478019716524, 1000*60*60*24), 'to equal', 1478044800000)
  })
})
