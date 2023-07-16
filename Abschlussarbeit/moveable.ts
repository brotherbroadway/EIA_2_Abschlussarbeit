namespace EIA2SoSe23_Abschlussarbeit {
    /*
Aufgabe: Abschlussarbeit EIA2 SoSe 23
Name: Jona Ruder
Matrikel: 265274
Datum: 16.07.2023
Quellen: -
*/
    export abstract class Moveable {
        protected posX: number;
        protected posY: number;
        protected scaling: number;

        public constructor(_posX: number, _posY: number, _scaling: number) {
            this.posX = _posX;
            this.posY = _posY;
            this.scaling = _scaling;
        }

        public abstract draw(): void;
    }
}