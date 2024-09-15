# Backend
## Установка
1. Перейдите в директорию с бекендом:
```bash
cd back
```
2. Создайте виртуальную среду:
```bash
python -m venv ZKpy
```
3. Активируйте среду:
```bash
source ZKpy/bin/activate
```
4. Установите нужные библиотеки:
```bash
pip install -r requirements.txt
```
5. Запустите бекенд сервер:
```bash
uvicorn main:app --reload
```