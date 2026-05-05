import React from 'react';
import '../form.css'; // <--- IMPORTANTE: Linkando o CSS novo aqui

export default function Form({ aoEnviar, aoCancelar }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>🚚 Detalhes da Entrega</h2>

                <form onSubmit={aoEnviar} className="formulario-pedido-banana">
                    <div className="campo">
                        <label>Nome Completo</label>
                        <input type="text" name="nome" placeholder="Quem recebe?" required />
                    </div>

                    <div className="campo">
                        <label>Endereço de Entrega</label>
                        <input type="text" name="endereco" placeholder="Rua, número, apto..." required />
                    </div>



                    <div className="campo">
                        <label>Cidade</label>
                        <input type="text" name="cidade" placeholder="Ex: São Paulo" required />
                    </div>

                    <div className="campo">
                        <label>Bairro</label>
                        <input type="text" name="bairro" placeholder="Ex: Jardim das Oliveiras" required />
                    </div>

                    <div className="campo">
                        <label>Complemento (Opcional)</label>
                        <input type="text" name="complemento" placeholder="Apto, Bloco, Referência..." />
                    </div>



                    <div className="campo">
                        <label>Telefone para contato</label>
                        <input type="number" name="telefone" placeholder="(00) 00000-0000" required />
                    </div>


                    <div className="campo">
                        <label>UF (Estado)</label>
                        <select name="uf" required defaultValue="">
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
                        </select>
                    </div>



                    <div className="botoes-form">
                        <button type="submit" className="btn-confirmar">Finalizar Pedido</button>
                        <button type="button" onClick={aoCancelar} className="btn-cancelar">Voltar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}