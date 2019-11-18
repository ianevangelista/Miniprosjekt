export default class Sak {
  sak_id: number;
  overskrift: string;
  ingress: string;
  innhold: string;
  tidspunkt: timestamp;
  bilde: string;
  kategori_id: number;
  viktighet: number;

  constructor(
    sak_id: number,
    overskrift: string,
    ingress: string,
    innhold: string,
    tidspunkt: timestamp,
    bilde: string,
    kategori_navn: string,
    viktighet: number
  ) {
    this.sak_id = sak_id;
    this.overskrift = overskrift;
    this.ingress = ingress;
    this.innhold = innhold;
    this.tidspunkt = tidspunkt;
    this.bilde = bilde;
    this.kategori_navn = kategori_navn;
    this.viktighet = viktighet;
  }
}
