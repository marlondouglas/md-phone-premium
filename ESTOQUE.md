# Atualizar disponibilidade — MD PHONE

Este site é estático e não tem painel administrativo com login próprio.

Para alterar as etiquetas dos aparelhos:
1. Entre no GitHub com a conta que administra este repositório.
2. Abra [estoque.json](https://github.com/marlondouglas/md-phone-premium/edit/main/estoque.json).
3. Troque apenas o valor entre aspas do aparelho desejado.
4. Salve usando **Commit changes** na branch **main**.
5. Aguarde a publicação automática no GitHub Pages e atualize a página.

Valores aceitos:
- `"disponivel"`: exibe **Disponível**
- `"esgotado"`: exibe **Esgotado**, e o botão permite consultar reposição
- `"sob_consulta"`: exibe **Disponibilidade sob consulta**, sem inventar estoque

Cada identificador corresponde a uma variante ou unidade cadastrada em `app.js`. Não apague as chaves nem altere o ID do produto. O site atualiza as etiquetas conforme a seleção de condição/cor.

## Política de garantia exibida no catálogo
- Lacrado: 12 meses
- Seminovo: 3 meses

A cobertura e condições de garantia devem ser informadas ao consumidor pela MD PHONE. A entrega nacional e o valor de frete também devem ser confirmados antes de efetuar o pedido.

Não armazene senhas nem chaves privadas neste repositório. Para ter um painel administrativo dentro do próprio site, será necessária autenticação e um serviço de escrita seguro.
