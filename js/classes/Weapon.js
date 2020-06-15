class Weapon {

    constructor(weaponType, name, damage) {
        this.weaponType = weaponType;
        this.name = name;
        this.damage = damage;
    }

    createWeapon(weaponNumber, length) {
        let randomElement = new RandomElement(length);
        randomElement.typeBlock(1, `weapon${weaponNumber}`);
    }

}