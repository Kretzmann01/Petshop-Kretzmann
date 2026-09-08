// JavaScript da Fase 2.
// As funções abaixo adicionam comportamento dinâmico, validação e feedback ao usuário.

document.addEventListener("DOMContentLoaded", () => {
    // Função temporal: mostra o horário atual no rodapé da página inicial.
    const relogio = document.getElementById("relogio");
    if (relogio) {
        const atualizarRelogio = () => {
            relogio.textContent = new Date().toLocaleTimeString("pt-BR");
        };
        atualizarRelogio();
        setInterval(atualizarRelogio, 1000);
    }

    // Define a data mínima do calendário como o dia atual.
    const campoData = document.getElementById("data");
    if (campoData) {
        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        campoData.min = `${ano}-${mes}-${dia}`;
    }

    // Permite que os botões das páginas de serviço pré-selecionem o método.
    const params = new URLSearchParams(window.location.search);
    const metodo = params.get("metodo");
    const campoMetodo = document.getElementById("metodo");
    if (campoMetodo && metodo) {
        campoMetodo.value = metodo === "telebusca" ? "Tele-busca" : "Entrega do pet no local";
    }

    configurarCadastro();
    configurarAgendamento();
});

// Validação do formulário de cadastro com feedback visual do Bootstrap.
function configurarCadastro() {
    const form = document.getElementById("formCadastro");
    const mensagem = document.getElementById("mensagemCadastro");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        const nomeCliente = document.getElementById("nomeCliente").value;
        const nomePet = document.getElementById("nomePet").value;
        mensagem.textContent = `Cadastro realizado com sucesso! Cliente: ${nomeCliente}. Pet: ${nomePet}.`;
        mensagem.classList.remove("d-none");
        form.reset();
        form.classList.remove("was-validated");
    });
}

// Processa o agendamento e apresenta um resumo sem recarregar a página.
function configurarAgendamento() {
    const form = document.getElementById("formAgendamento");
    const resumo = document.getElementById("resumoAgendamento");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        const servico = document.getElementById("servico").value;
        const metodo = document.getElementById("metodo").value;
        const data = document.getElementById("data").value;
        const horario = document.getElementById("horario").value;

        const dataFormatada = new Date(`${data}T00:00:00`).toLocaleDateString("pt-BR");
        resumo.innerHTML = `<strong>Agendamento confirmado!</strong><br>
            Serviço: ${servico}<br>
            Método: ${metodo}<br>
            Data: ${dataFormatada}<br>
            Horário: ${horario}`;
        resumo.classList.remove("d-none");
    });
}
