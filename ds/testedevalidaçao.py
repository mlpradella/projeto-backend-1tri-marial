from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Inicializa o navegador (exemplo com Chrome)
driver = webdriver.Chrome()

# Abre a página
driver.get('C:\Users\aluno\projeto-backend-1tri-marial\mobile\app\(tabs)\index.tsx')

# Não preencher os campos obrigatórios
# Exemplo: campo de email e senha
email_input = driver.find_element(By.ID, "email")  # ajuste o seletor conforme sua página
senha_input = driver.find_element(By.ID, "senha")

# Clicar no botão "Entrar"
entrar_btn = driver.find_element(By.ID, "entrar")  # ajuste o seletor
entrar_btn.click()

# Esperar um pouco para que as mensagens apareçam
time.sleep(2)

# Verificar se a mensagem de erro está visível
erro_email = driver.find_element(By.ID, "erro-email")  # ajuste o seletor
erro_senha = driver.find_element(By.ID, "erro-senha")

assert "E-mail é obrigatório" in erro_email.text
assert "Senha é obrigatória" in erro_senha.text

print("Teste passou: mensagens de erro exibidas corretamente.")

driver.quit()
