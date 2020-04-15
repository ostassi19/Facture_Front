export interface CommandeModel {
  id: number;
  refCommande: string;
  date: string;
  prix_unitaire: number;
  reduction: number;
  ref_produit: string;
  Designation_produit: string;
  tva: number;
  quantité: number;
  montant: number;
}
