

let formValues = [];
let currentIndex = 0;
let continuarBtnVisible = false;
let testeIniciado = false;
let myChart;

const jsonData = [
    { type: 'text', title: 'Digite seu email' },
    { type: 'text', title: 'Digite seu nome' },
    { type: 'text', title: 'Digite sua empresa' },
    { type: 'checkbox', options: ['Animado', 'Aventureiro', 'Analítico', 'Adaptável'] },
    { type: 'checkbox', options: ['Brincalhão', 'Persuasivo', 'Persistente', 'Sereno'] },
    { type: 'checkbox', options: ['Sociável', 'Energético', 'Doador', 'Submisso'] },
    { type: 'checkbox', options: ['Convincente', 'Competitivo', 'Atencioso', 'Controlado'] },
    { type: 'checkbox', options: ['Estimulante', 'Habilidoso', 'Respeitoso', 'Reservado'] },
    { type: 'checkbox', options: ['Espirituoso', 'Auto Suficente', 'Sensível', 'Satisfeito'] },
    { type: 'checkbox', options: ['Charmoso', 'Positivo', 'Planejador', 'Paciente'] },
    { type: 'checkbox', options: ['Espontâneo', 'Seguro', 'Organizado', 'Tímido'] },
    { type: 'checkbox', options: ['Otimista', 'Franco', 'Ordeiro', 'Serviçal'] },
    { type: 'checkbox', options: ['Engraçado', 'Vigoroso', 'Fiel', 'Amigável'] },
    { type: 'checkbox', options: ['Encantador', 'Audacioso', 'Minucioso', 'Diplomático'] },
    { type: 'checkbox', options: ['Alegre', 'Confiante', 'Culto', 'Previsível'] },
    { type: 'checkbox', options: ['Inspirado', 'Independente', 'Idealista', 'Inofensivo'] },
    { type: 'checkbox', options: ['Demonstrativo', 'Decidido', 'Profundo', 'Irônico'] },
    { type: 'checkbox', options: ['Desembaraçado', 'Ativo', 'Musical', 'Mediador'] },
    { type: 'checkbox', options: ['Conversador', 'Firme', 'Pensativo', 'Tolerante'] },
    { type: 'checkbox', options: ['Vivo', 'Líder', 'Leal', 'Ouvinte'] },
    { type: 'checkbox', options: ['Atraente', 'Chefe', 'Detalhista', 'Contente'] },
    { type: 'checkbox', options: ['Popular', 'Produtivo', 'Perfeccionista', 'Agradável'] },
    { type: 'checkbox', options: ['Vivaz', 'Valente', 'Comportado', 'Equilibrado'] },
    { type: 'checkbox', options: ['Metido', 'Mandão', 'Acanhado', 'Vazio'] },
    { type: 'checkbox', options: ['Indisciplinado', 'Insensível', 'Rancoroso', 'Desinteressado'] },
    { type: 'checkbox', options: ['Repetitivo', 'Inflexível', 'Ressentido', 'Relutante'] },
    { type: 'checkbox', options: ['Esquecido', 'Sincero', 'Complicado', 'Medroso'] },
    { type: 'checkbox', options: ['Inoportuno', 'Impaciente', 'Inseguro', 'Indeciso'] },
    { type: 'checkbox', options: ['Imprevisível', 'Frio', 'Impopular', 'Desligado'] },
    { type: 'checkbox', options: ['Casual', 'Cabeludo', 'Insatisfeito', 'Excitante'] },
    { type: 'checkbox', options: ['Permissivo', 'Orgulhoso', 'Cauteloso', 'Simples'] },
    { type: 'checkbox', options: ['Esquentado', 'Discutidor', 'Alienado', 'Incerto'] },
    { type: 'checkbox', options: ['Ingênuo', 'Ousado', 'Negativo', 'Demais'] },
    { type: 'checkbox', options: ['Egoísta', 'Trabalhador', 'Retraído', 'Preocupado'] },
    { type: 'checkbox', options: ['Tagarela', 'Indelicado', 'Sensível', 'Tímido'] },
    { type: 'checkbox', options: ['Desorganizado', 'Mandão', 'Deprimido', 'Confuso'] },
    { type: 'checkbox', options: ['Inconstante', 'Intolerante', 'Introvertido', 'Apático'] },
    { type: 'checkbox', options: ['Desordenado', 'Manipulador', 'Triste', 'Resmungão'] },
    { type: 'checkbox', options: ['Convencido', 'Obstinado', 'Cético', 'Lento'] },
    { type: 'checkbox', options: ['Barulhento', 'Tirânico', 'Solitário', 'Preguiçoso'] },
    { type: 'checkbox', options: ['Distraído', 'Irritável', 'Desconfiado', 'Vagaroso'] },
    { type: 'checkbox', options: ['Agitado', 'Imprudente', 'Vingativo', 'Relutante'] },
    { type: 'checkbox', options: ['Instável', 'Astuto', 'Crítico', 'Acomodado'] },
];

function createInputs() {
    document.getElementById('form').innerHTML = '';
    const showStartElements = document.querySelectorAll('.show-start');

    if (!testeIniciado) {
        const iniciarTesteButton = document.createElement('button');
        iniciarTesteButton.textContent = 'COMEÇAR O TESTE';
        iniciarTesteButton.className = 'btn btn-primary';
        iniciarTesteButton.addEventListener('click', iniciarTeste);
        document.getElementById('form').appendChild(iniciarTesteButton);

        showStartElements.forEach(element => {
            element.style.display = 'block';
        });
    } else if (currentIndex < jsonData.length) {
        showStartElements.forEach(element => {
            element.style.display = 'none';
        });

        const inputInfo = jsonData[currentIndex];
        const title = document.createElement('h4');
        title.textContent = inputInfo.title ?? 'Escolha qual dessas palavras mais te representa';
        document.getElementById('form').appendChild(title);

        if (inputInfo.type === 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control';
            input.placeholder = 'Digite aqui...';
            document.getElementById('form').appendChild(input);
        } else if (inputInfo.type === 'checkbox') {
            const checkboxGroup = document.createElement('div');
            checkboxGroup.className = 'btn-group';
            checkboxGroup.setAttribute('role', 'group');

            for (let [index, option] of inputInfo.options.entries()) {
                const checkboxLabel = document.createElement('label');
                checkboxLabel.className = 'btn btn-outline-primary';
                const checkboxInput = document.createElement('input');
                checkboxInput.type = 'checkbox';
                checkboxInput.className = 'btn-check';
                checkboxInput.value = option;
                checkboxInput.setAttribute('data-position', index + 1);
                checkboxInput.setAttribute('autocomplete', 'off');
                checkboxInput.id = option.toLowerCase().replace(/\s/g, '');
                checkboxInput.addEventListener('change', handleCheckboxChange);

                checkboxLabel.appendChild(checkboxInput);
                checkboxLabel.appendChild(document.createTextNode(option));
                checkboxGroup.appendChild(checkboxLabel);
            }

            document.getElementById('form').appendChild(checkboxGroup);
        }
    }

    const continuarBtn = document.getElementById('confirmar-btn');
    if (continuarBtnVisible && testeIniciado && currentIndex < jsonData.length) {
        continuarBtn.style.display = 'block';
    } else {
        continuarBtn.style.display = 'none';
    }

    if (testeIniciado && currentIndex === jsonData.length) {
        const chart = document.getElementById('myChart');
        chart.style.display = 'block';

        const aCount = formValues.filter(value => value.position === 1)
        const bCount = formValues.filter(value => value.position === 2)
        const cCount = formValues.filter(value => value.position === 3)
        const dCount = formValues.filter(value => value.position === 4)

        const data = {
            labels: [
              'Analista', // 4
              'Planejador', // 3
              'Comunicador', // 1
              'Executor', // 2
            ],
            datasets: [{
              label: '',
              data: [dCount?.length, cCount?.length, aCount?.length, bCount?.length],
              backgroundColor: [
                'rgb(0, 0, 255, 0.5)',
                'rgb(0, 128, 0, 0.5)',
                'rgb(255, 255, 0, 0.5)',
                'rgb(255, 0, 0, 0.5)', 
              ]
            }]
          };

        const config = {
            type: 'polarArea',
            data: data,
            options: {}
          };


        var ctx = document.getElementById('myChart').getContext('2d');
 
        myChart = new Chart(ctx, config);

        let highestCount = Math.max(aCount?.length, bCount?.length, cCount?.length, dCount?.length);
        let paragraphText = '';
        
        if (aCount.length === highestCount) {
            paragraphText += `
                <strong style="margin: 10px 0 0 0; display: block;">COMUNICADOR</strong>
                <b>CARACTERÍSTICAS:</b> São extrovertidos, falantes, adaptáveis e ativos.<br>
                <b>O QUE GOSTAM:</b> Falta de rotina, autonomia e trabalho em equipe.<br>
                <b>FEEDBACK:</b> Podem ficar motivados pelo reconhecimento.<br>
            `;
        } 

        if (bCount.length === highestCount) {
            paragraphText += `
                <strong style="margin: 10px 0 0 0; display: block;">EXECUTOR</strong>
                <b>CARACTERÍSTICAS:</b> São ativos, competitivos, otimistas e dinâmicos.<br>
                <b>O QUE GOSTAM:</b> Desafios, liderança e assumir riscos.<br>
                <b>FEEDBACK:</b> Motivados pelo desafio. Devem pensar em serem ainda melhores.<br>
            `;
        } 
        
        if (cCount.length === highestCount) {
            paragraphText += `
                <strong style="margin: 10px 0 0 0; display: block;">PLANEJADOR</strong>
                <b>CARACTERÍSTICAS:</b> São calmos, persistentes e têm muito autocontrole.<br>
                <b>O QUE GOSTAM:</b> Rotina, planejamento e de ajudar os outros.<br>
                <b>FEEDBACK:</b> Precisam de um ambiente seguro e de sentir que são apoiados.<br>
            `;
        } 
        
        if (dCount.length === highestCount) {
            paragraphText += `
                <strong style="margin: 10px 0 0 0; display: block;">ANALISTA</strong>
                <b>CARACTERÍSTICAS:</b> São detalhistas, precisos, cautelosos e críticos.<br>
                <b>O QUE GOSTAM:</b> Perfeição, métodos e ambientes calmos.<br>
                <b>FEEDBACK:</b> Precisam de apoio e saber seus pontos fortes.<br>
            `;
        }
    
        // Create and append the paragraph
        const resultParagraph = document.createElement('p');
        resultParagraph.className = 'p-3 border rounded';
        resultParagraph.innerHTML = paragraphText;
        document.getElementById('form').appendChild(resultParagraph);

        const recomecarBtn = document.createElement('button');
        recomecarBtn.textContent = 'Recomeçar';
        recomecarBtn.className = 'btn btn-primary';
        recomecarBtn.style.marginBottom = '20px';
        recomecarBtn.addEventListener('click', recomecar);
        document.getElementById('form').appendChild(recomecarBtn);
    }
}

function handleCheckboxChange(event) {
    const clickedCheckbox = event.target;
    const checkboxGroup = clickedCheckbox.closest('.btn-group');
    const checkboxes = checkboxGroup.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.parentNode.classList.remove('active');
        if (checkbox === clickedCheckbox) {
            checkbox.parentNode.classList.add('active');
        } else {
            checkbox.checked = false;
        }
    });


}

function iniciarTeste() {
    testeIniciado = true;
    continuarBtnVisible = true;
    createInputs();
}

function advanceToNextInput() {
    if (currentIndex < jsonData.length) {
        const inputInfo = jsonData[currentIndex];

        if (inputInfo.type === 'text') {
            const input = document.getElementById('form').querySelector('input[type="text"]');
            
            if(currentIndex === 0) {
                const isEmailUsed = localStorage.getItem(`${input.value}-comp`)

                if (isEmailUsed) {
                    alert('O email já foi utilizado. Por favor, insira um novo email.');
                    return;
                }
            }

            if (input) {
                if(!input.value) {
                    alert('Por favor, não deixe em branco.');
                    return;
                  }

                formValues.push({ type: inputInfo.type, value: input.value });
            }
        } else if (inputInfo.type === 'checkbox') {
            const checkedCheckbox = document.querySelector('#form input[type="checkbox"]:checked');
            if (!checkedCheckbox) {
                alert('Por favor, selecione uma opção.');
                return;
            }
            formValues.push({ type: inputInfo.type, value: checkedCheckbox.value, position: parseInt(checkedCheckbox.getAttribute('data-position')) });
        }
    }

    currentIndex++;
    createInputs();
}

const sendEmail = (templateParams) => {
    emailjs.send('service_fyrzusd', 'template_1imaqnm', templateParams, { publicKey: 'JQJW97uFzrBXyOfRA' })
      .then((response) => {
        console.log('Email enviado com sucesso!', response.status, response.text);
      })
      .catch((err) => {
        console.error('Erro ao enviar email:', err);
      });
  };

function recomecar() {
    if (formValues.length > 0) {
        const email = formValues[0].value;
        const name = formValues[1].value;
        const company = formValues[2].value;

        const formValuesJSON =  JSON.stringify(formValues)

        localStorage.setItem(`${email}-comp`, formValuesJSON);

        const aCount = formValues.filter(value => value.position === 1) ?? []
        const bCount = formValues.filter(value => value.position === 2) ?? []
        const cCount = formValues.filter(value => value.position === 3) ?? []
        const dCount = formValues.filter(value => value.position === 4) ?? []
  
        const totalQuestions = 40;

        const aPercentage = (aCount.length / totalQuestions) * 100;
        const bPercentage = (bCount.length / totalQuestions) * 100;
        const cPercentage = (cCount.length / totalQuestions) * 100;
        const dPercentage = (dCount.length / totalQuestions) * 100;

        sendEmail({ email, name, company, aPercentage: aPercentage.toString(), bPercentage: bPercentage.toString(), cPercentage: cPercentage.toString(), dPercentage: dPercentage.toString()})
    }

    myChart.destroy();
    
    const chart = document.getElementById('myChart');
    chart.style.display = 'none';


    currentIndex = 0;
    formValues = [];
    continuarBtnVisible = false;
    testeIniciado = false;
    createInputs();
}

window.onload = function() {
    createInputs();
    document.getElementById('confirmar-btn').addEventListener('click', advanceToNextInput);
};
