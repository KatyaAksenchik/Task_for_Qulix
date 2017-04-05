$(document).ready(function () {

    class Worker {
        constructor() {
            this.mood = true;
        }

        getMatrial(materialObj) {
            if (materialObj.material && materialObj.mode && materialObj.material.unpoisoned && materialObj.material.stuff && materialObj.sober) {
                this.mood = true;
            } else {
                this.mood = false;
            }
        }

        get checkMood() {
            return (this.mood) ? "Я доволен" : "Оч растроен, что за день то сегодня";
        }

    }

    class Material {
        constructor(unpoisoned, stuff) {
            this.unpoisoned = unpoisoned;
            this.stuff = stuff;
        }

    }


    class Parent {
        constructor() {
            this._material = null;
            this._sober = true;
            this._id = null;
            this.mode = true;
        }


        getMaterial() {
            return this._material;
        }

        collectMaterial(unpoisoned, stuff) {
            if (stuff) {
                this.setMaterial(new Material(unpoisoned, stuff));
            } else {
                alert("Ошибка!У вас нету материалов");
            }

        }

        setMaterial(material) {
            this._material = material;
        }

        carryToWorker(mode) {
            return {
// mode: true(если ты не заражен), false наоборот
                mode: this.mode,
                material: this._material,
                sober: this._sober
            }
        }

        clearMaterial() {
            this._material = null;
        }

    }


    class Person extends Parent {
        constructor() {
            super();
            this._id = "person";
        }

        collectGoodMaterial(stuff) {
            super.collectMaterial(true, stuff);
        }

        collectBadMaterial(stuff) {
            super.collectMaterial(false, stuff);
        }

        carryToWorker() {
            return super.carryToWorker();
        }
    }

    class Alien extends Parent {
        constructor() {
            super();
            this._id = "alien";
            this._unpoisoned = false;
            this.mode = false;
        }

        collectBadMaterial(stuff, unpoisoned = false) {
            super.collectMaterial(unpoisoned, stuff);
        }

        carryToWorker() {
            return super.carryToWorker();
        }
    }


    class BadPerson extends Person {
        constructor() {
            super();
            this._id = "badPerson";
        }

        stoleMaterial(somebody) {
            if (somebody._material) {
                this._material = somebody._material;
                somebody._material = null;

            } else {
                alert("Ошибка!Нету ничего у инопланетянина");
            }

        }

        changeAlcoholikState() {
            this._sober = !this._sober;
        }

        get alcoholicState() {
            return this._sober ? "Я трезв. " : "Я чуть-чуть пьян. ";
        }

    }


    let worker = new Worker();
    let person = new Person();
    let alien = new Alien();
    let badPerson = new BadPerson();


    $('button').click(function () {
        switch ($(this).attr('data-type')) {
            case "person":
                switch ($(this).attr('data-action')) {
                    case "1":
                    {
                        toWorker(person.carryToWorker());
                        person.clearMaterial();
                        getStorage(person);
                        break;
                    }
                    case "2":
                    {
                        let stuff = prompt("Введите, что за сырье вы взяли");
                        person.collectGoodMaterial(stuff);
                        getStorage(person);
                        break;
                    }
                    case "3":
                    {
                        let stuff = prompt("Введите, что за сырье вы взяли");
                        person.collectBadMaterial(stuff);
                        getStorage(person);
                        break;
                    }
                }
                break;
            case "alien":
                switch ($(this).attr('data-action')) {
                    case "1":
                    {
                        toWorker(alien.carryToWorker());
                        alien.clearMaterial();
                        getStorage(alien);
                        break;
                    }
                    case "2":
                    {
                        let stuff = prompt("Введите, что за сырье вы взяли");
                        alien.collectBadMaterial(stuff);
                        getStorage(alien);
                        break;
                    }
                }
                break;
            case "badPerson":
                switch ($(this).attr('data-action')) {
                    case "1":
                    {
                        toWorker(badPerson.carryToWorker());
                        badPerson.clearMaterial();
                        getStorage(badPerson);
                        break;
                    }
                    case "2":
                    {
                        let stuff = prompt("Введите, что за сырье вы взяли");
                        badPerson.collectGoodMaterial(stuff);
                        getStorage(badPerson);
                        break;

                    }
                    case "3":
                    {
                        badPerson.stoleMaterial(alien);
                        getStorage(badPerson);
                        getStorage(alien);
                        break;
                    }
                    case "4":
                    {
                        if (confirm(badPerson.alcoholicState + "Менять это состояние?")) {
                            badPerson.changeAlcoholikState();
                        }
                        break;

                    }

                }
                break;
        }

    });

    function toWorker(answer) {
        worker.getMatrial(answer);
        $("#answer").text(worker.checkMood);
    }

    function getStorage(obj) {
        if (obj._material) {
            $("." + obj._id + "-storage").text(obj.getMaterial().stuff);
        } else {
            $("." + obj._id + "-storage").text("ничего нету");
        }

    }

});
