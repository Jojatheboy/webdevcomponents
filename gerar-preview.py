import csv
import os
import sys
import re

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[áàãâ]', 'a', text)
    text = re.sub(r'[éèê]', 'e', text)
    text = re.sub(r'[íì]', 'i', text)
    text = re.sub(r'[óòõô]', 'o', text)
    text = re.sub(r'[úù]', 'u', text)
    text = re.sub(r'[ç]', 'c', text)
    text = re.sub(r'[^a-z0-9]+', '-', text)
    text = text.strip('-')
    return text

def extrair_cidade(query):
    if ' em ' in query:
        return query.split(' em ')[-1].strip().title()
    return 'Paraná'

def gerar(csv_path, linha_index, template_path, relatorio_path, output_dir):
    with open(csv_path, 'r') as f:
        reader = list(csv.DictReader(f))
    
    if linha_index >= len(reader):
        print(f"Erro: só tem {len(reader)} linhas")
        return
    
    lead = reader[linha_index]
    
    nome = lead.get('nome', '').strip()
    telefone = lead.get('telefone', '').strip()
    avaliacao = lead.get('avaliacao', '').strip().replace(',', '.')
    num_avaliacoes = lead.get('num_avaliacoes', '0').strip().replace('.0', '')
    endereco = lead.get('endereco', '').strip()
    query = lead.get('query_origem', '').strip()
    categoria = lead.get('categoria', '').strip()
    gancho = lead.get('gancho', '').strip()
    classificacao = lead.get('classificacao', '').strip()
    
    cidade = extrair_cidade(query)
    especialidade = 'Direito ' + categoria.replace('Advogado de ', '').replace('Advogado', 'Geral').replace('Escritório de advocacia', 'Geral').title() if categoria else 'Direito Geral'
    ramo = 'Advocacia'
    
    slug = slugify(nome)
    lead_dir = os.path.join(output_dir, slug)
    os.makedirs(lead_dir, exist_ok=True)
    
    # Gerar template
    with open(template_path, 'r') as f:
        template = f.read()
    
    template = template.replace('{{nome}}', nome)
    template = template.replace('{{telefone}}', telefone or '(00) 0000-0000')
    template = template.replace('{{cidade}}', cidade)
    template = template.replace('{{avaliacoes_nota}}', avaliacao or '5.0')
    template = template.replace('{{avaliacoes_qty}}', num_avaliacoes or '0')
    template = template.replace('{{especialidade}}', especialidade)
    template = template.replace('{{ramo}}', ramo)
    
    with open(os.path.join(lead_dir, 'preview.html'), 'w') as f:
        f.write(template)
    
    # Gerar relatório
    with open(relatorio_path, 'r') as f:
        relatorio = f.read()
    
    relatorio = relatorio.replace('{{nome}}', nome)
    relatorio = relatorio.replace('{{telefone}}', telefone or '(00) 0000-0000')
    relatorio = relatorio.replace('{{cidade}}', cidade)
    relatorio = relatorio.replace('{{avaliacoes_nota}}', avaliacao or '5.0')
    relatorio = relatorio.replace('{{avaliacoes_qty}}', num_avaliacoes or '0')
    relatorio = relatorio.replace('{{ramo}}', ramo)
    
    with open(os.path.join(lead_dir, 'relatorio.html'), 'w') as f:
        f.write(relatorio)
    
    # Info do lead
    info = f"""LEAD: {nome}
CLASSIFICAÇÃO: {classificacao}
TELEFONE: {telefone}
ENDEREÇO: {endereco}
CIDADE: {cidade}
AVALIAÇÃO: {avaliacao} ({num_avaliacoes} avaliações)
CATEGORIA: {categoria}
GANCHO: {gancho}

ARQUIVOS GERADOS:
- preview.html (site preview)
- relatorio.html (relatório de venda)
"""
    
    with open(os.path.join(lead_dir, 'info.txt'), 'w') as f:
        f.write(info)
    
    print(f"✓ Gerado: {lead_dir}/")
    print(f"  Nome: {nome}")
    print(f"  Cidade: {cidade}")
    print(f"  Tel: {telefone}")
    print(f"  Avaliação: {avaliacao} ({num_avaliacoes})")
    print(f"  Gancho: {gancho}")
    print(f"  Arquivos: preview.html + relatorio.html + info.txt")

if __name__ == '__main__':
    linha = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    
    gerar(
        csv_path='/Users/user/Downloads/analisado final PR - ADV.csv',
        linha_index=linha,
        template_path='/Users/user/site-builder-upscalead/templates/advocacia.html',
        relatorio_path='/Users/user/site-builder-upscalead/templates/relatorio-sem-site.html',
        output_dir='/Users/user/site-builder-upscalead/gerados'
    )
