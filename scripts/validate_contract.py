from pathlib import Path
import ast
p=Path('contracts/MoneyFlow.py'); tree=ast.parse(p.read_text()); assert any(isinstance(n,ast.ClassDef) and n.name=='MoneyFlow' for n in tree.body); print('MoneyFlow.py syntax: PASS')
