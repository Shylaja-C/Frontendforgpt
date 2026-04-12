import os
import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv
import threading

load_dotenv()

# ChromaDB Cloud Configuration
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY", "")
CHROMA_TENANT = os.getenv("CHROMA_TENANT", "default_tenant")
CHROMA_DATABASE = os.getenv("CHROMA_DATABASE", "FarmGPt")

# Jina Embedding Configuration
JINA_API_KEY = os.getenv("JINA_API_KEY", "")

collection_name = "farmgpt_knowledge_jina"

# Lazy-initialize client to avoid blocking startup
_chroma_client = None
_collection = None
_init_lock = threading.Lock()

def get_client():
    global _chroma_client
    if _chroma_client is None:
        with _init_lock:
            if _chroma_client is None:
                try:
                    _chroma_client = chromadb.CloudClient(
                        api_key=CHROMA_API_KEY,
                        tenant=CHROMA_TENANT,
                        database=CHROMA_DATABASE
                    )
                except Exception as e:
                    print(f"⚠️ ChromaDB init failed: {e}")
    return _chroma_client

def get_collection():
    global _collection
    if _collection is None:
        client = get_client()
        if client is None:
            return None
        jina_ef = embedding_functions.JinaEmbeddingFunction(
            api_key=JINA_API_KEY,
            model_name="jina-embeddings-v3"
        )
        _collection = client.get_or_create_collection(
            name=collection_name,
            embedding_function=jina_ef
        )
    return _collection

def retrieve_context(query: str, n_results: int = 3) -> str:
    """Gets top k relevant passages from the Vector DB with a hard timeout."""
    result = {"context": ""}

    def _fetch():
        try:
            collection = get_collection()
            if collection is None:
                return
            count = collection.count()
            if count == 0:
                return
            results = collection.query(query_texts=[query], n_results=min(n_results, count))
            if results and results.get('documents'):
                docs = [doc for sublist in results['documents'] for doc in sublist]
                result["context"] = "\n---\n".join(docs)
        except Exception as e:
            print(f"RAG Retrieval Error: {e}")

    t = threading.Thread(target=_fetch, daemon=True)
    t.start()
    t.join(timeout=1.5)  # Hard 1.5-second timeout - fast fail

    if t.is_alive():
        print("⚠️ RAG timed out - proceeding without context")

    return result["context"]
