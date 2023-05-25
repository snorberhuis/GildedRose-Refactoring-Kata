import { expect } from 'chai';
import { LegacyItem, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new LegacyItem('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].getName()).to.equal('fixme');
  });
});
