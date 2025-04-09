import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validador de CNPJ
 * 
 * Este validador verifica se o CNPJ informado é válido de acordo com as regras definidas pela Receita Federal do Brasil.
 * 
 * Regras de validação:
 * - O CNPJ deve ter 14 dígitos numéricos.
 * - O validador verifica os dois últimos dígitos do CNPJ (os dígitos verificadores) com base em um cálculo matemático que depende dos 12 primeiros dígitos.
 * 
 * Para mais informações sobre a estrutura e regras do CNPJ, consulte:
 * - https://www.macoratti.net/alg_cnpj.htm
 * 
 * @returns Função de validação que retorna um erro (invalidCNPJ) se o CNPJ for inválido, ou null caso o CNPJ seja válido.
 */

// Função de validação para CNPJ
export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const cnpj = control.value?.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (!cnpj) {
      return null; // Não faz validação se o campo estiver vazio
    }

    if (cnpj.length !== 14) {
      return { invalidCNPJ: true }; // CNPJ deve ter 14 dígitos
    }

    let soma = 0;
    let peso = 5;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }

    let digito1 = 11 - (soma % 11);
    if (digito1 === 10 || digito1 === 11) digito1 = 0;
    if (parseInt(cnpj.charAt(12)) !== digito1) {
      return { invalidCNPJ: true };
    }

    soma = 0;
    peso = 6;
    for (let i = 0; i < 13; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso;
      peso = peso === 2 ? 9 : peso - 1;
    }

    let digito2 = 11 - (soma % 11);
    if (digito2 === 10 || digito2 === 11) digito2 = 0;
    if (parseInt(cnpj.charAt(13)) !== digito2) {
      return { invalidCNPJ: true };
    }

    return null; // CNPJ válido
  };
}
