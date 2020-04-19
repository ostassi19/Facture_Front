export class FactureModel {
  id: number;
  refFacture: string;
  dateEmission: string;
  datePaiement: string;
  dateFacture: string;
  montant: number;
  nbrelancement: number;
  etat: string;
  entreprises: string;
  personnels: string;
  commandes: [];
  reglements: [];
}
