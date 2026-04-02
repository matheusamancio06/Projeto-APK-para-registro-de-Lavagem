# SGL | Sistema de Gestão de Lavagens 🚗🧼

O **SGL** é uma aplicação web de alta performance desenvolvida para modernizar e substituir o controle manual de higienização da frota do **Consórcio Recife Ambiental**. O sistema permite o registro rápido de serviços, monitoramento de indicadores em tempo real e gestão de pendências críticas.

user: admin / senha: 123
user: lavador / senha: 321

---

## 🛠️ Tecnologias e Técnicas Aplicadas

Para este projeto, foquei em criar uma solução leve, rápida e intuitiva, utilizando as seguintes tecnologias:

* **HTML5 Semântico:** Estruturação otimizada para acessibilidade e organização de dados.
* **CSS3 Moderno (Flexbox & Grid):** Interface responsiva com sistema de **Dark Mode** e uso de variáveis CSS (`:root`) para facilitar a manutenção visual.
* **JavaScript ES6+:** Manipulação dinâmica do DOM, tratamento de eventos e toda a lógica de negócios do sistema.
* **Local Storage:** Persistência de dados diretamente no navegador, garantindo o funcionamento do MVP sem dependência imediata de um banco de dados externo.
* **Integração com Bibliotecas:** Uso da `SheetJS (XLSX)` para exportação de relatórios e `FontAwesome` para uma interface rica em ícones.

---

## 📄 Arquitetura do Sistema

### 🔐 Controle de Acesso (`login.html` & `login-script.js`)
* Implementação de **Autenticação Baseada em Níveis (RBAC)**.
* O sistema diferencia usuários entre `Admin` e `Operador`, liberando ou restringindo funcionalidades conforme o perfil.

### 📊 Interface Principal (`index.html`)
* **Dashboard Dinâmico:** Cards de indicadores com totalizadores de lavagens e destaque do lavador do dia.
* **Alertas Inteligentes:** Seção condicional que notifica automaticamente quando um veículo está há mais de 3 dias sem higienização.
* **Histórico em Tempo Real:** Tabela interativa com ordenação por data recente.

### 🧠 Lógica de Negócios (`script.js`)
* **CRUD Local:** Sistema completo para criação, leitura e exclusão de registros.
* **Algoritmo de Pendências:** Cálculo de diferença de datas (`Date`) para identificar ativos "Sem registro" ou com lavagem atrasada.
* **Exportação de Dados:** Função que converte objetos JSON em arquivos `.xlsx` profissionais.

### 🎨 Design e UX (`style.css`)
* Foco em **produtividade noturna** com paleta de cores escuras.
* Badges de status coloridas (verde, amarelo, vermelho) para leitura rápida de informações críticas.

---

## 👨‍💻 Desenvolvedor

**Matheus Amancio** 📍 Recife, PE  
Estudante de Análise e Desenvolvimento de Sistemas (ADS).

---
*Este projeto foi desenvolvido para otimizar processos logísticos, substituindo planilhas manuais de Excel por uma interface web dedicada.*
