class Weapon {

    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }

    createWeapon(weaponNumber, length, ctx) {
        let randomElement = new RandomElement(length);
        randomElement.typeBlock(1, `weapon${weaponNumber}`);
        randomElement.drawBlock(`weapon${weaponNumber}`, `assets/img/weapon-${weaponNumber}.png`, ctx);
    }

}