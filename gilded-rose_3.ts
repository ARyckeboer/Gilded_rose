
//-------------------------------------------------------------------------- case 3: enough time/budget, needs to be future proof
//same as previous but assuming 'conjured' is a type of item on it's own instead of a modifier of any normal item.


export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;
    qualityModifier: number;

    constructor(items = [] as Array<Item>) {
        this.items = items;
        this.qualityModifier = 1;
    }

    updateQuality(item: Item) {
       if (item.name != 'Sulfuras, Hand of Ragnaros') {
           
            item.sellIn = item.sellIn - 1;
            this.qualityModifier = -1;

            if(item.sellIn<0) this.qualityModifier *= 2;

                switch(item.name) {
                case 'Aged Brie':
                    // only increases quality
                    this.qualityModifier = 1;
                    break;

                case 'Backstage passes to a TAFKAL80ETC concert':
                    // quality increases faster and faster untill day of concert
                    this.qualityModifier = 1;
                    
                        if (item.sellIn < 11) {
                            this.qualityModifier = 2;
                        }
                        if (item.sellIn < 6) {
                            this.qualityModifier = 3;
                        }
                        if (item.sellIn < 0) {
                            this.qualityModifier = 0;
                            item.quality = 0;
                        }
                    
                    break;

                case 'Conjured':
                    // degrades faster
                    this.qualityModifier *= 2;
                    break;
                }

            if((this.qualityModifier < 0 && item.quality > 0) || (this.qualityModifier > 0 && item.quality < 50)){
                item.quality = item.quality + this.qualityModifier;
            }

            // recheck boundaries
            if(item.quality < 0) item.quality = 0;
            if(item.quality > 50) item.quality = 50;

            }
        return item;
    }

    updateAllQuality() {
        this.items.forEach(this.updateQuality);
        return this.items;
    }
}
