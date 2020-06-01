class Weapon {

    constructor(length, ctx, weaponNumber, name, damage) {

        this.length = length;
        this.ctx = ctx
        this.weaponNumber = weaponNumber;
        this.name = name;
        this.damage = damage;

    }

    createWeapon() {
        let randomElement = new RandomElement(this.length);
        randomElement.typeBlock(1, `weapon${this.weaponNumber}`);
        randomElement.drawBlock(`weapon${this.weaponNumber}`, `assets/img/weapon-${this.weaponNumber}.png`, this.ctx);
    }

}