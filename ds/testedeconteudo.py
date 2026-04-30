import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.fixture
def driver():
    driver = webdriver.Chrome()  # usa o ChromeDriver já instalado
    yield driver
    driver.quit()

def test_botao_nova_receita_envio(driver):
    # Abre a página inicial
    driver.get("http://localhost:8081/explore")  # ajuste para o caminho da sua página

    wait = WebDriverWait(driver, 10)

    # Espera o botão "NOVA RECEITA" ficar clicável
    botao = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='NOVA RECEITA']")))
    botao.click()

    # 1️⃣ Valida se a URL mudou para a página de envio
    wait.until(EC.url_contains("envio"))  # ajuste para o nome real da página
    assert "envio" in driver.current_url

    # 2️⃣ Valida se um elemento da página de envio aparece
    resultado = wait.until(EC.presence_of_element_located((By.ID, "formEnvio")))  # ajuste para o ID real
    assert resultado.is_displayed()
