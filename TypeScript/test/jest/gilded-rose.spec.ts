import {LegacyItem, GildedRose, ConjuredItem} from '@/gilded-rose';

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

describe("Conjured", () => {
  describe('SellIn', () => {
    it("Should decrease every day", () => {
      const item = new ConjuredItem("foo", 1, 2)

      item.updateEndOfDay()

      expect(item.getSellIn()).toBe(0)
    })
  });
  describe('Quality', () => {
    it("Should decrease twice as fast before the sell date", () => {
      const item = new ConjuredItem("foo", 1, 4)

      item.updateEndOfDay()

      expect(item.getQuality()).toBe(2)
    })
    it("Should decrease twice as fast on the sell date", () => {
      const item = new ConjuredItem("foo", 0, 8)

      item.updateEndOfDay()

      expect(item.getQuality()).toBe(6)
    })
    it("Should decrease four times as fast after the sell date", () => {
      const item = new ConjuredItem("foo", -1, 4)

      item.updateEndOfDay()

      expect(item.getQuality()).toBe(0)
    })
    it("The quality should never be negative", () => {
      const item = new ConjuredItem("foo", -1, 2)

      item.updateEndOfDay()

      expect(item.getQuality()).toBe(0)
    })
  })
})
