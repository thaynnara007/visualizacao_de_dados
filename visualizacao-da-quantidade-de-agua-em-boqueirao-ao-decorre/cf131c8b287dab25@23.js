// https://observablehq.com/@thaynnara007/visualizacao-da-quantidade-de-agua-em-boqueirao-ao-decorre@23
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Visualização da quantidade de água em Boqueirão ao decorrer dos anos

## Lab01 - part 1

A seguinte visualização mostra o nível de água no açude de Boqueirão entre os anos de 2000 e 2019
`
)});
  main.variable(observer("embed")).define("embed", ["require"], function(require){return(
require("vega-embed@5")
)});
  main.variable(observer("viewof view")).define("viewof view", ["embed"], function(embed){return(
embed(
  {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
    "url": "https://olhonagua.lsd.ufcg.edu.br/api/reservatorios/12172/monitoramento",
    "format": {
      "type": "json",
      "property": "volumes",
      "parse": {
        "DataInformacao": "utc:'%d/%m/%Y'"
      }
    }
  },
  "width": 500,
  "height": 100,
  "transform": [
    {
      "filter": {
        "timeUnit": "year",
        "field": "DataInformacao",
        "range": [
          2000,
          2019
        ]
      }
    }
  ],
  "mark": {
    "type": "area",
    "line": {
      "color": "darkblue"
    },
    "color": {
      "x1": 1,
      "y1": 1,
      "x2": 1,
      "y2": 0,
      "gradient": "linear",
      "stops": [
        {
          "offset": 0,
          "color": "white"
        },
        {
          "offset": 1,
          "color": "darkblue"
        }
      ]
    }
  },
  "encoding": {
    "y": {
      "aggregate": "average",
      "field": "VolumePercentual",
      "type": "quantitative",
      "axis": {"title": "Volume (%)"}
    },
    "x": {
      "field": "DataInformacao",
      "type": "temporal",
      "axis": {"title": "Year"}
    }
  }
}
)
)});
  main.variable(observer("view")).define("view", ["Generators", "viewof view"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`Através da visualização dos dados é possível notar que durante o intervalo de 2004 a 2012 o açude passou por um período de cheias. Entretanto, nota-se que já no ano seguinte iniciou-se um período de seca, quase chegando completamente a esta no ano de 2017.`
)});
  return main;
}
