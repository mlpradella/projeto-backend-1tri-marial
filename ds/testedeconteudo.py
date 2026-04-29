import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

@pytest.fixture
def driver():
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
    yield driver
    driver.quit()

def test_botao_nova_receita(driver):
    driver.get("http://localhost:5500/bolos.html")  

    botao = driver.find_element(By.XPATH, "//button[text()='NOVA RECEITA']")

    botao.click()
    resultado = driver.find_element(By.ID, "nova-receita")
    assert resultado.is_displayed()
