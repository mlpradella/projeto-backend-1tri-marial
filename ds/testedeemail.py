from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()

try:
    driver.get("http://localhost:8081/")
    wait = WebDriverWait(driver, 6)

    # 1. Localiza o campo de e-mail
    campo_email = wait.until(EC.presence_of_element_located((By.ID, "setEmail")))

    # -------------------------------
    # TESTE INVÁLIDO
    # -------------------------------
    campo_email.send_keys("usuario_invalido")

    botao_login = wait.until(EC.element_to_be_clickable((By.ID, "loginButton")))
    botao_login.click()

    try:
        msg_erro = wait.until(
            EC.presence_of_element_located((By.ID, "mensagem-erro"))
        )
        texto_erro = msg_erro.text
        print(f"O sistema barrou o e-mail inválido com a mensagem: '{texto_erro}'")
        driver.save_screenshot("screenshot_email_invalido.png")

        if "inválido" in texto_erro.lower() or "formato" in texto_erro.lower():
            print("Sucesso: Teste de máscara de e-mail passou!")
        else:
            print("Aviso: A mensagem de erro apareceu, mas o texto é inesperado.")

    except Exception as e:
        print("Erro: O sistema permitiu o envio ou não mostrou uma mensagem de erro com o ID esperado.")
        print(f"Detalhes do erro: {e}")
        driver.save_screenshot("erro_validacao_email.png")

    # -------------------------------
    # TESTE VÁLIDO
    # -------------------------------
    campo_email.clear()
    campo_email.send_keys("usuario@teste.com")

    botao_login.click()

    # Aqui você pode verificar se NÃO aparece mensagem de erro
    try:
        msg_erro = wait.until(
            EC.presence_of_element_located((By.ID, "mensagem-erro"))
        )
        print(f"Atenção: Mesmo com e-mail válido apareceu mensagem: '{msg_erro.text}'")
        driver.save_screenshot("screenshot_email_valido_com_erro.png")
    except:
        print("Sucesso: E-mail válido aceito sem mensagem de erro.")
        driver.save_screenshot("screenshot_email_valido.png")

finally:
    driver.quit()
