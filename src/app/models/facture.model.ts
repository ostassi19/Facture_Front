export class FactureModel {
  id: number;
  refFacture: string;
  dateEmission: string;
  datePaiement: string;
  dateFacture: string;
  montant: number;
  nbrelancement: number;
  montant_relance: number;
  etat: string;
  personnels: {};
  commandes: {};

}
