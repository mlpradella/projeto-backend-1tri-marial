import unittest
import requests

BASE_URL = "http://localhost:3000"

class TestAPI(unittest.TestCase):
    def test_criar_e_deletar_receita(self):
        #cria nova receita
        nova_receita = {
            "titulo": "Bolo de Cenoura",
            "ingredientes_massa": ["cenoura", "farinha", "açúcar"],
            "preparo_massa": ["Misture tudo", "Asse por 45 minutos"]
        }
        response = requests.post(f"{BASE_URL}/receitas", json=nova_receita)
        self.assertEqual(response.status_code, 201)

        data = response.json()
        receita_id = data.get("id")
        self.assertIsNotNone(receita_id)
        self.assertEqual(data.get("titulo"), "Bolo de Cenoura")

        #deleta a receita
        response_delete = requests.delete(f"{BASE_URL}/receitas/{receita_id}")
        self.assertEqual(response_delete.status_code, 200)

        # verifica se a receita não está mais na lista
        response_list = requests.get(f"{BASE_URL}/receitas")
        self.assertEqual(response_list.status_code, 200)

        receitas = response_list.json()
        ids = [r.get("id") for r in receitas]
        self.assertNotIn(receita_id, ids)

if __name__ == "__main__":
    unittest.main()
