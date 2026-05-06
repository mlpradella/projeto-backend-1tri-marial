from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# --- CONFIGURAÇÃO ---
# URL da sua página inicial de bolos
URL_INICIAL = "http://localhost:8081/explore" 
# URL exato da página que deve abrir após o clique
URL_DESTINO_ESPERADO = "https://receitas.html"

# Setup do driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)

try:
    # 1. Abre a página inicial
    driver.get(URL_INICIAL)
    print(f"Página inicial carregada: {URL_INICIAL}")
    wait = WebDriverWait(driver, 10)

    # 2. Encontra o botão e clica
    print("Encontrando o botão 'NOVA RECEITA'...")
    xpath_botao = "//*[contains(text(), 'NOVA RECEITA')]"
    botao = wait.until(EC.element_to_be_clickable((By.XPATH, xpath_botao)))
    
    print("Clicando no botão...")
    botao.click()

    # --- O PONTO CHAVE DO TESTE ---
    
    # 3. Verifica se a navegação ocorreu com sucesso
    # Nós usamos uma 'Espera Explícita' para aguardar até que o driver detecte que o URL mudou.
    print(f"Aguardando a navegação para {URL_DESTINO_ESPERADO}...")
    
    # Esta linha faz o Python 'congelar' e tentar repetidamente até que o URL coincida.
    wait.until(EC.url_to_be(URL_DESTINO_ESPERADO))
    
    # Se a linha acima passar sem erro, o URL é o correto.
    print("✅ SUCESSO: O URL foi atualizado corretamente para a nova página.")

except Exception as e:
    # Captura falhas de timeout ou erros ao clicar
    print(f"❌ FALHA NO TESTE: A navegação falhou ou não ocorreu dentro do tempo esperado.")
    print(f"Erro: {e}")
    driver.save_screenshot("erro_no_botao.png")

finally:
    # Fecha o navegador
    driver.quit()