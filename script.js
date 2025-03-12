        let expensesChart, compoundChart, investmentChart, savingsChart;

        function openTab(tabNumber) {

            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));

            document.getElementById('tab' + tabNumber).classList.add('active');

            document.querySelectorAll('.tab-button')[tabNumber - 1].classList.add('active');

            loadSavedData(tabNumber);

        }

        function saveData(tabNumber) {

            const inputs = document.getElementById('tab' + tabNumber).querySelectorAll('input');

            const data = {};

            inputs.forEach(input => data[input.id] = input.value);

            localStorage.setItem('tab' + tabNumber, JSON.stringify(data));

        }

        function loadSavedData(tabNumber) {

            const saved = localStorage.getItem('tab' + tabNumber);

            if (saved) {

                const data = JSON.parse(saved);

                Object.keys(data).forEach(id => {

                    const input = document.getElementById(id);

                    if (input) input.value = data[id];

                });

            }

        }

        function toggleTheme() {

            document.body.classList.toggle('dark');

            const toggleBtn = document.querySelector('.theme-toggle');

            toggleBtn.textContent = document.body.classList.contains('dark') ? 'Светлая тема' : 'Темная тема';

        }

        function drawExpensesChart() {

            const food = Number(document.getElementById('food').value) || 0;

            const transport = Number(document.getElementById('transport').value) || 0;

            const other = Number(document.getElementById('other').value) || 0;

            if (expensesChart) expensesChart.destroy();

            const ctx = document.getElementById('expensesChart').getContext('2d');

            expensesChart = new Chart(ctx, {

                type: 'pie',

                data: {

                    labels: ['Еда', 'Транспорт', 'Другое'],

                    datasets: [{ data: [food, transport, other], backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56'] }]

                }

            });

            saveData(1);

        }

        function resetExpenses() {

            document.getElementById('food').value = '';

            document.getElementById('transport').value = '';

            document.getElementById('other').value = '';

            if (expensesChart) expensesChart.destroy();

        }

        function drawCompoundChart() {

            const principal = Number(document.getElementById('principal').value) || 0;

            const rate = Number(document.getElementById('rate').value) / 100 || 0;

            const years = Number(document.getElementById('years').value) || 0;

            const extra = Number(document.getElementById('extra').value) || 0;

            const data = [];

            let total = principal;

            for (let i = 0; i <= years; i++) {

                data.push(total);

                total = total * (1 + rate) + extra * 12;

            }

            if (compoundChart) compoundChart.destroy();

            const ctx = document.getElementById('compoundChart').getContext('2d');

            compoundChart = new Chart(ctx, {

                type: 'line',

                data: {

                    labels: Array.from({ length: years + 1 }, (_, i) => i),

                    datasets: [{ label: 'Рост', data, borderColor: '#36a2eb', fill: false }]

                }

            });

            saveData(2);

        }

        function resetCompound() {

            document.getElementById('principal').value = '';

            document.getElementById('rate').value = '';

            document.getElementById('years').value = '';

            document.getElementById('extra').value = '';

            if (compoundChart) compoundChart.destroy();

        }

        function drawInvestmentChart() {

            const initial = Number(document.getElementById('initialInvest').value) || 0;

            const amount = Number(document.getElementById('investAmount').value) || 0;

            const rate = Number(document.getElementById('investRate').value) / 100 || 0;

            const years = Number(document.getElementById('investYears').value) || 0;

            const data = [];

            let total = initial;

            for (let i = 0; i <= years * 12; i++) {

                total = total * (1 + rate / 12) + amount;

                if (i % 12 === 0) data.push(total);

            }

            if (investmentChart) investmentChart.destroy();

            const ctx = document.getElementById('investmentChart').getContext('2d');

            investmentChart = new Chart(ctx, {

                type: 'line',

                data: {

                    labels: Array.from({ length: years + 1 }, (_, i) => i),

                    datasets: [{ label: 'Портфель', data, borderColor: '#ff6384', fill: false }]

                }

            });

            saveData(3);

        }

        function resetInvestment() {

            document.getElementById('initialInvest').value = '';

            document.getElementById('investAmount').value = '';

            document.getElementById('investRate').value = '';

            document.getElementById('investYears').value = '';

            if (investmentChart) investmentChart.destroy();

        }

        function drawSavingsChart() {

            const goal = Number(document.getElementById('goal').value) || 0;

            const monthly = Number(document.getElementById('monthly').value) || 0;

            const rate = Number(document.getElementById('savingsRate').value) / 100 || 0;

            const data = [];

            let total = 0;

            let months = 0;

            while (total < goal && months < 1000) {

                total = total * (1 + rate / 12) + monthly;

                months++;

                if (months % 12 === 0) data.push(total);

            }

            if (savingsChart) savingsChart.destroy();

            const ctx = document.getElementById('savingsChart').getContext('2d');

            savingsChart = new Chart(ctx, {

                type: 'line',

                data: {

                    labels: Array.from({ length: Math.ceil(months / 12) + 1 }, (_, i) => i),

                    datasets: [{ label: 'Сбережения', data, borderColor: '#96e6a1', fill: false }]

                }

            });

            saveData(4);

        }

        function resetSavings() {

            document.getElementById('goal').value = '';

            document.getElementById('monthly').value = '';

            document.getElementById('savingsRate').value = '';

            if (savingsChart) savingsChart.destroy();

        }

        loadSavedData(1);

