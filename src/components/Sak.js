export default class Sak {
  overskrift: string;
  innhold: string;
  tidspunkt: timestamp;
  bilde: string;
  kategori_id: number;
  viktighet: number;

  constructor(
    overskrift: string,
    innhold: string,
    tidspunkt: timestamp,
    bilde: string,
    kategori_navn: string,
    viktighet: number
  ) {
    this.overskrift = overskrift;
    this.innhold = innhold;
    this.tidspunkt = tidspunkt;
    this.bilde = bilde;
    this.kategori_navn = kategori_navn;
    this.viktighet = viktighet;
  }
}
