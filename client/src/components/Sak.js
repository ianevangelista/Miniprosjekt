export default class Sak {
  sak_id: number;
  overskrift: string;
  ingress: string;
  innhold: string;
  tidspunkt: timestamp;
  tidspunktEndret: timestamp;
  bilde: string;
  kategori_id: number;
  viktighet: number;

  constructor(
    sak_id: number,
    overskrift: string,
    ingress: string,
    innhold: string,
    tidspunkt: timestamp,
    tidspunktEndret: timestamp,
    bilde: string,
    kategori_navn: string,
    viktighet: number,
    tommelOpp: number,
    tommelNed: number
  ) {
    this.sak_id = sak_id;
    this.overskrift = overskrift;
    this.ingress = ingress;
    this.innhold = innhold;
    this.tidspunkt = tidspunkt;
    this.tidspunktEndret = tidspunktEndret;
    this.bilde = bilde;
    this.kategori_navn = kategori_navn;
    this.viktighet = viktighet;
    this.tommelOpp = tommelOpp;
    this.tommelNed = tommelNed;
  }
}
