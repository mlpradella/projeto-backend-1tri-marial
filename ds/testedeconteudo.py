from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# --- CONFIGURAÇÃO DO TESTE ---
# Substitua pelo URL real do seu site onde a imagem está rodando
URL_DO_SITE = "http://localhost:8081/explore" 
NOME_DO_BOTAO_ESPERADO = "NOVA RECEITA"
TEXTO_BOTAO = "NOVA RECEITA" # Use MAIÚSCULAS como está na sua imagem

# 1. Configuração do Navegador (Chrome)
# O webdriver-manager baixa e gerencia o driver automaticamente
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import StaleElementReferenceException, TimeoutException
from webdriver_manager.chrome import ChromeDriverManager
import time

# --- CONFIGURAÇÕES ---
URL_INICIAL = "http://localhost:8081/explore" 
URL_DESTINO_PARCIAL = "Receitas.html" 
TEXTO_BOTAO = "NOVA RECEITA"

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

try:
    print(f"Abrindo o site: {URL_INICIAL}")
    driver.get(URL_INICIAL)
    driver.maximize_window()
    
    time.sleep(2) 
    wait = WebDriverWait(driver, 10)

    print(f"Buscando o botão '{TEXTO_BOTAO}'...")
    # XPath focado no texto "Nova receita"
    xpath_botao = f"//*[contains(text(), '{TEXTO_BOTAO}')]"
    
    # Localiza o elemento
    botao = wait.until(EC.presence_of_element_located((By.XPATH, xpath_botao)))

    # --- A SOLUÇÃO PARA O ERRO DE INTERCEPTAÇÃO ---
    print("Tentando clicar via JavaScript para evitar sobreposição...")
    driver.execute_script("arguments[0].click();", botao)
    # ----------------------------------------------

    print("Comando de clique enviado! Verificando navegação...")

    try:
        # Espera a URL conter o nome do arquivo
        wait.until(EC.url_contains(URL_DESTINO_PARCIAL))
        
        print(f"✅ SUCESSO: Chegamos em {driver.current_url}")
        driver.save_screenshot("sucesso_navegacao.png") 
        print("Screenshot do ACERTO salva!")
        
    except TimeoutException:
        print(f"❌ ERRO DE NAVEGAÇÃO: Clique foi feito, mas a URL é {driver.current_url}")
        driver.save_screenshot("erro_url_errada.png")

except Exception as e:
    print(f"❌ ERRO NO TESTE: {e}")
    driver.save_screenshot("erro_geral.png")

finally:
    print("Encerrando em 3 segundos...")
    time.sleep(3)
    driver.quit()