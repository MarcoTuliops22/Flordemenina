/** CEP de origem do showroom em Palmas-TO */
export const SHIPPING_ORIGIN_CEP = process.env.SHIPPING_ORIGIN_CEP || '77015000';

/** Dimensões padrão da embalagem para semijoias (cm) */
export const DEFAULT_PACKAGE = {
  length: 16,
  width: 11,
  height: 6,
} as const;

/** Peso mínimo cobrado pelos Correios (gramas) */
export const MIN_SHIPPING_WEIGHT_GRAM = 300;

/** Peso extra da embalagem (gramas) */
export const PACKAGING_WEIGHT_GRAM = 50;
