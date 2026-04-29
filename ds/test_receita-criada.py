import unittest
import requests

BASE_URL = "http://localhost:3000"

class TestAPI(unittest.TestCase):
    def test_criar_receita(self):
        nova_receita = {
            "titulo": "Bolo de Chocolate",
            "ingredientes_massa": ["chocolate", "farinha", "açúcar"],
            "preparo_massa": ["Misture tudo", "Asse por 40 minutos"]
        }
        response = requests.post(f"{BASE_URL}/receitas", json=nova_receita)
        self.assertEqual(response.status_code, 201)

        data = response.json()
        print("Resposta da API:", data)

        # verifica se o mesmo título e id batem
        self.assertIn("id", data)
        self.assertEqual(data.get("titulo"), "Bolo de Chocolate")

    def test_listar_receitas(self):
        response = requests.get(f"{BASE_URL}/receitas")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        print("Lista de receitas:", data) 
        self.assertIsInstance(data, list)

if __name__ == "__main__":
    unittest.main()
