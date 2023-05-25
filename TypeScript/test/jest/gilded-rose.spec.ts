import { LegacyItem, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updating Quality', () => {
    it('should update the Quality of an item', () => {
      const gildedRose = new GildedRose([
        new LegacyItem('foo', 1, 1)]);
      const items = gildedRose.updateQuality();

      expect(items[0].getName()).toBe('foo');
      expect(items[0].getQuality()).toBe(0);
    });
    it('should update the Quality of multiple item', () => {
      const gildedRose = new GildedRose([
        new LegacyItem('foo', 1, 1),
        new LegacyItem('bar', 2, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].getQuality()).toBe(0);
      expect(items[1].getQuality()).toBe(1);
    });
  })
  describe("update SellIn of an item", () => {
    it('should update the Sellin of an item', () => {
      const gildedRose = new GildedRose([
        new LegacyItem('foo', 1, 1)]);
      const items = gildedRose.updateQuality();

      expect(items[0].getName()).toBe('foo');
      expect(items[0].getSellIn()).toBe(0);
    });

    it('should update the SellIn of multiple items', () => {
      const gildedRose = new GildedRose([
        new LegacyItem('foo', 1, 1),
        new LegacyItem('bar', 2, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].getName()).toBe('foo');
      expect(items[0].getSellIn()).toBe(0);
      expect(items[1].getSellIn()).toBe(1);
    });
  })
});
