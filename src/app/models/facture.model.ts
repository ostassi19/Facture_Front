export interface FactureModel {
  id: number;
  refFacture: string;
  dateEmission: string;
  datePaiement: number;
  montant: number;
  nbrelancement: number;
  etat: string;
  entreprises: string;
  personnels: string;
  commandes: [];
  reglements: [];
}
