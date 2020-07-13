class Weapon {

    static createWeapons(length) {
        const randomElement = new RandomElement(length);
        for(let i = 1; i <= 4; i++) {
            randomElement.typeBlock(1, `weapon${i}`);
        }
    }

    constructor(weaponType, name, damage) {
        this.weaponType = weaponType;
        this.name = name;
        this.damage = damage;
    } 
}