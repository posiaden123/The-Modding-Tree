addLayer("c", {
    name: "code points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#5ed3e6",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "code points", // Name of prestige currency
    baseResource: "lines of code", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade(this.layer, 12)) mult = mult.times(upgradeEffect(this.layer, 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
        if (hasUpgrade(this.layer, 13)) exp = player[this.layer].points.plus(10).log10().pow(exp)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "C: Reset for code points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        rows: 2,
        cols: 5,
        11: {
            title: "Get A New Monitor",
            description: "A new extra wide monitor, only for the best of coders. Doubles lines of code gain.",
            cost: new Decimal(2),
            effect: 1,  
        },
        12: {
            title: "Blue Light Glasses",
            description: "The light from your screen has hurt your eyes! You should try a nice pair of glasses. Doubles code point gain.",
            cost: new Decimal(5),
            unlocked() {return hasUpgrade(this.layer, 11)},
            effect: 2,
        },
        13: {
            title: "Moving Up In The World",
            description: "Finally moving out of your Mom's basement, eh? Congrats. Code points boost code point gain.",
            cost: new Decimal (20),
            unlocked() {return hasUpgrade(this.layer, 12)},
            effect: 1,
        },
        14: {
            title: "Prebuilt",
            description: "An Alienware would be nice, but you're broke. You get a Lenovo. Code points boost lines of code gain.",
            cost: new Decimal(50),
            unlocked() {return hasUpgrade(this.layer, 13)},
            effect() {
                return 1
            },
        }
    },
    layerShown(){return true}
})
