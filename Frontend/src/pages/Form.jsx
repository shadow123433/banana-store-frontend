import React from 'react';
import '../form.css';

export default function Form({ aoEnviar, aoCancelar }) {
  return (
    <div className="form-card">
      <h2>Endereço de entrega</h2>

      <form onSubmit={aoEnviar} className="form-body">
        <div className="row">
          <input type="text" name="cep" placeholder="CEP" className="flex-2" required />
          <select name="uf" className="flex-1" required defaultValue="">
            <option value="" disabled>UF</option>
            <option value="" disabled>Selecione</option>
                            <option value="AC">AC - Acre</option>
                            <option value="AL">AL - Alagoas</option>
                            <option value="AP">AP - Amapá</option>
                            <option value="AM">AM - Amazonas</option>
                            <option value="BA">BA - Bahia</option>
                            <option value="CE">CE - Ceará</option>
                            <option value="DF">DF - Distrito Federal</option>
                            <option value="ES">ES - Espírito Santo</option>
                            <option value="GO">GO - Goiás</option>
                            <option value="MA">MA - Maranhão</option>
                            <option value="MT">MT - Mato Grosso</option>
                            <option value="MS">MS - Mato Grosso do Sul</option>
                            <option value="MG">MG - Minas Gerais</option>
                            <option value="PA">PA - Pará</option>
                            <option value="PB">PB - Paraíba</option>
                            <option value="PR">PR - Paraná</option>
                            <option value="PE">PE - Pernambuco</option>
                            <option value="PI">PI - Piauí</option>
                            <option value="RJ">RJ - Rio de Janeiro</option>
                            <option value="RN">RN - Rio Grande do Norte</option>
                            <option value="RS">RS - Rio Grande do Sul</option>
                            <option value="RO">RO - Rondônia</option>
                            <option value="RR">RR - Roraima</option>
                            <option value="SC">SC - Santa Catarina</option>
                            <option value="SP">SP - São Paulo</option>
                            <option value="SE">SE - Sergipe</option>
                            <option value="TO">TO - Tocantins</option>

            {/* ... outras UFs ... */}
          </select>
        </div>

        <input type="text" name="endereco" placeholder="Endereço" required />

        <div className="row">
          <input type="text" name="bairro" placeholder="Bairro" required />
          <input type="text" name="cidade" placeholder="Cidade" required />
        </div>

        <div className="row">
          <input type="number" name="numero" placeholder="Número" className="flex-1" required />
          <div className="flex-1"></div> {/* Spacer para manter o visual da imagem */}
        </div>

        <input type="text" name="complemento" placeholder="Complemento" />

        <div className="actions">
          <button type="button" onClick={aoCancelar} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Confirmar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}