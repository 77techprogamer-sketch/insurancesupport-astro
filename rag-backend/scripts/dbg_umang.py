import sys
sys.path.insert(0, '.')
from backend.rag import parse_query, retrieve_context, resolve_product_name

# Verify resolution
for hint, ins in [("jeevan umang", "LIC"), ("jeevan anand", "LIC"), ("care supreme", "Care Health"), ("max protect", "ICICI Lombard")]:
    print(f"resolve({hint!r}, {ins!r}) -> {resolve_product_name(hint, ins)!r}")

q = "What are the key benefits of LIC Jeevan Umang?"
parsed = parse_query(q)
print('\nPARSED:', parsed['insurer'], '| HINTS:', parsed['product_hints'])
results = retrieve_context(parsed)
print('\nRETRIEVED:')
for r in results[:6]:
    m = r['metadata']
    print('-', repr(m.get('product_name')), '| score', round(r['score'], 3), '|', m.get('doc_type'))