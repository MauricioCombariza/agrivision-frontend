// Verifica que diagnostico/modelo.js da los mismos resultados que modelo.py.
//   node backend/tests/espejo_js.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";

const aqui = new URL(".", import.meta.url);
const ctx = {};
vm.runInNewContext(readFileSync(new URL("../../modelo.js", aqui), "utf8"), { globalThis: ctx });
const { calcular } = ctx.ModeloAgrivision;
const casos = JSON.parse(readFileSync(new URL("casos.json", aqui), "utf8"));

let fallos = 0;
for (const caso of casos) {
  const res = calcular({ ...caso.respuestas });
  for (const h of res.herramientas) {
    const pares = [["valor", h.escenarios.medio.total_usd, caso.esperado_medio_usd[h.id]],
                   ["costo", h.costo_anual_usd, caso.esperado_costo_usd[h.id]]];
    for (const [que, obtenido, esperado] of pares) {
      const ok = esperado === null ? obtenido === null : Math.abs(obtenido - esperado) <= Math.abs(esperado) * 1e-9;
      if (!ok) { fallos++; console.log(`FALLA ${caso.nombre} ${h.id} ${que}: ${obtenido} vs ${esperado}`); }
    }
  }
}
console.log(fallos ? `${fallos} diferencias` : `OK: ${casos.length} casos idénticos a Python`);
process.exit(fallos ? 1 : 0);
