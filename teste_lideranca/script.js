

let formValues = [];
let currentIndex = 0;
let continuarBtnVisible = false;
let testeIniciado = false;
let myChart;

const jsonData = [
    {
      type: "text",
      title: "Digite seu email"
    },
    {
      type: "text",
      title: "Digite seu celular"
    },
    {
      type: "text",
      title: "Digite seu nome"
    },
    {
      type: "text",
      title: "Digite sua empresa"
    },
    {
      type: "checkbox",
      title: "Das opções abaixo, qual frase define seu estilo de liderança?",
      options: [
        "Faça o que eu digo",
        "O que você acha?",
        "Pessoas em primeiro lugar",
        "Faça o que eu faço",
        "Experimente isso",
        "Vem comigo"
      ]
    },
    {
      type: "checkbox",
      title: "Qual seu Modus Operandi como líder?",
      options: [
        "Gosto de obediência imediata",
        "Chego em decisões importantes mediante consenso",
        "Crio harmonia no ambiente de trabalho e construo vínculos emocionais",
        "Estabeleço padrões de desempenho altos",
        "Desenvolvo pessoas para o futuro",
        "Mobilizo a equipe sob uma visão comum e me concentro em objetivos finais"
      ]
    },
    {
      type: "checkbox",
      title: "Quais dessas competências encaixam mais com seu estilo de liderar?",
      options: [
        "Ímpeto para alcançar conquistas, iniciativa e autocontrole",
        "Colaboração, liderança de equipe, comunicação",
        "Empatia, construção de relacionamentos, comunicação",
        "Conscientização, ímpeto para alcançar conquistas, iniciativa",
        "Desenvolvimento focado nos outros, empatia, autoconhecimento",
        "Autoconfiança, empatia, catalisador de mudanças"
      ]
    },
    {
      type: "checkbox",
      title: "O que você espera das outras pessoas no trabalho?",
      options: [
        "Eficiência dos resultados, assim como um alto nível de produtividade",
        "Equipe reunida para tomarmos uma decisão, delinear um plano ou meta e procurarmos por ideias novas",
        "Vínculos que comunicam um sentimento de união e até mesmo confiança",
        "Resultados rápidos de uma equipe altamente motivada e competente",
        "Prezo por desenvolvimento a longo prazo e por uma equipe comprometida",
        "Toda a minha equipe trabalhando sob uma visão comum"
      ]
    },
    {
      type: "checkbox",
      title: "Na sua opinião, qual o diferencial no seu estilo de liderança?",
      options: [
        "Alcanço os resultados esperados rapidamente",
        "Construo consenso através da participação coletiva",
        "Costumo ser empático e compreensivo",
        "Construo um ambiente focado em conhecimento e desenvolvimento de competências técnicas",
        "Ajudo os liderados a melhorarem o desempenho ou a se desenvolverem a longo prazo",
        "Costumo ter uma visão empreendedora que auxilia na hora de desbravar um novo mundo"
      ]
    },
    {
      type: "checkbox",
      title: "Entre essas, qual sua maior dificuldade como líder?",
      options: [
        "Temo que meus liderados fiquem desmotivados com o nível de cobrança",
        "Tendo a esperar muito da opinião de cada um e nem sempre temos tempo suficiente",
        "Temo que eu acabe criando uma dependência de elogios para haver trabalho bem-feito",
        "Sinto que tendo a sobrecarregar minha equipe se seguirmos nesse ritmo",
        "Temo que minha equipe às vezes seja muito relutante e provocadora comigo",
        "Tenho de me controlar, já que trabalho com especialistas que sabem até mais do que eu"
      ]
    }
  ]

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
                checkboxLabel.className = 'btn btn-outline-primary align-content-center';
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
        const eCount = formValues.filter(value => value.position === 5)
        const fCount = formValues.filter(value => value.position === 6)


        const data = {
            labels: [
              'Líder Autocrático',
              'Líder Democrático',
              'Líder Afetivo',
              'Líder Modelador', 
              'Líder Treinador',
              'Líder Visionário', 
            ],
            datasets: [{
              label: '',
              data: [aCount?.length, bCount?.length, cCount?.length, dCount?.length, eCount?.length, fCount.length],
              backgroundColor: [
                'rgb(0, 0, 255, 0.5)',
                'rgb(0, 128, 0, 0.5)',
                'rgb(255, 255, 0, 0.5)',
                'rgb(255, 0, 0, 0.5)', 
                'rgb(128, 0, 128, 0.5)', 
                'rgb(0, 255, 255, 0.5)',
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
                <strong style="margin: 10px 0 0 0; display: block;">Líder Autocrático</strong> “Faça o que eu digo.” <br>
                Voltado aos padrões mais tradicionais de gestão, a liderança autocrática foca no resultado e  enfatiza a eficiência das entregas, bem como um alto nível de produtividade. Com o passar dos anos, esse perfil absorveu outros modelos de cultura organizacional e, diferente do que o conceito transmite, também ouve outras opiniões e promove debates. <br>
                No entanto, a palavra decisiva permanece com os gestores. Pela confiança adquirida com as decisões importantes, costuma ter uma visão empreendedora que auxilia na exploração de novos horizontes. Contudo, há certa resistência em abraçar ideias que surgem de outras especialidades. <br>
                <b>SUGESTÃO:</b> Utilize ferramentas de gestão que permitam a coleta de feedback de sua equipe sem comprometer a tomada de decisão final, equilibrando controle e inovação. Além de desenvolver a sua atuação enquanto líder promovendo um olhar e um equilíbrio entre resultado e pessoas. <br>
            `;
        } 

        if (bCount.length === highestCount) {
          paragraphText += `
              <strong style="margin: 10px 0 0 0; display: block;">Líder Democrático</strong> “O que você acha?” <br>
              Constrói consenso através da participação coletiva. <br>
              Funciona melhor quando o líder precisa da equipe toda para tomar uma decisão, delinear um plano ou meta, e procura novas ideias de colegas. <br>
              Não é a melhor escolha em emergências, quando não há tempo suficiente para reunir todos, ou quando os colegas de equipe não estão informados o bastante para oferecer orientação. <br>
              <b>SUGESTÃO:</b> Ferramentas de colaboração no trabalho podem ajudar a organizar feedbacks e insights no dia a dia, evitando perda de tempo com reuniões excessivas e melhorando a produtividade da equipe. <br>
          `;
        } 
        
        if (cCount.length === highestCount) {
          paragraphText += `
              <strong style="margin: 10px 0 0 0; display: block;">Líder Afetivo</strong> “Pessoas em primeiro lugar.” <br>
              Trabalha para criar vínculos emocionais que comunicam um sentimento de união e pertencimento à organização. <br>
              Funciona melhor em tempos de estresse, quando os membros da equipe precisam se recuperar de um trauma ou quando é necessário reconstruir a confiança. <br>
              Deve ser moderado para evitar que os colaboradores desenvolvam uma dependência de elogios para manter um bom desempenho. <br>
              <b>SUGESTÃO:</b> Implemente ferramentas de gestão do trabalho que facilitem a compreensão sobre o desempenho de cada colaborador da sua equipe, evitando assim tomar decisões exclusivamente baseadas em relações emocionais. <br>
          `;
        } 
        
        if (dCount.length === highestCount) {
          paragraphText += `
              <strong style="margin: 10px 0 0 0; display: block;">Líder Modelador</strong> “Faça o que eu faço.” <br>
              Detém um grande nível de conhecimento e funciona melhor quando a equipe já está motivada e qualificada, mas precisa de motivação. <br>
              Este estilo é ideal quando são necessários resultados rápidos. No entanto, se usado em excesso, tende a sobrecarregar a equipe e reprimir a inovação.     <br>         
              <b>SUGESTÃO:</b> Considere adotar metodologias e ferramentas que ofereçam uma visão clara das demandas e processos da sua equipe. Dessa forma, você garantirá que não está sobrecarregando os colaboradores ou acelerando demais o fluxo de trabalho.  <br>
          `;
        } 

        if (eCount.length === highestCount) {
          paragraphText += `
              <strong style="margin: 10px 0 0 0; display: block;">Líder Treinador</strong> “Tente isso.” <br>
              Interessado em aprimorar as pessoas para o futuro. <br>
              Funciona melhor quando o líder quer ajudar os colegas a desenvolverem suas potencialidades e alcançarem sucesso duradouro. <br>
              É menos eficaz quando os membros são resistentes a mudanças ou ao aprendizado, ou se o líder não possui proficiência. <br>
              <b>SUGESTÃO:</b> Organize as demandas da sua equipe utilizando ferramentas que contribuam para uma gestão do tempo mais eficiente. Dessa forma, você garantirá que parte das horas de trabalho dos colaboradores esteja disponível para aperfeiçoamento individual, workshops e cursos, por exemplo.  <br>
          `;
        } 

        if (fCount.length === highestCount) {
          paragraphText += `
              <strong style="margin: 10px 0 0 0; display: block;">Líder Visionário</strong> “Vem comigo.” <br>
              Mobiliza a equipe sob uma visão comum e se concentra em objetivos finais. <br>
              O estilo visionário funciona melhor quando a equipe precisa de uma nova visão devido a mudanças nas circunstâncias. <br>
              Inspira um espírito empreendedor e entusiasmo pela missão, mas não é a melhor opção quando o líder está trabalhando com uma equipe de especialistas que sabem mais do que ele.<br>
              <b>SUGESTÃO:</b>  Foque em tornar o trabalho mais fácil para sua equipe. Implemente ferramentas e metodologias que auxiliem na gestão das demandas e do fluxo de trabalho, garantindo que todos possam desempenhar suas funções com excelência e autonomia.  <br>
          `;
        } 
    
        const resultParagraph = document.createElement('p');
        resultParagraph.className = 'p-3 border rounded';
        resultParagraph.innerHTML = paragraphText;
        document.getElementById('form').appendChild(resultParagraph);

        const finishParagraph = document.createElement('p');
        finishParagraph.innerHTML = `
            <p>Para se aprofundar no seu resultado, fale agora mesmo com a Linus</p>   
        `;
        document.getElementById('form').appendChild(finishParagraph);

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
                const isEmailUsed = localStorage.getItem(`${input.value}-lid`)

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
    emailjs.send('service_fyrzusd', 'template_zh5i2ob', templateParams, { publicKey: 'JQJW97uFzrBXyOfRA' })
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

        localStorage.setItem(`${email}-lid`, formValuesJSON);

        const aCount = formValues.filter(value => value.position === 1) ?? []
        const bCount = formValues.filter(value => value.position === 2) ?? []
        const cCount = formValues.filter(value => value.position === 3) ?? []
        const dCount = formValues.filter(value => value.position === 4) ?? []
        const eCount = formValues.filter(value => value.position === 5) ?? []
        const fCount = formValues.filter(value => value.position === 6) ?? []
  
        const totalQuestions = 6;

        const aPercentage = (aCount.length / totalQuestions) * 100;
        const bPercentage = (bCount.length / totalQuestions) * 100;
        const cPercentage = (cCount.length / totalQuestions) * 100;
        const dPercentage = (dCount.length / totalQuestions) * 100;
        const ePercentage = (eCount.length / totalQuestions) * 100;
        const fPercentage = (fCount.length / totalQuestions) * 100;

        sendEmail({ email, name, company, aPercentage: aPercentage.toString(), bPercentage: bPercentage.toString(), cPercentage: cPercentage.toString(), dPercentage: dPercentage.toString(), ePercentage: ePercentage.toString(), fPercentage: fPercentage.toString()})
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
