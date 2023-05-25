import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  describe('updating Quality', () => {
    it('should update the Quality of an item', () => {
      const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('foo');
      expect(items[0].quality).toBe(0);
    });
    it('should update the Quality of multiple item', () => {
      const gildedRose = new GildedRose([
        new Item('foo', 1, 1),
        new Item('bar', 2, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].quality).toBe(0);
      expect(items[1].quality).toBe(1);
    });
  })
  describe("update SellIn of an item", () => {
    it('should update the Sellin of an item', () => {
      const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('foo');
      expect(items[0].sellIn).toBe(0);
    });

    it('should update the SellIn of multiple items', () => {
      const gildedRose = new GildedRose([
        new Item('foo', 1, 1),
        new Item('bar', 2, 2)
      ]);
      const items = gildedRose.updateQuality();

      expect(items[0].name).toBe('foo');
      expect(items[0].sellIn).toBe(0);
      expect(items[1].sellIn).toBe(1);
    });
  })
});
