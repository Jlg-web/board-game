class Weapon {

    constructor(name, damage) {
        this.name = name;
        this.damage = damage;
    }

    createWeapon(weaponNumber) {
        let randomElement = new RandomElement();
        randomElement.typeBlock(1, `weapon${weaponNumber}`);
        randomElement.drawBlock(`weapon${weaponNumber}`, `assets/img/weapon-${weaponNumber}.png`);
    }

    describeWeapon() {
        // console.log(`Votre arme est ${this.name} et inflige ${this.damage} points de dégâts.`);
    }

}