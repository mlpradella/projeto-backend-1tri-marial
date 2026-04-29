import unittest
import requests
BASE_URL = "http://localhost:3000"

class TestAPI(unittest.TestCase):
    def test_status_endpoint(self):
        response = requests.get(f"{BASE_URL}/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("API de Receitas está rodando",response.text)

if __name__ == "__main__":
    unittest.main()