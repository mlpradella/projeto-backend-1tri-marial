from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Chrome()
driver.get("http://localhost:8081/")

# Localiza os campos de email e senha pelos IDs reais
email_input = driver.find_element(By.ID, "setEmail")
senha_input = driver.find_element(By.ID, "setSenha")

# Digita email e senha incorretos
email_input.send_keys("usuario@errado.com")
senha_input.send_keys("senha_incorreta")

# Envia o formulário
senha_input.send_keys(Keys.RETURN)

time.sleep(3)

try:
    mensagem_erro = driver.find_element(By.ID, "mensagem-erro")
    print("Login falhou: ", mensagem_erro.text)
except:
    print("Não foi encontrada mensagem de erro. Verifique os seletores.")

driver.quit()

