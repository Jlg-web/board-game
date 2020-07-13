class Weapon {

    constructor(weaponType, name, damage) {
        this.weaponType = weaponType;
        this.name = name;
        this.damage = damage;
    } 

    createWeapon(length, weaponNumber) {
        let randomElement = new RandomElement(length);
        randomElement.typeBlock(1, `weapon${weaponNumber}`);
    }

}