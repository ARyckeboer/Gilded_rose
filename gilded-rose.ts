/* 
When creating a solution for the exercise I had several questions.
based on what the answers to those questions are i made a few different cases.
Questions like:
-What is the budget/time for this project/change?
-Is this a one time change or do we expect more changes like these?
-I am in the first place a tester, so do we need extra functionality to allow unit test/automated tests?
-Are the new 'conjured' items just called 'conjured' or do each of them have a different name starting with 'conjured', or...?
-Aged Brie only increases in quality, does that imply that it does not have a SellIn value?
-Will the goblin in the corner allow me to change the Item class a bit if I buy them a drink?

depending on the answers:
*/



//--------------------------------------------------------------------- case 1: no budget/time, just implement it fast
//made almost no changes, just added the new functionality assuming that 'conjured' items have the word 'conjured' in their name

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

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                        if (this.items[i].quality > 0 && this.items[i].name.includes('Conjured')) {  //ADDED CODE HERE
                            this.items[i].quality = this.items[i].quality - 1
                        }
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }
            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].sellIn = this.items[i].sellIn - 1;
            }
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                this.items[i].quality = this.items[i].quality - 1
                                if (this.items[i].quality > 0 && this.items[i].name.includes('Conjured')) { //ADDED CODE HERE
                                    this.items[i].quality = this.items[i].quality - 1
                                }
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}





//-------------------------------------------------------------------------- case 2: enough time/budget, needs to be future proof
//assuming 'conjured' items can be multiple different items with all different values. 
//Since there is no type in the item class I'm also assuming the 'conjured' adjective is added in the name of the item.

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
            if(item.name.includes('Conjured')) this.qualityModifier *= 2;

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
                        else if (item.sellIn < 6) {
                            this.qualityModifier = 3;
                        }
                        else if (item.sellIn < 0) {
                            this.qualityModifier = 0;
                            item.quality = 0;
                        }
                    
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
    }
}






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
                        else if (item.sellIn < 6) {
                            this.qualityModifier = 3;
                        }
                        else if (item.sellIn < 0) {
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
    }
}