from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:8081/")
    wait = WebDriverWait(driver, 10)

    # Aguarda o campo de senha ficar disponível
    senha_input = wait.until(EC.presence_of_element_located((By.ID, "setSenha")))

    # Digita uma senha qualquer
    senha_input.send_keys("minhaSenha123")

    # Verifica se o campo está mascarando os caracteres
    tipo_input = senha_input.get_attribute("type")

    if tipo_input == "password":
        print("Sucesso: O campo de senha está mascarando os caracteres corretamente.")
        driver.save_screenshot("senha_mascarada.png")
    else:
        print(f"Falha: O campo de senha NÃO está mascarando. Tipo encontrado: {tipo_input}")
        driver.save_screenshot("senha_nao_mascarada.png")

finally:
    driver.quit()
