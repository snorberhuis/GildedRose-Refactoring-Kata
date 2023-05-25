export interface InventoryItem {
  /**
   * updateQuality updates the Quality and SellIn values for the inventory item
   */
  updateEndOfDay()

  /**
   * getQuality returns the current Quality Value of InventoryItem
   */
  getQuality() : number

  /**
   * getSellIn returns the current SellIn value of the InventoryItem
   */
  getSellIn() : number

  /**
   * getName returns the name of the Inventory Item.
   */
  getName(): string;
}

/**
 * BaseItem provides standard behavior for InventoryItems.
 */
class BaseItem implements InventoryItem{
  name: string;
  sellIn: number;
  quality: number;

  protected constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  getQuality(): number {
    return this.quality
  }
  getSellIn(): number {
    return this.sellIn
  }

  /**
   * updateSellInEndOfDay updates using the standard behaviour
   * @protected
   */
  protected updateSellInEndOfDay() {
    this.sellIn -= 1
  }

  /**
   * updateQualityEndOfDay updates the Quality with the standard behaviour.
   * It returns how much the quality was degraded.
   * @protected
   */
  protected updateQualityEndOfDay() : number{
    // Degrade twice as fast after sellIn date
    const degration = (this.sellIn < 0) ? 2 : 1
    this.quality -= degration
    return degration
  }

  protected validateQuality() {
    this.quality = (this.quality < 0) ? 0 : this.quality
  }

  getName(): string {
    return this.name
  }

  updateEndOfDay() {
    this.updateQualityEndOfDay()
    this.updateSellInEndOfDay()
    this.validateQuality()
  }

}

/**
 * ConjuredItems degrade in Quality twice as fast as normal items.
 */
export class ConjuredItem extends BaseItem implements InventoryItem {

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  protected updateQualityEndOfDay(): number {
    const degradation = super.updateQualityEndOfDay()
    this.quality -= degradation
    return 2 * degradation
  }

}

/**
 * LegacyItem represents an item that GildedRose sells.
 * This is the legacy implementation that provides behavior for all items.
 *
 * it has the following properties:
 *  - SellIn: value which denotes the number of days we have to sell the item
 *  - Quality: value which denotes how valuable the item is
 */
export class LegacyItem extends BaseItem implements InventoryItem{

  constructor(name, sellIn, quality) {
    super(name, sellIn, quality)
  }

  updateEndOfDay() {
    // Check for special cases of quality.
    if (this.name != 'Aged Brie' && this.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (this.quality > 0) {
        if (this.name != 'Sulfuras, Hand of Ragnaros') {
          this.quality = this.quality - 1
        }
      }
    } else {
      // Reduce quality
      if (this.quality < 50) {
        this.quality = this.quality + 1
        if (this.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.sellIn < 11) {
            if (this.quality < 50) {
              this.quality = this.quality + 1
            }
          }
          if (this.sellIn < 6) {
            if (this.quality < 50) {
              this.quality = this.quality + 1
            }
          }
        }
      }
    }
    // Reduce SellIn value
    if (this.name != 'Sulfuras, Hand of Ragnaros') {
      this.sellIn = this.sellIn - 1;
    }
    // Reduce quality twice as fast.
    if (this.sellIn < 0) {
      if (this.name != 'Aged Brie') {
        if (this.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.quality > 0) {
            if (this.name != 'Sulfuras, Hand of Ragnaros') {
              this.quality = this.quality - 1
            }
          }
        } else {
          this.quality = this.quality - this.quality
        }
      } else {
        if (this.quality < 50) {
          this.quality = this.quality + 1
        }
      }
    }
  }
}

/**
 * GildedRose is our inventory tracking system.
 * It can update the values of our inventory.
 */
export class GildedRose {
  items: Array<InventoryItem>;

  constructor(items = [] as Array<InventoryItem>) {
    this.items = items;
  }

  updateQuality() {
    // Iterate over every inventory item.
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].updateEndOfDay()
    }

    return this.items;
  }
}
