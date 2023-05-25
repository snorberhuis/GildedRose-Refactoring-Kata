import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updating Quality', () => {
    it('should update the Quality of an item', () => {
      const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('foo');
      expect(items[0].quality).toBe(0);
    });
  })
  describe("update SellIn of an item", () => {
    it('should update the Sellin of an item', () => {
      const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('foo');
      expect(items[0].sellIn).toBe(0);
    });
  })
});
